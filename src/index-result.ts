import { z } from 'zod';
import { IdSchema } from './common.js';

/**
 * The three lenses the PPI Index can be computed under:
 * - objective: driven by hard, measurable achievements only
 * - raw_palmares: pure trophy count / prestige, unadjusted
 * - adjusted: palmares adjusted for controversy, era, and context
 */
export const IndexProfileSchema = z.enum([
  'objective',
  'raw_palmares',
  'adjusted',
]);
export type IndexProfile = z.infer<typeof IndexProfileSchema>;

export const IndexBreakdownItemSchema = z.object({
  /** Name of the contributing component, e.g. "ballon_dor", "goals". */
  component: z.string().min(1),
  /** Signed contribution of this component to the final score. */
  contribution: z.number(),
  note: z.string().optional(),
});
export type IndexBreakdownItem = z.infer<typeof IndexBreakdownItemSchema>;

export const IndexResultSchema = z.object({
  playerId: IdSchema,
  profile: IndexProfileSchema,
  score: z.number(),
  breakdown: z.array(IndexBreakdownItemSchema),
});
export type IndexResult = z.infer<typeof IndexResultSchema>;

/** All three profile variants computed for a single player. */
export const IndexBundleSchema = z.object({
  playerId: IdSchema,
  objective: IndexResultSchema,
  rawPalmares: IndexResultSchema,
  adjusted: IndexResultSchema,
});
export type IndexBundle = z.infer<typeof IndexBundleSchema>;
