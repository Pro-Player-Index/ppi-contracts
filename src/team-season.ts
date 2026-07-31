import { z } from 'zod';
import { IdSchema } from './common.js';

/**
 * TeamSeason — one organization's participation in a competition-season as a
 * TEAM (org-level), plus its final standings row when known. Answers
 * "which teams played in league X in season Y" and enriches the club history
 * shown on player profiles.
 */
export const TeamSeasonSchema = z.object({
  id: IdSchema,
  organizationId: IdSchema,
  competitionId: IdSchema,
  seasonId: IdSchema,
  finalPosition: z.number().int().positive().nullable().optional(),
  played: z.number().int().nonnegative().nullable().optional(),
  won: z.number().int().nonnegative().nullable().optional(),
  drawn: z.number().int().nonnegative().nullable().optional(),
  lost: z.number().int().nonnegative().nullable().optional(),
  goalsFor: z.number().int().nonnegative().nullable().optional(),
  goalsAgainst: z.number().int().nonnegative().nullable().optional(),
  points: z.number().int().nonnegative().nullable().optional(),
  isChampion: z.boolean().default(false),
});
export type TeamSeason = z.infer<typeof TeamSeasonSchema>;

/** A standings row enriched with the resolved team name — read-model shape. */
export const StandingRowSchema = TeamSeasonSchema.extend({
  organizationName: z.string().min(1),
});
export type StandingRow = z.infer<typeof StandingRowSchema>;
