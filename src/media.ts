import { z } from 'zod';
import { IdSchema, UrlSchema, IsoDateTimeSchema } from './common.js';

export const MediaSubjectTypeSchema = z.enum(['person', 'award', 'match']);
export type MediaSubjectType = z.infer<typeof MediaSubjectTypeSchema>;

export const MediaProviderSchema = z.enum(['youtube', 'vimeo']);
export type MediaProvider = z.infer<typeof MediaProviderSchema>;

export const MediaKindSchema = z.enum(['highlight', 'goal', 'documentary']);
export type MediaKind = z.infer<typeof MediaKindSchema>;

export const MediaItemSchema = z.object({
  id: IdSchema,
  subjectType: MediaSubjectTypeSchema,
  subjectId: IdSchema,
  provider: MediaProviderSchema,
  externalUrl: UrlSchema,
  embedId: z.string().min(1),
  title: z.string().min(1),
  thumbnailUrl: UrlSchema.optional(),
  kind: MediaKindSchema,
  publishedAt: IsoDateTimeSchema.optional(),
});
export type MediaItem = z.infer<typeof MediaItemSchema>;
