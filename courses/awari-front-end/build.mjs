import { spawnSync } from 'node:child_process';
import { accessSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const courseRoot = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = join(courseRoot, '..', '..');
const course = JSON.parse(readFileSync(join(courseRoot, 'course.json'), 'utf8'));

for (const lesson of course.lessons) {
  const source = join(courseRoot, 'lessons', lesson.slug, 'slides.md');
  const output = join(workspaceRoot, 'dist', 'courses', course.slug, 'aulas', lesson.slug);
  accessSync(source);
  const route = `/engineering-talks/courses/${course.slug}/aulas/${lesson.slug}/`;
  const result = spawnSync(
    'slidev',
    ['build', source, '--base', route, '--out', output, '--without-notes'],
    { cwd: courseRoot, encoding: 'utf8', env: process.env },
  );

  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  accessSync(join(output, 'index.html'));
  process.stdout.write(`Built lesson ${String(lesson.order).padStart(2, '0')}: ${lesson.title}\n`);
}
