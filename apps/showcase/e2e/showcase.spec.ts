import { expect, test } from '@playwright/test';

test('presents the personal archive and keeps filters shareable', async ({ page }) => {
  await page.goto('./');

  await expect(
    page.getByRole('heading', { name: 'Engineering ideas, preserved over time.' }),
  ).toBeVisible();
  await expect(page.locator('.presentation-card')).toHaveCount(5);
  await expect(page.getByRole('heading', { name: 'Courses' })).toBeVisible();

  await page.getByRole('searchbox', { name: 'Search the archive' }).fill('flutter');
  await expect(page.locator('.presentation-card')).toHaveCount(1);
  await expect(page).toHaveURL(/\?busca=flutter$/);

  await page.getByRole('searchbox', { name: 'Search the archive' }).fill('no result');
  await expect(page.getByRole('heading', { name: 'Try a broader search.' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.presentation-card')).toHaveCount(5);
  await expect(page).toHaveURL(/\/engineering-talks\/$/);
});

test('restores year and topic filters from the URL', async ({ page }) => {
  await page.goto('./?ano=2020&tema=flutter');

  await expect(page.getByLabel('Year')).toHaveValue('2020');
  await expect(page.getByRole('combobox', { name: 'Topic', exact: true })).toHaveValue('flutter');
  await expect(page.locator('.presentation-card')).toHaveCount(1);
});

test('persists the chosen color theme', async ({ page }) => {
  await page.goto('./');

  const themeToggle = page.getByRole('button', { name: /Switch to (light|dark) theme/ });
  const initialTheme = await page.locator('html').getAttribute('data-theme');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-theme',
    initialTheme === 'dark' ? 'light' : 'dark',
  );

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute(
    'data-theme',
    initialTheme === 'dark' ? 'light' : 'dark',
  );
});

test('opens the Awari course and exposes all lessons in their original order', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: /View lessons/ }).click();

  await expect(page).toHaveURL(/\/courses\/awari-front-end\/$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Awari front-end course' }),
  ).toBeVisible();
  await expect(page.locator('.lesson-list > li')).toHaveCount(23);
  await expect(page.locator('.lesson-list > li').first()).toContainText(
    'Introduction to web development',
  );
  await expect(page.locator('.lesson-list > li').last()).toContainText('SEO and SSR');
});

test('loads a migrated lesson deck directly and provides previous and next navigation', async ({
  page,
}) => {
  await page.goto('./courses/awari-front-end/aulas/02-introducao-ao-terminal-e-git/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Introduction to the terminal and Git' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Previous lesson/ })).toHaveAttribute(
    'href',
    '/engineering-talks/courses/awari-front-end/aulas/01-introducao-ao-desenvolvimento-web/',
  );
  await expect(page.getByRole('link', { name: /Next lesson/ })).toHaveAttribute(
    'href',
    '/engineering-talks/courses/awari-front-end/aulas/03-introducao-ao-html/',
  );

  await page.goto('./courses/awari-front-end/aulas/02-introducao-ao-terminal-e-git/pt-BR/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Introdução ao terminal e Git' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Aula anterior/ })).toHaveAttribute(
    'href',
    '/engineering-talks/courses/awari-front-end/aulas/01-introducao-ao-desenvolvimento-web/pt-BR/',
  );
});

test('opens migrated presentations while keeping historical sources visible', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('link', { name: /Open presentation/ })).toHaveCount(5);
  await expect(page.getByRole('link', { name: /View original source/ }).first()).toHaveAttribute(
    'href',
    'https://github.com/DavidDimon/mdx-deck-keynote',
  );

  await page
    .getByRole('link', { name: /Open presentation/ })
    .first()
    .click();
  await expect(page.getByRole('heading', { level: 1, name: 'mdx-deck' })).toBeVisible();
});

test('keeps the archive and lesson navigation usable on a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');

  await expect(
    page.getByRole('heading', { name: 'Engineering ideas, preserved over time.' }),
  ).toBeVisible();
  await expect(page.locator('.presentation-card').first()).toBeVisible();

  await page.goto('./courses/awari-front-end/aulas/02-introducao-ao-terminal-e-git/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Introduction to the terminal and Git' }),
  ).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Lesson navigation' })).toBeVisible();
});

test('switches to Portuguese, persists the choice, and opens the translated deck', async ({
  page,
}) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'PT' }).click();

  await expect(
    page.getByRole('heading', { name: 'Ideias de engenharia, preservadas no tempo.' }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\?lang=pt-BR$/);

  await page.reload();
  await expect(page.getByRole('button', { name: 'PT' })).toHaveAttribute('aria-pressed', 'true');
  await page
    .getByRole('link', { name: /Abrir apresentação/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/presentations\/mdx-deck\/pt-BR\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'mdx-deck' })).toBeVisible();
});
