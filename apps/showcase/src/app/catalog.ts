import type {
  ContentCatalog,
  CourseCatalogItem,
  DeliveredAt,
  PresentationCatalogItem,
} from '@engineering-talks/content-schema';

import catalogData from '../generated/catalog.json';

export type CatalogFilters = {
  query: string;
  topic: string;
  year: number | 'all';
};

export const catalog = catalogData as ContentCatalog;
export const presentations = catalog.items.filter(
  (item): item is PresentationCatalogItem => item.kind === 'presentation',
);
export const courses = catalog.items.filter(
  (item): item is CourseCatalogItem => item.kind === 'course',
);

export const topicOptions = Array.from(
  new Set(presentations.flatMap((presentation) => presentation.topics)),
).sort((left, right) => left.localeCompare(right, 'pt-BR'));

export const yearOptions = Array.from(
  new Set(presentations.map((presentation) => presentation.deliveredAt.year)),
).sort((left, right) => right - left);

export function filterPresentations(
  items: readonly PresentationCatalogItem[],
  filters: CatalogFilters,
): PresentationCatalogItem[] {
  const query = filters.query.trim().toLocaleLowerCase('pt-BR');

  return items.filter((presentation) => {
    const searchableText = [
      presentation.title,
      presentation.description,
      presentation.language,
      ...presentation.topics,
    ]
      .join(' ')
      .toLocaleLowerCase('pt-BR');

    return (
      (query.length === 0 || searchableText.includes(query)) &&
      (filters.year === 'all' || presentation.deliveredAt.year === filters.year) &&
      (filters.topic === 'all' || presentation.topics.includes(filters.topic))
    );
  });
}

export function formatLabel(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toLocaleUpperCase('pt-BR') + part.slice(1))
    .join(' ');
}

export function formatDeliveredAt(date: DeliveredAt): string {
  const formatted = date.month
    ? new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(Date.UTC(date.year, date.month - 1, date.day ?? 1)),
      )
    : String(date.year);
  return date.approximate ? `${formatted} · data aproximada` : formatted;
}

export function localPath(url: string): string {
  return new URL(url).pathname;
}
