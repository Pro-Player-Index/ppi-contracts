import { z } from 'zod';
import { IdSchema } from './common.js';

export const StatMetricSchema = z.object({
  id: IdSchema,
  sportId: IdSchema,
  /** Stable machine key, e.g. "goals", "assists", "minutes". */
  key: z.string().min(1),
  name: z.string().min(1),
  /** Unit of measure, e.g. "count", "minutes", "percent". */
  unit: z.string().min(1),
});
export type StatMetric = z.infer<typeof StatMetricSchema>;

export const StatValueSchema = z.object({
  metricId: IdSchema,
  value: z.number(),
});
export type StatValue = z.infer<typeof StatValueSchema>;
