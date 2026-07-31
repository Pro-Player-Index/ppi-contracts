import { z } from 'zod';
import { IdSchema, IsoDateSchema, UrlSchema } from './common.js';

export const SeveritySchema = z.number().int().min(1).max(5);
export type Severity = z.infer<typeof SeveritySchema>;

export const EvidenceLevelSchema = z.enum(['alleged', 'reported', 'proven']);
export type EvidenceLevel = z.infer<typeof EvidenceLevelSchema>;

export const ControversyCategorySchema = z.enum([
  'corruption',
  'doping',
  'refereeing',
  'governance',
  'unfair_goal',
  'other',
]);
export type ControversyCategory = z.infer<typeof ControversyCategorySchema>;

export const ControversySchema = z.object({
  id: IdSchema,
  title: z.string().min(1),
  description: z.string(),
  dateStart: IsoDateSchema,
  dateEnd: IsoDateSchema.optional(),
  severity: SeveritySchema,
  evidenceLevel: EvidenceLevelSchema,
  category: ControversyCategorySchema,
  sourceUrls: z.array(UrlSchema).default([]),
});
export type Controversy = z.infer<typeof ControversySchema>;

export const ControversySubjectTypeSchema = z.enum([
  'person',
  'award',
  'competition',
  'season',
  'organization',
  'career_moment',
]);
export type ControversySubjectType = z.infer<
  typeof ControversySubjectTypeSchema
>;

export const ControversyLinkSchema = z.object({
  id: IdSchema,
  controversyId: IdSchema,
  subjectType: ControversySubjectTypeSchema,
  subjectId: IdSchema,
  /** Directional impact on the subject, -1 (harmful) .. 1 (favourable). */
  impact: z.number().min(-1).max(1),
  note: z.string().optional(),
});
export type ControversyLink = z.infer<typeof ControversyLinkSchema>;
