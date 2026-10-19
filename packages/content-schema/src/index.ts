import { z } from 'zod';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const siteBasePathPattern = /^\/.+\/$/;
const yearSchema = z.number().int().min(2000).max(2100);

export const presentationFormatSchema = z.enum(['talk', 'workshop', 'training']);
export const presentationLevelSchema = z.enum([
  'beginner',
  'intermediate',
  'advanced',
  'all-levels',
]);
export const publicationStatusSchema = z.enum(['draft', 'published', 'archived']);
export const migrationStatusSchema = z.enum([
  'native',
  'not-started',
  'in-progress',
  'migrated',
  'blocked',
]);

export const deliveredAtSchema = z
  .object({
    year: yearSchema,
    month: z.number().int().min(1).max(12).optional(),
    day: z.number().int().min(1).max(31).optional(),
    approximate: z.boolean(),
  })
  .strict()
  .superRefine((date, context) => {
    if (date.day !== undefined && date.month === undefined) {
      context.addIssue({
        code: 'custom',
        path: ['day'],
        message: 'A day requires a month.',
      });
    }
  });

export const periodSchema = z
  .object({ startYear: yearSchema, endYear: yearSchema })
  .strict()
  .refine((period) => period.endYear >= period.startYear, {
    path: ['endYear'],
    message: 'The end year must not precede the start year.',
  });

const commonMetadataShape = {
  $schema: z.string().optional(),
  schemaVersion: z.literal(2),
  slug: z.string().regex(slugPattern, 'Use a lowercase kebab-case slug.'),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  language: z.string().trim().min(2),
  topics: z.array(z.string().trim().min(1)).min(1),
  status: publicationStatusSchema,
  sourceUrl: z.url(),
  historicalNotice: z.string().trim().min(1).optional(),
};

export const presentationMetadataSchema = z
  .object({
    ...commonMetadataShape,
    kind: z.literal('presentation'),
    format: presentationFormatSchema,
    level: presentationLevelSchema,
    deliveredAt: deliveredAtSchema,
    durationMinutes: z.number().int().positive().optional(),
    migrationStatus: migrationStatusSchema,
  })
  .strict();

export const courseLessonSchema = z
  .object({
    order: z.number().int().positive(),
    slug: z.string().regex(slugPattern, 'Use a lowercase kebab-case slug.'),
    title: z.string().trim().min(1),
    topics: z.array(z.string().trim().min(1)).min(1),
  })
  .strict();

export const courseMetadataSchema = z
  .object({
    ...commonMetadataShape,
    kind: z.literal('course'),
    format: z.literal('training'),
    provider: z.string().trim().min(1),
    role: z.string().trim().min(1),
    period: periodSchema,
    lessons: z.array(courseLessonSchema).min(1),
  })
  .strict();

export const catalogItemMetadataSchema = z.discriminatedUnion('kind', [
  presentationMetadataSchema,
  courseMetadataSchema,
]);

export const contentConfigSchema = z
  .object({
    $schema: z.string().optional(),
    repositoryUrl: z.url(),
    siteBasePath: z
      .string()
      .regex(siteBasePathPattern, 'Use an absolute path with leading and trailing slashes.'),
    siteUrl: z.url().refine((value) => value.endsWith('/'), 'Use a URL with a trailing slash.'),
  })
  .strict()
  .superRefine((config, context) => {
    if (new URL(config.siteUrl).pathname !== config.siteBasePath) {
      context.addIssue({
        code: 'custom',
        path: ['siteUrl'],
        message: 'The site URL path must match siteBasePath.',
      });
    }
  });

export const presentationCatalogItemSchema = presentationMetadataSchema
  .omit({ $schema: true })
  .extend({ presentationUrl: z.url().optional() });

export const courseCatalogLessonSchema = courseLessonSchema.extend({
  presentationUrl: z.url().optional(),
});

export const courseCatalogItemSchema = courseMetadataSchema
  .omit({ $schema: true, lessons: true })
  .extend({
    courseUrl: z.url().optional(),
    lessons: z.array(courseCatalogLessonSchema),
  });

export const catalogItemSchema = z.discriminatedUnion('kind', [
  presentationCatalogItemSchema,
  courseCatalogItemSchema,
]);

export const contentCatalogSchema = z
  .object({ schemaVersion: z.literal(2), items: z.array(catalogItemSchema) })
  .strict();

export type PresentationFormat = z.infer<typeof presentationFormatSchema>;
export type PresentationLevel = z.infer<typeof presentationLevelSchema>;
export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type MigrationStatus = z.infer<typeof migrationStatusSchema>;
export type DeliveredAt = z.infer<typeof deliveredAtSchema>;
export type Period = z.infer<typeof periodSchema>;
export type PresentationMetadata = z.infer<typeof presentationMetadataSchema>;
export type CourseLesson = z.infer<typeof courseLessonSchema>;
export type CourseMetadata = z.infer<typeof courseMetadataSchema>;
export type CatalogItemMetadata = z.infer<typeof catalogItemMetadataSchema>;
export type ContentConfig = z.infer<typeof contentConfigSchema>;
export type PresentationCatalogItem = z.infer<typeof presentationCatalogItemSchema>;
export type CourseCatalogLesson = z.infer<typeof courseCatalogLessonSchema>;
export type CourseCatalogItem = z.infer<typeof courseCatalogItemSchema>;
export type CatalogItem = z.infer<typeof catalogItemSchema>;
export type ContentCatalog = z.infer<typeof contentCatalogSchema>;
