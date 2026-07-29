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
});
export type Organization = z.infer<typeof OrganizationSchema>;
