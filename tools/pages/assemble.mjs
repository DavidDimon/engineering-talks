import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const outputRoot = join(workspaceRoot, 'dist', 'pages');
const showcaseOutput = join(workspaceRoot, 'dist', 'apps', 'showcase');

async function assertDirectory(path, description) {
  const details = await stat(path).catch(() => undefined);
  if (!details?.isDirectory()) {
    throw new Error(`${description} is missing at ${path}. Build it before assembling Pages.`);
  }
}

async function copyPresentationGroup(group) {
  const source = join(workspaceRoot, 'dist', group);
  const entries = await readdir(source, { withFileTypes: true }).catch(() => []);

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const presentationOutput = join(source, entry.name);
    await assertDirectory(presentationOutput, `Built ${group} presentation`);
    await cp(presentationOutput, join(outputRoot, group, entry.name), { recursive: true });
  }
}

async function createShowcaseRoutes() {
  const catalog = JSON.parse(
    await readFile(join(workspaceRoot, 'dist', 'content', 'catalog.json'), 'utf8'),
  );
  const shell = join(outputRoot, 'index.html');

  for (const item of catalog.items) {
    if (item.kind !== 'course') continue;
    const courseRoute = join(outputRoot, 'courses', item.slug);
    await mkdir(courseRoute, { recursive: true });
    await cp(shell, join(courseRoute, 'index.html'));

    for (const lesson of item.lessons) {
      const lessonRoute = join(courseRoute, 'aulas', lesson.slug);
      await mkdir(lessonRoute, { recursive: true });
      await cp(shell, join(lessonRoute, 'index.html'));
    }
  }
}

await assertDirectory(showcaseOutput, 'Built showcase');
await rm(outputRoot, { force: true, recursive: true });
await mkdir(outputRoot, { recursive: true });
await cp(showcaseOutput, outputRoot, { recursive: true });
await createShowcaseRoutes();
await Promise.all([copyPresentationGroup('presentations'), copyPresentationGroup('courses')]);
await writeFile(join(outputRoot, '.nojekyll'), '');

console.log(`Assembled GitHub Pages artifact at ${outputRoot}`);
