import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common.js';
import { PlayerSchema } from './person.js';
import { OrganizationSchema } from './organization.js';
import { EvidenceLevelSchema, SeveritySchema } from './controversy.js';
import { MediaItemSchema } from './media.js';
import { IndexBundleSchema } from './index-result.js';
import { StatValueSchema } from './stat.js';

/**
 * A single item on a player's chronological timeline. Aggregates trophies,
 * career moments and controversies into one shape for the frontend.
 */
export const TimelineItemTypeSchema = z.enum([
  'trophy',
  'moment',
  'controversy',
]);
export type TimelineItemType = z.infer<typeof TimelineItemTypeSchema>;

export const TimelineItemSchema = z.object({
  /** Id of the underlying entity (award / career-moment / controversy). */
  id: IdSchema,
  type: TimelineItemTypeSchema,
  date: IsoDateSchema,
  title: z.string().min(1),
  description: z.string().optional(),
  /** Present for controversy-derived items. */
  evidenceLevel: EvidenceLevelSchema.optional(),
  /** Present for controversy-derived items. */
  severity: SeveritySchema.optional(),
  /** Optional attached media (highlight, goal, etc). */
  media: MediaItemSchema.optional(),
});
export type TimelineItem = z.infer<typeof TimelineItemSchema>;

/**
 * Read-model DTO for the player profile page: the player, current
 * affiliations, headline stats, the index bundle and the full timeline.
 */
export const PlayerProfileSchema = z.object({
  player: PlayerSchema,
  organizations: z.array(OrganizationSchema).default([]),
  headlineStats: z.array(StatValueSchema).default([]),
  index: IndexBundleSchema,
  timeline: z.array(TimelineItemSchema).default([]),
});
export type PlayerProfile = z.infer<typeof PlayerProfileSchema>;
