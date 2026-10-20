import { spawnSync } from 'node:child_process';
import { accessSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const courseRoot = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = join(courseRoot, '..', '..');
const course = JSON.parse(readFileSync(join(courseRoot, 'course.json'), 'utf8'));
const slidevExecutable = join(
  courseRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'slidev.cmd' : 'slidev',
);

for (const lesson of course.lessons) {
  for (const variant of [
    { sourceFile: 'slides.en.md', localePath: '' },
    { sourceFile: 'slides.md', localePath: 'pt-BR/' },
  ]) {
    const source = join(courseRoot, 'lessons', lesson.slug, variant.sourceFile);
    const output = join(
      workspaceRoot,
      'dist',
      'courses',
      course.slug,
      'aulas',
      lesson.slug,
      variant.localePath,
    );
    accessSync(source);
    const route = `/engineering-talks/courses/${course.slug}/aulas/${lesson.slug}/${variant.localePath}`;
    const result = spawnSync(
      slidevExecutable,
      ['build', source, '--base', route, '--out', output, '--without-notes'],
      { cwd: courseRoot, encoding: 'utf8', env: process.env },
    );

    if (result.status !== 0) {
      if (result.stdout) process.stderr.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
      if (result.error) process.stderr.write(`${result.error.message}\n`);
      process.exit(result.status ?? 1);
    }

    accessSync(join(output, 'index.html'));
  }

  process.stdout.write(
    `Built bilingual lesson ${String(lesson.order).padStart(2, '0')}: ${lesson.title}\n`,
  );
}
