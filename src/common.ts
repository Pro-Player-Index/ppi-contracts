import { z } from 'zod';

/**
 * Shared primitive schemas reused across the ProPlayerIndex domain.
 */

/** Opaque entity identifier. Kept as a branded-ish string for portability across stores. */
export const IdSchema = z.string().min(1);
export type Id = z.infer<typeof IdSchema>;

/** URL-friendly slug, e.g. "football", "ballon-dor". */
export const SlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be a lowercase, hyphen-separated slug');
export type Slug = z.infer<typeof SlugSchema>;

/** Calendar date as an ISO-8601 date string (YYYY-MM-DD). */
export const IsoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO-8601 date (YYYY-MM-DD)');
export type IsoDate = z.infer<typeof IsoDateSchema>;

/** Timestamp as an ISO-8601 date-time string. */
export const IsoDateTimeSchema = z.string().datetime({ offset: true });
export type IsoDateTime = z.infer<typeof IsoDateTimeSchema>;

/** ISO-3166 alpha-2 or common country code / name. Kept loose on purpose. */
export const CountrySchema = z.string().min(2);
export type Country = z.infer<typeof CountrySchema>;

/** Absolute URL. */
export const UrlSchema = z.string().url();
export type Url = z.infer<typeof UrlSchema>;

/** Free-form external identifier map, e.g. { transfermarkt: "28003", wikidata: "Q615" }. */
export const ExternalIdsSchema = z.record(z.string(), z.string());
export type ExternalIds = z.infer<typeof ExternalIdsSchema>;

export const GenderSchema = z.enum(['male', 'female', 'other']);
export type Gender = z.infer<typeof GenderSchema>;

export const FootSchema = z.enum(['left', 'right', 'both']);
export type Foot = z.infer<typeof FootSchema>;
