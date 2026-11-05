import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common.js';

/**
 * Event-location + heatmap contracts (E-Phase4).
 *
 * Coordinate-level on-ball event data (passes, shots, carries, dribbles…) for
 * the handful of matches covered by StatsBomb Open Data. Coordinates use the
 * StatsBomb pitch frame: x ∈ [0,120], y ∈ [0,80], origin top-left, with the
 * acting player's team always attacking left → right. This exists ONLY for the
 * covered matches — there is no event data for historical players at any price,
 * so every surface that renders it must label its provenance and coverage.
 */

/** A single on-ball event with a pitch location (StatsBomb frame). */
export const MatchEventPointSchema = z.object({
  id: IdSchema,
  personId: IdSchema,
  matchId: IdSchema,
  minute: z.number().int().nonnegative().nullable().optional(),
  second: z.number().int().nonnegative().nullable().optional(),
  /** Event family, e.g. "Pass", "Shot", "Carry", "Dribble", "Ball Receipt*". */
  type: z.string().min(1),
  x: z.number(),
  y: z.number(),
  /** Destination of a pass/carry, when the event has one. */
  endX: z.number().nullable().optional(),
  endY: z.number().nullable().optional(),
  outcome: z.string().nullable().optional(),
  bodyPart: z.string().nullable().optional(),
  /** Provenance tag, e.g. "statsbomb-open". */
  source: z.string().min(1),
});
export type MatchEventPoint = z.infer<typeof MatchEventPointSchema>;

/** One covered match contributing to a player's heatmap. */
export const HeatmapMatchSchema = z.object({
  matchId: IdSchema,
  label: z.string().min(1),
  date: IsoDateSchema.nullable().optional(),
  events: z.number().int().nonnegative(),
});
export type HeatmapMatch = z.infer<typeof HeatmapMatchSchema>;

/** One aggregated grid cell: center coordinates (pitch units) + event count. */
export const HeatmapCellSchema = z.object({
  cx: z.number(),
  cy: z.number(),
  count: z.number().int().nonnegative(),
});
export type HeatmapCell = z.infer<typeof HeatmapCellSchema>;

/** A shot marker (for overlaying goals/attempts on the heatmap). */
export const HeatmapShotSchema = z.object({
  x: z.number(),
  y: z.number(),
  goal: z.boolean(),
});
export type HeatmapShot = z.infer<typeof HeatmapShotSchema>;

/**
 * A player's touch heatmap, aggregated from {@link MatchEventPoint} rows across
 * every covered match. `cells` is a sparse grid (only non-empty cells) binned
 * into `cols` × `rows`; `maxCount` normalizes the density ramp client-side.
 */
export const PlayerHeatmapSchema = z.object({
  personId: IdSchema,
  source: z.string().min(1),
  pitchWidth: z.number().positive(),
  pitchHeight: z.number().positive(),
  cols: z.number().int().positive(),
  rows: z.number().int().positive(),
  totalEvents: z.number().int().nonnegative(),
  maxCount: z.number().int().nonnegative(),
  cells: z.array(HeatmapCellSchema),
  shots: z.array(HeatmapShotSchema),
  matches: z.array(HeatmapMatchSchema),
});
export type PlayerHeatmap = z.infer<typeof PlayerHeatmapSchema>;
