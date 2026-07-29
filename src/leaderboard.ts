import { z } from 'zod';
import { IdSchema } from './common.js';

export const LeaderboardEntrySchema = z.object({
  rank: z.number().int().positive(),
  playerId: IdSchema,
  knownAs: z.string().min(1),
  /** Metric key this leaderboard ranks by, e.g. "goals" or "ppi_adjusted". */
  metric: z.string().min(1),
  value: z.number(),
});
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;
