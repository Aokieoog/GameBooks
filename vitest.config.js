import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'mochawesome-report',
      reportFilename: 'index',
      overwrite: true,
      html: true,
      json: true,
    },
  },
});