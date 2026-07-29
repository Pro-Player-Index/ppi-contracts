import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common.js';

export const CareerMomentKindSchema = z.enum([
  'goal',
  'performance',
  'debut',
  'record',
  'milestone',
  'quote',
]);
export type CareerMomentKind = z.infer<typeof CareerMomentKindSchema>;

export const ImportanceSchema = z.number().int().min(1).max(5);
export type Importance = z.infer<typeof ImportanceSchema>;

export const CareerMomentSchema = z.object({
  id: IdSchema,
  personId: IdSchema,
  date: IsoDateSchema,
  title: z.string().min(1),
  description: z.string(),
  kind: CareerMomentKindSchema,
  importance: ImportanceSchema,
  mediaItemId: IdSchema.optional(),
  relatedAwardId: IdSchema.optional(),
});
export type CareerMoment = z.infer<typeof CareerMomentSchema>;
