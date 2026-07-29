import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common.js';

export const CompetitionScopeSchema = z.enum([
  'domestic',
  'continental',
  'international',
]);
export type CompetitionScope = z.infer<typeof CompetitionScopeSchema>;

export const CompetitionSchema = z.object({
  id: IdSchema,
  sportId: IdSchema,
  name: z.string().min(1),
  scope: CompetitionScopeSchema,
  /** Ranking tier, 1 = top flight. */
  tier: z.number().int().positive(),
});
export type Competition = z.infer<typeof CompetitionSchema>;

export const SeasonSchema = z.object({
  id: IdSchema,
  competitionId: IdSchema,
  /** Human label, e.g. "2023/24" or "2024". */
  label: z.string().min(1),
  startDate: IsoDateSchema,
  endDate: IsoDateSchema,
});
export type Season = z.infer<typeof SeasonSchema>;
