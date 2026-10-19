import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './apps/showcase/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173/engineering-talks/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm pages:serve',
    url: 'http://127.0.0.1:4173/engineering-talks/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
