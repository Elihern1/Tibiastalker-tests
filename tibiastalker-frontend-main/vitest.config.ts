import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
    css: true,
    environmentOptions: { jsdom: { url: 'http://localhost' } },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: [
        'src/utils/strings.ts',
        'src/utils/url.ts',
        'src/utils/levels.ts',
        'src/components/ResultCard.tsx',
        'src/components/ResultsList.tsx',
        'src/components/SearchBox.tsx',
      ],
      //ignore les fichiers de tests/config
      exclude: [
        '**/node_modules/**',
        '**/.next/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
        '**/__tests__/**',
        '**/*.test.*',
        '**/vitest.config.*',
        '**/next.config.*',
      ],
    },
  },
});
