import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';

const pgMock = fileURLToPath(new URL('./__mocks__/pg.js', import.meta.url));
const nextAuthReactMock = fileURLToPath(new URL('./__mocks__/next-auth-react.js', import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
  },
  resolve: {
    alias: {
      pg: pgMock,
      'next-auth/react': nextAuthReactMock,
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
});
