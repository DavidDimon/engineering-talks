import { isAbsolute, relative, sep } from 'node:path';

export function decodeRoutePath(pathname: string, prefix: string): string | undefined {
  try {
    return decodeURIComponent(pathname.slice(prefix.length));
  } catch {
    return undefined;
  }
}

export function isPathInsideRoot(root: string, candidate: string): boolean {
  const relativePath = relative(root, candidate);
  return !isAbsolute(relativePath) && relativePath !== '..' && !relativePath.startsWith(`..${sep}`);
}
