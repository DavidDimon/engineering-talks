const modules = import.meta.glob('./assets/images/*', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const images = new Map(
  Object.entries(modules).map(([path, url]) => [
    path
      .split('/')
      .at(-1)
      ?.replace(/\.[^.]+$/, ''),
    url,
  ]),
);

export function imageUrl(name: string): string {
  return images.get(name) ?? '';
}
