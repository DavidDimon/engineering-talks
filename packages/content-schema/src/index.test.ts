import assert from 'node:assert/strict';
import test from 'node:test';

import {
  catalogItemMetadataSchema,
  contentConfigSchema,
  courseMetadataSchema,
  presentationMetadataSchema,
} from './index.js';

const presentation = {
  schemaVersion: 2,
  kind: 'presentation',
  slug: 'reliable-frontends',
  title: 'Reliable Frontends',
  description: 'A practical guide to dependable UI delivery.',
  format: 'talk',
  language: 'en',
  topics: ['frontend', 'testing'],
  level: 'intermediate',
  deliveredAt: { year: 2026, month: 10, approximate: false },
  status: 'published',
  sourceUrl: 'https://github.com/example/reliable-frontends',
  migrationStatus: 'native',
} as const;

test('accepts presentation metadata with a delivered date', () => {
  assert.deepEqual(presentationMetadataSchema.parse(presentation), presentation);
  assert.equal(catalogItemMetadataSchema.parse(presentation).kind, 'presentation');
});

test('accepts course metadata with an inclusive period', () => {
  const result = courseMetadataSchema.safeParse({
    schemaVersion: 2,
    kind: 'course',
    slug: 'front-end',
    title: 'Front-end',
    description: 'A front-end course.',
    format: 'training',
    language: 'pt-BR',
    topics: ['frontend'],
    status: 'published',
    sourceUrl: 'https://github.com/example/front-end',
    provider: 'Example',
    role: 'Instructor',
    period: { startYear: 2021, endYear: 2022 },
    lessons: [{ order: 1, slug: 'intro', title: 'Intro', topics: ['web'] }],
  });
  assert.equal(result.success, true);
});

test('rejects unknown fields, invalid slugs, and invalid dates', () => {
  assert.equal(
    presentationMetadataSchema.safeParse({
      ...presentation,
      slug: 'ReliableFrontends',
      deliveredAt: { year: 2026, day: 16, approximate: false },
      unexpected: true,
    }).success,
    false,
  );
});

test('requires a deployable site base path shape', () => {
  assert.equal(
    contentConfigSchema.safeParse({
      repositoryUrl: 'https://github.com/example/repository',
      siteBasePath: 'repository',
    }).success,
    false,
  );
});
