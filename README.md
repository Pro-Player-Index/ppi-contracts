# @ppi/contracts

Shared domain contracts for **ProPlayerIndex** — a generic, multi-sport
sports-stats platform.

This package is the **single source of truth** for the domain model. Every
entity is defined once as a [zod](https://zod.dev) schema, and its TypeScript
type is inferred from that schema (`z.infer`). The same package is consumed by
the NestJS backend (runtime validation via the schemas) and the React frontend
(compile-time types), keeping both repos in lockstep.

## What's inside

Schemas + inferred types, one file per domain group under `src/`:

| File | Entities |
| --- | --- |
| `common.ts` | Shared primitives (`Id`, `Slug`, `IsoDate`, `Gender`, `Foot`, …) |
| `sport.ts` | `Sport` |
| `person.ts` | `Person` / `Player` |
| `organization.ts` | `Organization` |
| `competition.ts` | `Competition`, `Season` |
| `stat.ts` | `StatMetric`, `StatValue` |
| `trophy.ts` | `TrophyType` (with `meritBasis`), `MeritBasis`, `TrophyCategory` |
| `award.ts` | `Award` |
| `controversy.ts` | `Controversy`, `ControversyLink` |
| `media.ts` | `MediaItem` |
| `career-moment.ts` | `CareerMoment` |
| `index-result.ts` | `IndexResult`, `IndexBundle`, `IndexProfile` |
| `leaderboard.ts` | `LeaderboardEntry` |
| `compare.ts` | `CompareResult` |
| `profile.ts` | `PlayerProfile` read-model, `TimelineItem` |

Everything is re-exported from `src/index.ts`.

Each entity exports both the schema and the inferred type, e.g.:

```ts
export const PlayerSchema = z.object({ /* … */ });
export type Player = z.infer<typeof PlayerSchema>;
```

## Build

```bash
pnpm install
pnpm build        # tsup -> dist/ (ESM .js + .d.ts + sourcemaps)
pnpm typecheck    # tsc --noEmit
```

The build emits ESM plus type declarations to `dist/`. The package is
`"type": "module"` and `sideEffects: false`, so it tree-shakes cleanly.

## Consuming it (dev, via `pnpm link`)

Until this is published to a registry, link it into a consumer repo:

```bash
# 1. In this package, build and register a global link
cd ppi-contracts
pnpm build
pnpm link --global

# 2. In the backend or frontend repo, link it in
cd ../ppi-backend        # or ../ppi-frontend
pnpm link --global @ppi/contracts
```

Then import:

```ts
import { PlayerSchema, type Player, IndexProfileSchema } from '@ppi/contracts';

// backend: validate at the boundary
const player: Player = PlayerSchema.parse(req.body);

// frontend: just the types
const rows: Player[] = await api.getPlayers();
```

Re-run `pnpm build` here after changing schemas so consumers pick up the new
`dist/`. To unlink later: `pnpm unlink --global @ppi/contracts` in the consumer.

> Tip: in a monorepo you'd instead reference it as a workspace dependency
> (`"@ppi/contracts": "workspace:*"`); `pnpm link` is for these separate repos.
