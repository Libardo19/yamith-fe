import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  expect: { timeout: 15000 },
  workers: 1,
  use: { baseURL: 'http://localhost:3000', channel: 'msedge', trace: 'retain-on-failure' },
  reporter: [['list']],
  outputDir: 'test-results'
})
