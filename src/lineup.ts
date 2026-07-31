import { z } from 'zod';
import { IdSchema } from './common.js';

/** Role of a player inside a single match lineup. */
export const LineupRoleSchema = z.enum(['starter', 'substitute', 'unused_sub']);
export type LineupRole = z.infer<typeof LineupRoleSchema>;

/** One player's slot inside a team-sheet. */
export const LineupSpotSchema = z.object({
  id: IdSchema,
  personId: IdSchema.nullable().optional(),
  personName: z.string().nullable().optional(),
  positionCode: z.string().nullable().optional(),
  role: LineupRoleSchema,
  shirtNumber: z.number().int().positive().nullable().optional(),
  isCaptain: z.boolean().default(false),
  minuteOn: z.number().int().nonnegative().nullable().optional(),
  minuteOff: z.number().int().nonnegative().nullable().optional(),
});
export type LineupSpot = z.infer<typeof LineupSpotSchema>;

/** One team's team-sheet for one match ("la alineación"). */
export const LineupSchema = z.object({
  id: IdSchema,
  matchId: IdSchema,
  organizationId: IdSchema,
  organizationName: z.string().min(1),
  formation: z.string().nullable().optional(),
  isHome: z.boolean(),
  spots: z.array(LineupSpotSchema),
});
export type Lineup = z.infer<typeof LineupSchema>;
