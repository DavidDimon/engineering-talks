#!/usr/bin/env node
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

import {
  presentationFormatSchema,
  type PresentationFormat,
} from '@engineering-talks/content-schema';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CreatePresentationOptions = {
  root: string;
  format: Extract<PresentationFormat, 'talk' | 'workshop'>;
  slug: string;
  title: string;
};

function packageJson(options: CreatePresentationOptions): string {
  const parent = 'presentations';
  const typeTag = options.format;
  return `${JSON.stringify(
    {
      name: `@engineering-talks/presentation-${options.slug}`,
      version: '0.0.0',
      private: true,
      type: 'module',
      scripts: {
        build: `slidev build --base /engineering-talks/${parent}/${options.slug}/ --out ../../dist/${parent}/${options.slug} --without-notes`,
        dev: 'slidev --open',
        validate: `tsx ../../tools/content/src/cli.ts validate --root ../.. --file ${parent}/${options.slug}/metadata.json`,
      },
      devDependencies: {
        '@slidev/cli': '53.0.0',
        '@slidev/theme-default': '0.25.0',
        tsx: '4.23.15',
        vue: '3.5.44',
      },
      nx: {
        name: `${typeTag}-${options.slug}`,
        tags: ['scope:presentation', 'type:presentation', `format:${typeTag}`],
        implicitDependencies: ['content-schema', 'content-tools'],
        targets: {
          build: {
            outputs: [`{workspaceRoot}/dist/${parent}/${options.slug}`],
          },
        },
      },
    },
    null,
    2,
  )}\n`;
}

function metadataJson(options: CreatePresentationOptions): string {
  return `${JSON.stringify(
    {
      $schema: '../../packages/content-schema/presentation-metadata.schema.json',
      schemaVersion: 2,
      kind: 'presentation',
      slug: options.slug,
      title: options.title,
      description: 'Describe the presentation and the value it gives its audience.',
      format: options.format,
      language: 'en',
      topics: ['replace-me'],
      level: 'all-levels',
      deliveredAt: { year: new Date().getFullYear(), approximate: false },
      status: 'draft',
      sourceUrl: `https://github.com/DavidDimon/engineering-talks/tree/main/presentations/${options.slug}`,
      migrationStatus: 'native',
    },
    null,
    2,
  )}\n`;
}

function slidesMarkdown(options: CreatePresentationOptions): string {
  return `---
theme: default
title: '${options.title.replaceAll("'", "''")}'
transition: slide-left
mdc: true
---

# ${options.title}

Add a concise promise for the audience.

---

# The problem

Explain the real constraint or decision that makes this topic useful.

---
layout: center
class: text-center
---

# Thank you

Add links and a practical next step.
`;
}

export async function createPresentation(options: CreatePresentationOptions): Promise<string> {
  if (!slugPattern.test(options.slug)) {
    throw new Error('Slug must use lowercase kebab-case.');
  }
  if (options.title.trim().length === 0) throw new Error('Title must not be empty.');
  presentationFormatSchema.parse(options.format);

  const parent = 'presentations';
  const parentDirectory = path.join(options.root, parent);
  const destination = path.join(parentDirectory, options.slug);
  try {
    await access(destination);
    throw new Error(`Destination already exists: ${destination}`);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') throw error;
  }

  await mkdir(parentDirectory, { recursive: true });
  await mkdir(destination, { recursive: false });
  await Promise.all([
    writeFile(path.join(destination, 'package.json'), packageJson(options), 'utf8'),
    writeFile(path.join(destination, 'metadata.json'), metadataJson(options), 'utf8'),
    writeFile(path.join(destination, 'slides.md'), slidesMarkdown(options), 'utf8'),
    writeFile(
      path.join(destination, 'style.css'),
      '/* Add presentation-specific styles here. */\n',
    ),
  ]);
  return destination;
}

function valueAfter(flag: string, args: readonly string[]): string | undefined {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const rawFormat = valueAfter('--format', args) ?? valueAfter('--type', args);
  const slug = valueAfter('--slug', args);
  const title = valueAfter('--title', args);
  const root = path.resolve(valueAfter('--root', args) ?? process.cwd());

  if (!rawFormat || !slug || !title) {
    throw new Error(
      'Usage: pnpm new:presentation -- --format <talk|workshop> --slug <kebab-case> --title "Title"',
    );
  }

  const format = presentationFormatSchema.parse(rawFormat);
  if (format === 'training') throw new Error('Use a course manifest for training content.');
  const destination = await createPresentation({ root, format, slug, title });
  process.stdout.write(
    `Created ${path.relative(root, destination)}.\nRun pnpm install to register it.\n`,
  );
}

const entryPath = process.argv[1];
if (entryPath && import.meta.url === pathToFileURL(entryPath).href) {
  main().catch((error: unknown) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
