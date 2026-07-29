import { z } from 'zod';
import {
  IdSchema,
  IsoDateSchema,
  CountrySchema,
  GenderSchema,
  FootSchema,
  ExternalIdsSchema,
} from './common.js';

/**
 * A Person is any human tracked by the index; a Player is the same shape,
 * exported under both names for domain readability.
 */
export const PersonSchema = z.object({
  id: IdSchema,
  sportId: IdSchema,
  fullName: z.string().min(1),
  knownAs: z.string().min(1),
  birthDate: IsoDateSchema,
  deathDate: IsoDateSchema.optional(),
  nationality: CountrySchema,
  heightCm: z.number().positive().optional(),
  foot: FootSchema.optional(),
  gender: GenderSchema,
  externalIds: ExternalIdsSchema.default({}),
});
export type Person = z.infer<typeof PersonSchema>;

export const PlayerSchema = PersonSchema;
export type Player = z.infer<typeof PlayerSchema>;
