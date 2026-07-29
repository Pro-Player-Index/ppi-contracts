import { z } from 'zod';
import { IdSchema } from './common.js';
import { IndexProfileSchema } from './index-result.js';

/** A single axis of the comparison radar chart. */
export const RadarAxisSchema = z.object({
  metric: z.string().min(1),
  label: z.string().min(1),
  a: z.number(),
  b: z.number(),
});
export type RadarAxis = z.infer<typeof RadarAxisSchema>;

/** Head-to-head trophy tally for a given trophy type. */
export const TrophyTallySchema = z.object({
  trophyTypeId: IdSchema,
  name: z.string().min(1),
  a: z.number().int().nonnegative(),
  b: z.number().int().nonnegative(),
});
export type TrophyTally = z.infer<typeof TrophyTallySchema>;

/** Head-to-head index score for a given profile. */
export const IndexComparisonSchema = z.object({
  profile: IndexProfileSchema,
  a: z.number(),
  b: z.number(),
});
export type IndexComparison = z.infer<typeof IndexComparisonSchema>;

export const CompareResultSchema = z.object({
  a: IdSchema,
  b: IdSchema,
  radar: z.array(RadarAxisSchema),
  trophies: z.array(TrophyTallySchema),
  indices: z.array(IndexComparisonSchema),
});
export type CompareResult = z.infer<typeof CompareResultSchema>;
