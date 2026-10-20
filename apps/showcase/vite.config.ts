import react from '@vitejs/plugin-react';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

import { decodeRoutePath, isPathInsideRoot } from './src/app/static-build-path.js';

type StaticBuildRoute = {
  fallbackSegments: number;
  prefix: string;
  root: string;
};

const staticBuildRoutes: StaticBuildRoute[] = [
  {
    fallbackSegments: 1,
    prefix: '/engineering-talks/presentations/',
    root: resolve(import.meta.dirname, '../../dist/presentations'),
  },
  {
    fallbackSegments: 3,
    prefix: '/engineering-talks/courses/',
    root: resolve(import.meta.dirname, '../../dist/courses'),
  },
];

const mimeTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function resolveBuildFile(route: StaticBuildRoute, pathname: string): string | undefined {
  const relativePath = decodeRoutePath(pathname, route.prefix);
  if (relativePath === undefined) return undefined;
  if (route.fallbackSegments === 3 && !relativePath.includes('/aulas/')) return undefined;

  let filePath = normalize(join(route.root, relativePath));
  if (!isPathInsideRoot(route.root, filePath)) return undefined;

  try {
    if (statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html');
    if (statSync(filePath).isFile()) return filePath;
  } catch {
    const segments = relativePath.split('/').filter(Boolean);
    if (segments.length < route.fallbackSegments) return undefined;
    const fallback = normalize(
      join(route.root, ...segments.slice(0, route.fallbackSegments), 'index.html'),
    );
    if (!isPathInsideRoot(route.root, fallback)) return undefined;
    try {
      return statSync(fallback).isFile() ? fallback : undefined;
    } catch {
      return undefined;
    }
  }

  return undefined;
}

function staticContentBuilds(): Plugin {
  return {
    name: 'serve-static-content-builds',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
        const route = staticBuildRoutes.find((candidate) => pathname.startsWith(candidate.prefix));
        if (!route) return next();

        const filePath = resolveBuildFile(route, pathname);
        if (!filePath) return next();
        response.setHeader(
          'Content-Type',
          mimeTypes[extname(filePath)] ?? 'application/octet-stream',
        );
        createReadStream(filePath).pipe(response);
      });
    },
  };
}

export default defineConfig({
  base: '/engineering-talks/',
  build: {
    outDir: '../../dist/apps/showcase',
    emptyOutDir: true,
  },
  plugins: [staticContentBuilds(), react()],
});
