import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common.js';
import { LineupSchema } from './lineup.js';

/** A single match event (goal, card, substitution…) with resolved player name. */
export const MatchEventSchema = z.object({
  id: IdSchema,
  personId: IdSchema.nullable().optional(),
  personName: z.string().nullable().optional(),
  minute: z.number().int().nonnegative(),
  type: z.string().min(1),
  /** Team the event belongs to (for side placement + running score). */
  organizationId: IdSchema.nullable().optional(),
  organizationName: z.string().nullable().optional(),
  /** Optional detail, e.g. "penalty", "header", "Hand of God". */
  detail: z.string().nullable().optional(),
});
export type MatchEvent = z.infer<typeof MatchEventSchema>;

/** Match summary row — used in listings (e.g. a national team's match history). */
export const MatchSummarySchema = z.object({
  id: IdSchema,
  competitionId: IdSchema,
  competitionName: z.string().min(1),
  seasonId: IdSchema,
  seasonLabel: z.string().min(1),
  date: IsoDateSchema,
  stage: z.string().nullable().optional(),
  homeOrgId: IdSchema,
  homeOrgName: z.string().min(1),
  awayOrgId: IdSchema,
  awayOrgName: z.string().min(1),
  homeScore: z.number().int().nonnegative(),
  awayScore: z.number().int().nonnegative(),
});
export type MatchSummary = z.infer<typeof MatchSummarySchema>;

/** Full match detail: summary + both lineups + events. */
export const MatchDetailSchema = MatchSummarySchema.extend({
  lineups: z.array(LineupSchema),
  events: z.array(MatchEventSchema),
});
export type MatchDetail = z.infer<typeof MatchDetailSchema>;
