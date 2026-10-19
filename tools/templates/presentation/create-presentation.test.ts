import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createPresentation } from './create-presentation.js';

test('creates a draft talk with independent scripts', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'engineering-talks-template-'));
  try {
    const destination = await createPresentation({
      root,
      format: 'talk',
      slug: 'sample-talk',
      title: 'Sample Talk',
    });
    const metadata = JSON.parse(
      await readFile(path.join(destination, 'metadata.json'), 'utf8'),
    ) as {
      kind: string;
      schemaVersion: number;
      status: string;
      slug: string;
    };
    const packageDefinition = JSON.parse(
      await readFile(path.join(destination, 'package.json'), 'utf8'),
    ) as { scripts: { build: string } };

    assert.equal(metadata.status, 'draft');
    assert.equal(metadata.slug, 'sample-talk');
    assert.equal(metadata.schemaVersion, 2);
    assert.equal(metadata.kind, 'presentation');
    assert.match(destination, /presentations\/sample-talk$/);
    assert.match(packageDefinition.scripts.build, /--without-notes/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('rejects unsafe slugs', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'engineering-talks-template-'));
  try {
    await assert.rejects(
      () =>
        createPresentation({
          root,
          format: 'workshop',
          slug: '../unsafe',
          title: 'Unsafe',
        }),
      /lowercase kebab-case/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
