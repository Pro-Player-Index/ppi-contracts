import { z } from 'zod';
import { IdSchema, SlugSchema } from './common.js';

export const SportSchema = z.object({
  id: IdSchema,
  slug: SlugSchema,
  name: z.string().min(1),
});
export type Sport = z.infer<typeof SportSchema>;
