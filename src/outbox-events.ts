import { z } from 'zod';
import { IdSchema } from './common.js';

/**
 * Cross-service outbox event contract (audit P0-01).
 *
 * `ppi-admin-api` (Python) writes these rows into the shared `OutboxEvent`
 * table; `ppi-api` (NestJS) rehydrates and handles them to reproject the Mongo
 * read models and invalidate caches. The `eventType` strings and payload shapes
 * here are the single source of truth for BOTH services — the Python side
 * mirrors them (see `ppi-admin-api/app/events.py`). Bump `v` on any breaking
 * payload change and register a new factory rather than mutating an old one.
 */

/** Stable event-type names persisted in `OutboxEvent.eventType`. */
export const AdminOutboxEventType = {
  EntityChanged: 'AdminEntityChanged',
  PersonMerged: 'PersonMerged',
} as const;
export type AdminOutboxEventType =
  (typeof AdminOutboxEventType)[keyof typeof AdminOutboxEventType];

export const AdminWriteOpSchema = z.enum(['create', 'update', 'delete']);
export type AdminWriteOp = z.infer<typeof AdminWriteOpSchema>;

/**
 * Emitted for every generic admin CRUD write. `affectedPersonIds` is resolved
 * by the admin (the aggregate itself for `Person`, or the owning `personId`
 * for person-child rows) so the consumer can reproject exactly those players
 * without a full rebuild. Empty for reference tables with no player projection.
 */
export const AdminEntityChangedPayloadSchema = z.object({
  v: z.literal(1),
  aggregateType: z.string().min(1),
  aggregateId: IdSchema,
  op: AdminWriteOpSchema,
  affectedPersonIds: z.array(IdSchema).default([]),
});
export type AdminEntityChangedPayload = z.infer<
  typeof AdminEntityChangedPayloadSchema
>;

/** Emitted when two persons are merged; consumer reprojects `toId`, drops `fromId`. */
export const PersonMergedPayloadSchema = z.object({
  v: z.literal(1),
  fromId: IdSchema,
  toId: IdSchema,
  reassigned: z.record(z.string(), z.number()),
});
export type PersonMergedPayload = z.infer<typeof PersonMergedPayloadSchema>;
