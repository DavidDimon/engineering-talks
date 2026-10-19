import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { buildCatalog, ContentValidationError } from './catalog.js';

async function createWorkspace(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), 'engineering-talks-content-'));
  await writeFile(
    path.join(root, 'content.config.json'),
    JSON.stringify({
      repositoryUrl: 'https://github.com/example/engineering-talks',
      siteBasePath: '/engineering-talks/',
      siteUrl: 'https://example.github.io/engineering-talks/',
    }),
  );
  return root;
}

async function addPresentation(
  root: string,
  options: { slug: string; status?: 'draft' | 'published' },
): Promise<void> {
  const directory = path.join(root, 'presentations', options.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, 'metadata.json'),
    JSON.stringify({
      schemaVersion: 2,
      kind: 'presentation',
      slug: options.slug,
      title: options.slug,
      description: 'Fixture presentation',
      format: 'talk',
      language: 'en',
      topics: ['testing'],
      level: 'all-levels',
      deliveredAt: { year: 2026, approximate: false },
      status: options.status ?? 'published',
      sourceUrl: `https://github.com/example/${options.slug}`,
      migrationStatus: 'native',
    }),
  );
}

async function addCourse(root: string, lessons: unknown[]): Promise<void> {
  const directory = path.join(root, 'courses', 'front-end');
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, 'course.json'),
    JSON.stringify({
      schemaVersion: 2,
      kind: 'course',
      slug: 'front-end',
      title: 'Front-end',
      description: 'Fixture course',
      format: 'training',
      language: 'en',
      topics: ['frontend'],
      status: 'published',
      sourceUrl: 'https://github.com/example/front-end',
      provider: 'Example',
      role: 'Instructor',
      period: { startYear: 2021, endYear: 2022 },
      lessons,
    }),
  );
}

test('generates a deterministic v2 catalog for presentations and courses', async () => {
  const root = await createWorkspace();
  try {
    await addPresentation(root, { slug: 'z-last' });
    await addPresentation(root, { slug: 'hidden-draft', status: 'draft' });
    await addCourse(root, [{ order: 1, slug: 'intro', title: 'Intro', topics: ['web'] }]);

    const catalog = await buildCatalog(root);
    assert.equal(catalog.schemaVersion, 2);
    assert.deepEqual(
      catalog.items.map((item) => [item.kind, item.slug]),
      [
        ['presentation', 'z-last'],
        ['course', 'front-end'],
      ],
    );
    const presentation = catalog.items[0];
    assert.equal(
      presentation?.kind === 'presentation' ? presentation.presentationUrl : undefined,
      undefined,
    );
    const course = catalog.items[1];
    assert.equal(
      course?.kind === 'course' ? course.courseUrl : undefined,
      'https://example.github.io/engineering-talks/courses/front-end/',
    );
    assert.equal(
      course?.kind === 'course' ? course.lessons[0]?.presentationUrl : undefined,
      'https://example.github.io/engineering-talks/courses/front-end/aulas/intro/',
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('only exposes a presentation URL when local slides exist', async () => {
  const root = await createWorkspace();
  try {
    await addPresentation(root, { slug: 'with-slides' });
    await writeFile(path.join(root, 'presentations/with-slides/slides.md'), '# Slides\n');
    const catalog = await buildCatalog(root);
    const item = catalog.items[0];
    assert.equal(
      item?.kind === 'presentation' ? item.presentationUrl : undefined,
      'https://example.github.io/engineering-talks/presentations/with-slides/',
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('rejects duplicate or non-contiguous course lessons', async () => {
  const root = await createWorkspace();
  try {
    await addCourse(root, [
      { order: 1, slug: 'intro', title: 'Intro', topics: ['web'] },
      { order: 3, slug: 'intro', title: 'Again', topics: ['web'] },
    ]);
    await assert.rejects(
      () => buildCatalog(root),
      (error: unknown) =>
        error instanceof ContentValidationError &&
        error.problems.some((problem) => problem.includes('expected 2')) &&
        error.problems.some((problem) => problem.includes('duplicate lesson slug')),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('rejects a slug that differs from its folder', async () => {
  const root = await createWorkspace();
  try {
    await addPresentation(root, { slug: 'metadata-slug' });
    await mkdir(path.join(root, 'presentations/folder-slug'), { recursive: true });
    await writeFile(
      path.join(root, 'presentations/folder-slug/metadata.json'),
      await readFile(path.join(root, 'presentations/metadata-slug/metadata.json')),
    );
    await assert.rejects(() => buildCatalog(root), ContentValidationError);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
