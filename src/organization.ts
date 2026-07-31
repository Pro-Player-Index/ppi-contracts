import { z } from 'zod';
import { IdSchema, CountrySchema } from './common.js';

export const OrganizationTypeSchema = z.enum(['club', 'national_team']);
export type OrganizationType = z.infer<typeof OrganizationTypeSchema>;

export const OrganizationSchema = z.object({
  id: IdSchema,
  sportId: IdSchema,
  type: OrganizationTypeSchema,
  name: z.string().min(1),
  country: CountrySchema,
  // E21 enrichment (all optional).
  crestUrl: z.string().url().nullable().optional(),
  shortName: z.string().nullable().optional(),
  foundedYear: z.number().int().nullable().optional(),
  city: z.string().nullable().optional(),
  venue: z.string().nullable().optional(),
  primaryColor: z.string().nullable().optional(),
});
export type Organization = z.infer<typeof OrganizationSchema>;
