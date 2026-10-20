import { spawnSync } from 'node:child_process';
import { accessSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const slugs = process.argv.slice(2);

if (slugs.length === 0 || slugs.some((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
  throw new Error('Pass one or more valid presentation slugs.');
}

function build(slug, sourceFile, localePath) {
  const presentationRoot = join(workspaceRoot, 'presentations', slug);
  const outputRoot = join(workspaceRoot, 'dist', 'presentations', slug);
  const slidevExecutable = join(
    presentationRoot,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'slidev.cmd' : 'slidev',
  );
  const route = `/engineering-talks/presentations/${slug}/${localePath}`;
  const output = join(outputRoot, localePath);
  accessSync(join(presentationRoot, sourceFile));
  const result = spawnSync(
    slidevExecutable,
    ['build', sourceFile, '--base', route, '--out', output, '--without-notes'],
    { cwd: presentationRoot, encoding: 'utf8', env: process.env },
  );

  if (result.status !== 0) {
    if (result.stdout) process.stderr.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    if (result.error) process.stderr.write(`${result.error.message}\n`);
    process.exit(result.status ?? 1);
  }
}

for (const slug of slugs) {
  const outputRoot = join(workspaceRoot, 'dist', 'presentations', slug);
  build(slug, 'slides.en.md', '');
  build(slug, 'slides.md', 'pt-BR/');
  accessSync(join(outputRoot, 'index.html'));
  accessSync(join(outputRoot, 'pt-BR', 'index.html'));
  process.stdout.write(`Built bilingual presentation: ${slug}\n`);
}
