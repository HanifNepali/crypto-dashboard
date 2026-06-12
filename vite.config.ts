import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: true, gzipSize: true })],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Skip CSS/asset files imported by dependencies so Rollup handles them natively
            if (id.endsWith('.css') || id.endsWith('.scss')) {
              return;
            }

            if (id.includes('recharts')) return 'vendor-charts';
            if (id.includes('@tanstack/react-query')) return 'vendor-query';
            // no fallback bucket — let everything else stay auto-chunked
            // per Rollup's default reachability analysis
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(import.meta.dirname, './src/test/setup.ts')],
    css: true,
    exclude: [...configDefaults.exclude, 'tests/**'],
  },
});
