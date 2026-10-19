import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/engineering-talks/',
  build: {
    outDir: '../../dist/apps/showcase',
    emptyOutDir: true,
  },
  plugins: [react()],
});
