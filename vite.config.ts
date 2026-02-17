/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import path from 'node:path'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [react()],
   optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
    ],
  },
  test: {
    projects: [
      // 🔹 Projeto normal (CLI)
      {
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: './src/setupTests.ts',
        },
      },

      // 🔹 Projeto usado pelo Storybook
      {
        plugins: [
          storybookTest({
            configDir: path.resolve(__dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          environment: 'jsdom',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
