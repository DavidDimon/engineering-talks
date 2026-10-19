import { mkdir, readFile, readdir, rename, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

import {
  catalogItemMetadataSchema,
  contentCatalogSchema,
  contentConfigSchema,
  type CatalogItem,
  type CatalogItemMetadata,
  type ContentCatalog,
  type ContentConfig,
} from '@engineering-talks/content-schema';
import { type ZodType } from 'zod';

export class ContentValidationError extends Error {
  constructor(readonly problems: readonly string[]) {
    super(`Content validation failed:\n${problems.map((problem) => `- ${problem}`).join('\n')}`);
    this.name = 'ContentValidationError';
  }
}

type LocatedMetadata = {
  filePath: string;
  folderName: string;
  expectedKind: CatalogItemMetadata['kind'];
  metadata: CatalogItemMetadata;
};

async function readJson<T>(filePath: string, schema: ZodType<T>): Promise<T> {
  let value: unknown;

  try {
    value = JSON.parse(await readFile(filePath, 'utf8')) as unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new ContentValidationError([`${filePath}: invalid JSON (${message})`]);
  }

  const result = schema.safeParse(value);
  if (!result.success) {
    const problems = result.error.issues.map((issue) => {
      const propertyPath = issue.path.length > 0 ? issue.path.join('.') : '<root>';
      return `${filePath}:${propertyPath}: ${issue.message}`;
    });
    throw new ContentValidationError(problems);
  }

  return result.data;
}

async function isFile(filePath: string): Promise<boolean> {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function discoverInDirectory(
  workspaceRoot: string,
  directoryName: 'presentations' | 'courses',
): Promise<LocatedMetadata[]> {
  const directoryPath = path.join(workspaceRoot, directoryName);
  const entries = await readdir(directoryPath, { withFileTypes: true }).catch((error: unknown) => {
    const code = error instanceof Error && 'code' in error ? error.code : undefined;
    if (code === 'ENOENT') return [];
    throw error;
  });
  const expectedKind = directoryName === 'presentations' ? 'presentation' : 'course';
  const fileName = expectedKind === 'presentation' ? 'metadata.json' : 'course.json';
  const locations = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      filePath: path.join(directoryPath, entry.name, fileName),
      folderName: entry.name,
      expectedKind,
    }));

  const discovered = await Promise.all(
    locations.map(async (location) => {
      if (!(await isFile(location.filePath))) return undefined;
      return {
        ...location,
        metadata: await readJson(location.filePath, catalogItemMetadataSchema),
      };
    }),
  );

  return discovered.filter((item): item is LocatedMetadata => item !== undefined);
}

export async function loadContentConfig(workspaceRoot: string): Promise<ContentConfig> {
  return readJson(path.join(workspaceRoot, 'content.config.json'), contentConfigSchema);
}

export async function validateMetadataFile(filePath: string): Promise<CatalogItemMetadata> {
  return readJson(path.resolve(filePath), catalogItemMetadataSchema);
}

function validateCourseLessons(item: LocatedMetadata, relativePath: string): string[] {
  if (item.metadata.kind !== 'course') return [];

  const problems: string[] = [];
  const seenSlugs = new Set<string>();
  for (const [index, lesson] of item.metadata.lessons.entries()) {
    const expectedOrder = index + 1;
    if (lesson.order !== expectedOrder) {
      problems.push(
        `${relativePath}: lesson "${lesson.slug}" has order ${lesson.order}; expected ${expectedOrder}`,
      );
    }
    if (seenSlugs.has(lesson.slug)) {
      problems.push(`${relativePath}: duplicate lesson slug "${lesson.slug}"`);
    }
    seenSlugs.add(lesson.slug);
  }
  return problems;
}

function sortDate(item: CatalogItemMetadata): number {
  if (item.kind === 'course') return Date.UTC(item.period.endYear, 11, 31);
  return Date.UTC(
    item.deliveredAt.year,
    (item.deliveredAt.month ?? 1) - 1,
    item.deliveredAt.day ?? 1,
  );
}

export async function buildCatalog(
  workspaceRoot: string,
  options: { includeDrafts?: boolean } = {},
): Promise<ContentCatalog> {
  const config = await loadContentConfig(workspaceRoot);
  const located = (
    await Promise.all([
      discoverInDirectory(workspaceRoot, 'presentations'),
      discoverInDirectory(workspaceRoot, 'courses'),
    ])
  ).flat();
  const problems: string[] = [];
  const seenSlugs = new Map<string, string>();

  for (const item of located) {
    const relativePath = path.relative(workspaceRoot, item.filePath);
    if (item.metadata.slug !== item.folderName) {
      problems.push(
        `${relativePath}: slug "${item.metadata.slug}" must match folder "${item.folderName}"`,
      );
    }
    if (item.metadata.kind !== item.expectedKind) {
      problems.push(
        `${relativePath}: kind "${item.metadata.kind}" does not match its parent directory`,
      );
    }

    const firstPath = seenSlugs.get(item.metadata.slug);
    if (firstPath) {
      problems.push(`${relativePath}: duplicate slug also declared by ${firstPath}`);
    } else {
      seenSlugs.set(item.metadata.slug, relativePath);
    }
    problems.push(...validateCourseLessons(item, relativePath));
  }

  if (problems.length > 0) throw new ContentValidationError(problems);

  const items = await Promise.all(
    located
      .filter((item) => options.includeDrafts || item.metadata.status !== 'draft')
      .sort((left, right) => {
        const dateDifference = sortDate(right.metadata) - sortDate(left.metadata);
        if (dateDifference !== 0) return dateDifference;
        return left.metadata.slug.localeCompare(right.metadata.slug);
      })
      .map(async (item): Promise<CatalogItem> => {
        const { $schema: _schema, ...metadata } = item.metadata;
        if (metadata.kind === 'presentation') {
          const presentationUrl = (await isFile(
            path.join(path.dirname(item.filePath), 'slides.md'),
          ))
            ? new URL(`presentations/${metadata.slug}/`, config.siteUrl).href
            : undefined;
          return presentationUrl ? { ...metadata, presentationUrl } : metadata;
        }

        const courseUrl = new URL(`courses/${metadata.slug}/`, config.siteUrl).href;
        const lessons = metadata.lessons.map((lesson) => ({
          ...lesson,
          presentationUrl: new URL(`courses/${metadata.slug}/aulas/${lesson.slug}/`, config.siteUrl)
            .href,
        }));
        return { ...metadata, lessons, courseUrl };
      }),
  );

  return contentCatalogSchema.parse({ schemaVersion: 2, items });
}

export async function writeCatalog(
  workspaceRoot: string,
  catalog: ContentCatalog,
): Promise<string> {
  const outputPath = path.join(workspaceRoot, 'dist/content/catalog.json');
  const showcasePath = path.join(workspaceRoot, 'apps/showcase/src/generated/catalog.json');
  const contents = `${JSON.stringify(catalog, null, 2)}\n`;

  await Promise.all(
    [outputPath, showcasePath].map(async (filePath) => {
      const temporaryPath = `${filePath}.tmp`;
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(temporaryPath, contents, 'utf8');
      await rename(temporaryPath, filePath);
    }),
  );

  return outputPath;
}
