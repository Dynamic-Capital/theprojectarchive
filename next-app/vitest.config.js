import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';

const pgMock = fileURLToPath(new URL('./__mocks__/pg.js', import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
  },
  resolve: {
    alias: {
      pg: pgMock,
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
});
