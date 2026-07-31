import { z } from 'zod';
import {
  IdSchema,
  SlugSchema,
  GenderSchema,
  FootSchema,
  ExternalIdsSchema,
} from './common.js';
import { TrophyCategorySchema, MeritBasisSchema } from './trophy.js';
import { OrganizationTypeSchema } from './organization.js';
import { CompetitionScopeSchema } from './competition.js';
import {
  EvidenceLevelSchema,
  ControversyCategorySchema,
  ControversySubjectTypeSchema,
} from './controversy.js';
import {
  MediaSubjectTypeSchema,
  MediaProviderSchema,
  MediaKindSchema,
} from './media.js';
import { CareerMomentKindSchema } from './career-moment.js';
import { LineupRoleSchema } from './lineup.js';

/**
 * Admin CRUD contracts — Create/Update input schemas for the admin console
 * (App A backend + App B `ppi-admin` frontend). One pair per editable entity.
 *
 * Convention:
 *   `<Entity>CreateSchema` — full input to create a row (server assigns id).
 *   `<Entity>UpdateSchema` — `.partial()` of create; every field optional so a
 *                            PATCH can touch a single column.
 *
 * These are the single source of truth: the NestJS admin-crud registry parses
 * request bodies with them, and the React admin renders forms from them.
 */

/** Reference to a related row, as surfaced by the `/admin/lookup/*` endpoints. */
export const LookupItemSchema = z.object({
  id: IdSchema,
  label: z.string(),
});
export type LookupItem = z.infer<typeof LookupItemSchema>;

const optionalUrl = z.string().url().nullish();
const optionalStr = z.string().min(1).nullish();

// ---------------------------------------------------------------------------
// Sport
// ---------------------------------------------------------------------------
export const SportCreateSchema = z.object({
  slug: SlugSchema,
  name: z.string().min(1),
});
export const SportUpdateSchema = SportCreateSchema.partial();
export type SportCreate = z.infer<typeof SportCreateSchema>;
export type SportUpdate = z.infer<typeof SportUpdateSchema>;

// ---------------------------------------------------------------------------
// Country
// ---------------------------------------------------------------------------
export const CountryCreateSchema = z.object({
  iso2: z.string().length(2).toUpperCase(),
  name: z.string().min(1),
  flagUrl: optionalUrl,
});
export const CountryUpdateSchema = CountryCreateSchema.partial();
export type CountryCreate = z.infer<typeof CountryCreateSchema>;
export type CountryUpdate = z.infer<typeof CountryUpdateSchema>;

// ---------------------------------------------------------------------------
// Position
// ---------------------------------------------------------------------------
export const PositionGroupSchema = z.enum(['GK', 'DEF', 'MID', 'FWD']);
export const PositionCreateSchema = z.object({
  sportId: IdSchema,
  code: z.string().min(1),
  name: z.string().min(1),
  group: PositionGroupSchema.nullish(),
});
export const PositionUpdateSchema = PositionCreateSchema.partial();
export type PositionCreate = z.infer<typeof PositionCreateSchema>;
export type PositionUpdate = z.infer<typeof PositionUpdateSchema>;

// ---------------------------------------------------------------------------
// StatMetric
// ---------------------------------------------------------------------------
export const StatMetricCreateSchema = z.object({
  sportId: IdSchema,
  key: z.string().min(1),
  name: z.string().min(1),
  unit: optionalStr,
});
export const StatMetricUpdateSchema = StatMetricCreateSchema.partial();
export type StatMetricCreate = z.infer<typeof StatMetricCreateSchema>;
export type StatMetricUpdate = z.infer<typeof StatMetricUpdateSchema>;

// ---------------------------------------------------------------------------
// TrophyType
// ---------------------------------------------------------------------------
export const TrophyTypeCreateSchema = z.object({
  sportId: IdSchema,
  competitionId: IdSchema.nullish(),
  name: z.string().min(1),
  category: TrophyCategorySchema,
  meritBasis: MeritBasisSchema,
  objectiveMetricId: IdSchema.nullish(),
  prestigeWeight: z.number().default(1),
});
export const TrophyTypeUpdateSchema = TrophyTypeCreateSchema.partial();
export type TrophyTypeCreate = z.infer<typeof TrophyTypeCreateSchema>;
export type TrophyTypeUpdate = z.infer<typeof TrophyTypeUpdateSchema>;

// ---------------------------------------------------------------------------
// IndexWeightProfile
// ---------------------------------------------------------------------------
export const IndexWeightProfileCreateSchema = z.object({
  name: z.string().min(1),
  weights: z.record(z.string(), z.unknown()).default({}),
  active: z.boolean().default(false),
});
export const IndexWeightProfileUpdateSchema =
  IndexWeightProfileCreateSchema.partial();
export type IndexWeightProfileCreate = z.infer<
  typeof IndexWeightProfileCreateSchema
>;
export type IndexWeightProfileUpdate = z.infer<
  typeof IndexWeightProfileUpdateSchema
>;

// ---------------------------------------------------------------------------
// IngestionSource
// ---------------------------------------------------------------------------
export const IngestionSourceCreateSchema = z.object({
  name: z.string().min(1),
  baseUrl: optionalUrl,
  kind: z.string().min(1),
});
export const IngestionSourceUpdateSchema =
  IngestionSourceCreateSchema.partial();
export type IngestionSourceCreate = z.infer<
  typeof IngestionSourceCreateSchema
>;
export type IngestionSourceUpdate = z.infer<
  typeof IngestionSourceUpdateSchema
>;

// ===========================================================================
// Tier 2 — Core entities
// ===========================================================================

// Dates arrive from the admin form as strings; coerce to Date for Prisma.
const optionalDate = z.coerce.date().nullish();
const optionalNum = z.coerce.number().nullish();

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------
export const OrganizationCreateSchema = z.object({
  sportId: IdSchema,
  type: OrganizationTypeSchema,
  name: z.string().min(1),
  countryId: IdSchema.nullish(),
  crestUrl: optionalUrl,
  shortName: optionalStr,
  foundedYear: optionalNum,
  city: optionalStr,
  venue: optionalStr,
  primaryColor: optionalStr,
});
export const OrganizationUpdateSchema = OrganizationCreateSchema.partial();
export type OrganizationCreate = z.infer<typeof OrganizationCreateSchema>;
export type OrganizationUpdate = z.infer<typeof OrganizationUpdateSchema>;

// ---------------------------------------------------------------------------
// Competition
// ---------------------------------------------------------------------------
export const CompetitionCreateSchema = z.object({
  sportId: IdSchema,
  name: z.string().min(1),
  scope: CompetitionScopeSchema,
  orgOwnerId: IdSchema.nullish(),
  countryId: IdSchema.nullish(),
  tier: optionalNum,
  logoUrl: optionalUrl,
  shortName: optionalStr,
  foundedYear: optionalNum,
});
export const CompetitionUpdateSchema = CompetitionCreateSchema.partial();
export type CompetitionCreate = z.infer<typeof CompetitionCreateSchema>;
export type CompetitionUpdate = z.infer<typeof CompetitionUpdateSchema>;

// ---------------------------------------------------------------------------
// Season
// ---------------------------------------------------------------------------
export const SeasonCreateSchema = z.object({
  competitionId: IdSchema,
  label: z.string().min(1),
  startDate: optionalDate,
  endDate: optionalDate,
});
export const SeasonUpdateSchema = SeasonCreateSchema.partial();
export type SeasonCreate = z.infer<typeof SeasonCreateSchema>;
export type SeasonUpdate = z.infer<typeof SeasonUpdateSchema>;

// ---------------------------------------------------------------------------
// Person
// ---------------------------------------------------------------------------
export const PersonCreateSchema = z.object({
  sportId: IdSchema,
  fullName: z.string().min(1),
  knownAs: z.string().min(1),
  gender: GenderSchema,
  birthDate: optionalDate,
  deathDate: optionalDate,
  nationalityCountryId: IdSchema.nullish(),
  primaryPositionId: IdSchema.nullish(),
  heightCm: optionalNum,
  foot: FootSchema.nullish(),
  externalIds: ExternalIdsSchema.default({}),
  imageUrl: optionalUrl,
  imageSource: optionalStr,
  imageLicense: optionalStr,
  imageAttribution: optionalStr,
});
export const PersonUpdateSchema = PersonCreateSchema.partial();
export type PersonCreate = z.infer<typeof PersonCreateSchema>;
export type PersonUpdate = z.infer<typeof PersonUpdateSchema>;

// ===========================================================================
// Tier 3 — Relational / career
// ===========================================================================

// ---------------------------------------------------------------------------
// Stint (person ↔ organization over a time span)
// ---------------------------------------------------------------------------
export const StintRoleSchema = z.enum(['player', 'manager']);
export const StintCreateSchema = z.object({
  personId: IdSchema,
  organizationId: IdSchema,
  role: StintRoleSchema,
  startDate: z.coerce.date(),
  endDate: optionalDate,
  jerseyNumber: optionalNum,
  isLoan: z.boolean().default(false),
  source: optionalStr,
});
export const StintUpdateSchema = StintCreateSchema.partial();
export type StintCreate = z.infer<typeof StintCreateSchema>;
export type StintUpdate = z.infer<typeof StintUpdateSchema>;

// ---------------------------------------------------------------------------
// Transfer (person moving between organizations)
// ---------------------------------------------------------------------------
export const TransferTypeSchema = z.enum([
  'transfer',
  'loan',
  'free',
  'retirement',
]);
export const TransferCreateSchema = z.object({
  personId: IdSchema,
  fromOrgId: IdSchema.nullish(),
  toOrgId: IdSchema.nullish(),
  date: z.coerce.date(),
  feeEur: optionalNum,
  type: TransferTypeSchema,
});
export const TransferUpdateSchema = TransferCreateSchema.partial();
export type TransferCreate = z.infer<typeof TransferCreateSchema>;
export type TransferUpdate = z.infer<typeof TransferUpdateSchema>;

// ---------------------------------------------------------------------------
// TeamSeason (org ↔ competition ↔ season, with final table row)
// ---------------------------------------------------------------------------
export const TeamSeasonCreateSchema = z.object({
  organizationId: IdSchema,
  competitionId: IdSchema,
  seasonId: IdSchema,
  finalPosition: optionalNum,
  played: optionalNum,
  won: optionalNum,
  drawn: optionalNum,
  lost: optionalNum,
  goalsFor: optionalNum,
  goalsAgainst: optionalNum,
  points: optionalNum,
  isChampion: z.boolean().default(false),
});
export const TeamSeasonUpdateSchema = TeamSeasonCreateSchema.partial();
export type TeamSeasonCreate = z.infer<typeof TeamSeasonCreateSchema>;
export type TeamSeasonUpdate = z.infer<typeof TeamSeasonUpdateSchema>;

// ---------------------------------------------------------------------------
// SeasonParticipation (person playing for an org in a competition/season)
// ---------------------------------------------------------------------------
export const SeasonParticipationCreateSchema = z.object({
  personId: IdSchema,
  organizationId: IdSchema,
  competitionId: IdSchema,
  seasonId: IdSchema,
});
export const SeasonParticipationUpdateSchema =
  SeasonParticipationCreateSchema.partial();
export type SeasonParticipationCreate = z.infer<
  typeof SeasonParticipationCreateSchema
>;
export type SeasonParticipationUpdate = z.infer<
  typeof SeasonParticipationUpdateSchema
>;

// ---------------------------------------------------------------------------
// StatValue (a metric value tied to a participation)
// ---------------------------------------------------------------------------
export const StatValueCreateSchema = z.object({
  participationId: IdSchema,
  metricId: IdSchema,
  value: z.coerce.number(),
});
export const StatValueUpdateSchema = StatValueCreateSchema.partial();
export type StatValueCreate = z.infer<typeof StatValueCreateSchema>;
export type StatValueUpdate = z.infer<typeof StatValueUpdateSchema>;

// ===========================================================================
// Tier 4 — Match domain
// ===========================================================================

// ---------------------------------------------------------------------------
// Match
// ---------------------------------------------------------------------------
export const MatchCreateSchema = z.object({
  competitionId: IdSchema,
  seasonId: IdSchema,
  homeOrgId: IdSchema,
  awayOrgId: IdSchema,
  date: z.coerce.date(),
  homeScore: z.coerce.number().int(),
  awayScore: z.coerce.number().int(),
  stage: optionalStr,
});
export const MatchUpdateSchema = MatchCreateSchema.partial();
export type MatchCreate = z.infer<typeof MatchCreateSchema>;
export type MatchUpdate = z.infer<typeof MatchUpdateSchema>;

// ---------------------------------------------------------------------------
// MatchEvent
// ---------------------------------------------------------------------------
export const MatchEventCreateSchema = z.object({
  matchId: IdSchema,
  personId: IdSchema.nullish(),
  minute: z.coerce.number().int(),
  type: z.string().min(1),
});
export const MatchEventUpdateSchema = MatchEventCreateSchema.partial();
export type MatchEventCreate = z.infer<typeof MatchEventCreateSchema>;
export type MatchEventUpdate = z.infer<typeof MatchEventUpdateSchema>;

// ---------------------------------------------------------------------------
// Lineup
// ---------------------------------------------------------------------------
export const LineupCreateSchema = z.object({
  matchId: IdSchema,
  organizationId: IdSchema,
  isHome: z.boolean(),
  formation: optionalStr,
});
export const LineupUpdateSchema = LineupCreateSchema.partial();
export type LineupCreate = z.infer<typeof LineupCreateSchema>;
export type LineupUpdate = z.infer<typeof LineupUpdateSchema>;

// ---------------------------------------------------------------------------
// LineupSpot
// ---------------------------------------------------------------------------
export const LineupSpotCreateSchema = z.object({
  lineupId: IdSchema,
  personId: IdSchema.nullish(),
  positionId: IdSchema.nullish(),
  role: LineupRoleSchema,
  shirtNumber: optionalNum,
  isCaptain: z.boolean().default(false),
  minuteOn: optionalNum,
  minuteOff: optionalNum,
});
export const LineupSpotUpdateSchema = LineupSpotCreateSchema.partial();
export type LineupSpotCreate = z.infer<typeof LineupSpotCreateSchema>;
export type LineupSpotUpdate = z.infer<typeof LineupSpotUpdateSchema>;

// ===========================================================================
// Tier 5 — Achievements / content
// ===========================================================================

// ---------------------------------------------------------------------------
// Award
// ---------------------------------------------------------------------------
export const AwardCreateSchema = z.object({
  personId: IdSchema,
  trophyTypeId: IdSchema,
  date: z.coerce.date(),
  role: z.string().min(1),
  isIndividual: z.boolean(),
  seasonId: IdSchema.nullish(),
  organizationId: IdSchema.nullish(),
  objectiveValue: optionalNum,
  controversyScore: optionalNum,
});
export const AwardUpdateSchema = AwardCreateSchema.partial();
export type AwardCreate = z.infer<typeof AwardCreateSchema>;
export type AwardUpdate = z.infer<typeof AwardUpdateSchema>;

// ---------------------------------------------------------------------------
// Controversy
// ---------------------------------------------------------------------------
export const ControversyCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dateStart: z.coerce.date(),
  dateEnd: optionalDate,
  severity: z.coerce.number().int().min(1).max(5),
  evidenceLevel: EvidenceLevelSchema,
  category: ControversyCategorySchema,
  sourceUrls: z.array(z.string().url()).default([]),
});
export const ControversyUpdateSchema = ControversyCreateSchema.partial();
export type ControversyCreate = z.infer<typeof ControversyCreateSchema>;
export type ControversyUpdate = z.infer<typeof ControversyUpdateSchema>;

// ---------------------------------------------------------------------------
// ControversyLink (polymorphic subject; subjectId resolved by subjectType)
// ---------------------------------------------------------------------------
export const ControversyLinkCreateSchema = z.object({
  controversyId: IdSchema,
  subjectType: ControversySubjectTypeSchema,
  subjectId: IdSchema,
  impact: z.coerce.number().min(-1).max(1),
  note: optionalStr,
});
export const ControversyLinkUpdateSchema =
  ControversyLinkCreateSchema.partial();
export type ControversyLinkCreate = z.infer<
  typeof ControversyLinkCreateSchema
>;
export type ControversyLinkUpdate = z.infer<
  typeof ControversyLinkUpdateSchema
>;

// ---------------------------------------------------------------------------
// CareerMoment
// ---------------------------------------------------------------------------
export const CareerMomentCreateSchema = z.object({
  personId: IdSchema,
  date: z.coerce.date(),
  title: z.string().min(1),
  description: z.string().min(1),
  kind: CareerMomentKindSchema,
  importance: z.coerce.number().int().min(1).max(5),
  mediaItemId: IdSchema.nullish(),
  relatedAwardId: IdSchema.nullish(),
});
export const CareerMomentUpdateSchema = CareerMomentCreateSchema.partial();
export type CareerMomentCreate = z.infer<typeof CareerMomentCreateSchema>;
export type CareerMomentUpdate = z.infer<typeof CareerMomentUpdateSchema>;

// ---------------------------------------------------------------------------
// MediaItem (polymorphic subject)
// ---------------------------------------------------------------------------
export const MediaItemCreateSchema = z.object({
  subjectType: MediaSubjectTypeSchema,
  subjectId: IdSchema,
  provider: MediaProviderSchema,
  externalUrl: z.string().url(),
  embedId: z.string().min(1),
  title: z.string().min(1),
  kind: MediaKindSchema,
  thumbnailUrl: optionalUrl,
  publishedAt: optionalDate,
});
export const MediaItemUpdateSchema = MediaItemCreateSchema.partial();
export type MediaItemCreate = z.infer<typeof MediaItemCreateSchema>;
export type MediaItemUpdate = z.infer<typeof MediaItemUpdateSchema>;

// ---------------------------------------------------------------------------
// PlayerGalleryImage
// ---------------------------------------------------------------------------
export const PlayerGalleryImageCreateSchema = z.object({
  personId: IdSchema,
  imageUrl: z.string().url(),
  title: z.string().min(1),
  altText: z.string().min(1),
  sourceUrl: optionalUrl,
  attribution: optionalStr,
  capturedAt: optionalDate,
  sortOrder: z.coerce.number().int().default(0),
});
export const PlayerGalleryImageUpdateSchema =
  PlayerGalleryImageCreateSchema.partial();
export type PlayerGalleryImageCreate = z.infer<
  typeof PlayerGalleryImageCreateSchema
>;
export type PlayerGalleryImageUpdate = z.infer<
  typeof PlayerGalleryImageUpdateSchema
>;
