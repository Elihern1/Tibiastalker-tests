import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
    css: true,
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/.next/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
        '**/next.config.*',
        '**/vite.config.*',
        '**/vitest.config.*',
        '**/test/**' // on n’inclut pas les fichiers de setup dans la couverture
      ]
    }
  }
});