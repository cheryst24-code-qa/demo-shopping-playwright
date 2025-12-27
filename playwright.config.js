// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 10000 },
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://demoshopping.ru',
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  projects: [{
    name: 'chromium',
    use: { ...require('@playwright/test').devices['Desktop Chrome'] }
  }],
  outputDir: 'test-results/'
});