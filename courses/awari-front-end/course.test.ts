import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const courseRoot = dirname(fileURLToPath(import.meta.url));

test('every manifest lesson has one ordered, uniquely addressed Slidev source', async () => {
  const course = JSON.parse(await readFile(join(courseRoot, 'course.json'), 'utf8')) as {
    lessons: Array<{ order: number; slug: string }>;
  };

  assert.equal(course.lessons.length, 23);
  assert.equal(new Set(course.lessons.map((lesson) => lesson.slug)).size, course.lessons.length);

  await Promise.all(
    course.lessons.map(async (lesson, index) => {
      assert.equal(lesson.order, index + 1);
      await access(join(courseRoot, 'lessons', lesson.slug, 'slides.md'));
    }),
  );
});
