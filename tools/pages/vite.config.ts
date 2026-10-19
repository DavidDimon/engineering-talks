import { resolve } from 'node:path';

export default {
  base: '/engineering-talks/',
  build: {
    emptyOutDir: false,
    outDir: 'dist/pages',
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
  root: resolve(import.meta.dirname, '../..'),
};
