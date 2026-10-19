#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

const [sourceArgument, workspaceArgument = process.cwd()] = process.argv.slice(2);
if (!sourceArgument) {
  throw new Error(
    'Usage: node tools/migrations/convert-awari.mjs <original-repository> [workspace]',
  );
}

const sourceRoot = resolve(sourceArgument);
const workspaceRoot = resolve(workspaceArgument);
const courseRoot = join(workspaceRoot, 'courses', 'awari-front-end');
const course = JSON.parse(await readFile(join(courseRoot, 'course.json'), 'utf8'));
const base = `/engineering-talks/courses/${course.slug}/`;

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function codeBlock(value) {
  let code = value.trim();
  if (code.startsWith("{'") && code.endsWith("'}")) {
    code = code.slice(2, -2).replaceAll('\\n', '\n');
  }
  code = code.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
  return `\n\n\`\`\`js\n${code}\n\`\`\`\n`;
}

function slideAttributes(value) {
  const text = (name) => value.match(new RegExp(`${name}="([^"]*)"`))?.[1];
  const options = value.match(/:image-options="\{([^}]+)\}"/)?.[1] ?? '';
  const number = (name) =>
    Number(options.match(new RegExp(`${name}:\\s*(\\d+)`))?.[1]) || undefined;
  return {
    title: text('title') ?? '',
    image: text('image'),
    marginTitle: text('marginTitle'),
    width: number('width'),
    height: number('height'),
  };
}

function renderImage(attributes) {
  if (!attributes.image) return '';
  return `<CourseImage name="${attributes.image}" alt="${attributes.title}"${
    attributes.width ? ` :width="${attributes.width}"` : ''
  }${attributes.height ? ` :height="${attributes.height}"` : ''} />`;
}

function renderSection(section) {
  const intro = section.match(/^<Intro\s+([\s\S]*?)\s*\/>$/);
  if (intro) return section;

  const wrapped = section.match(/^<Slide\s*([\s\S]*?)>([\s\S]*)<\/Slide>$/);
  const empty = section.match(/^<Slide\s*([\s\S]*?)\s*\/>$/);
  if (!wrapped && !empty) return section;

  const attributes = slideAttributes((wrapped ?? empty)[1]);
  const body = (wrapped?.[2] ?? '')
    .replace(/<pre[^>]*>\s*<code>\s*([\s\S]*?)\s*<\/code>\s*<\/pre>/g, (_match, code) =>
      codeBlock(code),
    )
    .replaceAll('<span>', '')
    .replaceAll('</span>', '')
    .trim();
  return [`# ${attributes.title}`, renderImage(attributes), body].filter(Boolean).join('\n\n');
}

function convertLegacyDeck(source) {
  const contentStart = source.indexOf('<Intro');
  const stripped = source
    .slice(contentStart)
    .replaceAll('<Appear>', '<v-clicks>')
    .replaceAll('</Appear>', '</v-clicks>')
    .replace(/imageOptions=\{\{([^}]+)\}\}/g, ':image-options="{$1}"')
    .replace(/style=\{\{([^}]+)\}\}/g, ':style="{$1}"')
    .replace(/\{`([\s\S]*?)`\s*\}/g, (_match, code) => escapeHtml(code))
    .replaceAll("{' '}", ' ')
    .replace(/\{'(<[^'>]*>)'\}/g, (_match, code) => escapeHtml(code))
    .replace(
      /<a\s+[\s\S]*?href="([^"]+)"[\s\S]*?>([\s\S]*?)<\/a>/g,
      (_match, href, label) => `[${label.trim().replace(/\s+/g, ' ')}](${href.trim()})`,
    )
    .trim();
  return stripped
    .split(/\n---\n/)
    .map((section) => renderSection(section.trim()))
    .join('\n\n---\n\n');
}

for (const [index, lesson] of course.lessons.entries()) {
  const source = await readFile(
    join(sourceRoot, 'src', 'lessons', `lesson${index + 1}.mdx`),
    'utf8',
  );
  const previous = course.lessons[index - 1];
  const next = course.lessons[index + 1];
  const route = (item) => (item ? `${base}aulas/${item.slug}/` : undefined);
  const navigation = [
    '<LessonNav',
    `  course-url="${base}"`,
    previous ? `  previous-url="${route(previous)}"` : undefined,
    next ? `  next-url="${route(next)}"` : undefined,
    '/>',
  ]
    .filter(Boolean)
    .join('\n');
  const output = `---
theme: default
title: '${lesson.title.replaceAll("'", "''")}'
titleTemplate: '%s — Curso de front-end Awari'
author: David Dimon
transition: slide-left
mdc: true
---

<script setup>
import Intro from '../../shared/components/Intro.vue'
import CourseImage from '../../shared/components/CourseImage.vue'
import LessonNav from '../../shared/components/LessonNav.vue'
import '../../shared/style.css'
</script>

${navigation}

${convertLegacyDeck(source)}
`;
  const lessonRoot = join(courseRoot, 'lessons', lesson.slug);
  await mkdir(lessonRoot, { recursive: true });
  await writeFile(join(lessonRoot, 'slides.md'), output);
  process.stdout.write(`Converted ${basename(lessonRoot)}\n`);
}
