import { z } from 'zod';
import { IdSchema } from './common.js';

export const TrophyCategorySchema = z.enum(['team', 'individual']);
export type TrophyCategory = z.infer<typeof TrophyCategorySchema>;

/**
 * How a trophy is decided — a first-class distinction in the PPI model:
 * - objective_stat: won by a hard number (e.g. top scorer / Golden Boot)
 * - voted_opinion: decided by a vote (e.g. Ballon d'Or)
 * - committee: awarded by a committee's discretion
 */
export const MeritBasisSchema = z.enum([
  'objective_stat',
  'voted_opinion',
  'committee',
]);
export type MeritBasis = z.infer<typeof MeritBasisSchema>;

export const TrophyTypeSchema = z.object({
  id: IdSchema,
  sportId: IdSchema,
  competitionId: IdSchema.optional(),
  name: z.string().min(1),
  category: TrophyCategorySchema,
  meritBasis: MeritBasisSchema,
  /** For objective_stat trophies, the metric that decides it. */
  objectiveMetricId: IdSchema.optional(),
  /** Relative prestige weight used by the index, typically 0..1. */
  prestigeWeight: z.number().min(0),
});
export type TrophyType = z.infer<typeof TrophyTypeSchema>;
