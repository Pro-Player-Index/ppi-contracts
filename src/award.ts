import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common.js';

export const AwardRoleSchema = z.enum(['player', 'manager']);
export type AwardRole = z.infer<typeof AwardRoleSchema>;

export const AwardSchema = z.object({
  id: IdSchema,
  personId: IdSchema,
  trophyTypeId: IdSchema,
  seasonId: IdSchema.optional(),
  organizationId: IdSchema.optional(),
  date: IsoDateSchema,
  role: AwardRoleSchema,
  isIndividual: z.boolean(),
  /** The hard value that earned an objective_stat trophy, when applicable. */
  objectiveValue: z.number().optional(),
  /** 0..1 measure of how disputed the award is (higher = more controversial). */
  controversyScore: z.number().min(0).max(1).optional(),
});
export type Award = z.infer<typeof AwardSchema>;
