# Colosseum and Superteam Netherlands submission draft

## Project name

Meteora CurvePilot

## Tagline

Design the curve before the market tests it.

## Short description

Meteora CurvePilot is an AI-native pre-flight workbench for Dynamic Bonding Curve launches. It helps teams compare deterministic stress scenarios, resolve blocking configuration risks, export official Meteora DBC SDK parameters, and share an auditable configuration receipt before risking capital.

## Problem

Bonding-curve launches couple supply distribution, fees, concentration, graduation, and migration. A configuration can be syntactically valid while remaining economically fragile under whale-heavy demand or thin liquidity. Existing launch flows make configuration easy, but do not make assumptions easy to review and reproduce.

## Solution

CurvePilot provides four editable launch profiles, three deterministic stress regimes, blocking safety checks, official Meteora SDK validation, a USDC-quoted DAMM v2 export, and a stable audit receipt. It is designed as reusable launch infrastructure rather than a single-purpose launchpad.

## Technical implementation

- Next.js and TypeScript interface.
- Typed launch schema and deterministic simulator.
- `@meteora-ag/dynamic-bonding-curve-sdk` adapter.
- Real `buildCurve` execution during validation.
- `MET_DAMM_V2` migration configuration.
- Immutable SPL token export and quote-token fee collection.
- Deterministic configuration receipt.
- Devnet-only transaction guard and simulation-before-broadcast.
- Eight passing tests and a successful production build.

## Why Solana

Solana makes fast, low-cost market creation possible, and Meteora DBC provides a powerful launch primitive. CurvePilot focuses on the missing review layer: helping teams understand and document the launch they are about to create.

## Current status

The product is functional locally and publicly documented. Four presets, stress scenarios, linting, SDK export, audit receipts, tests, and production build are complete. No mainnet deployment or production transaction is required for the demo.

## Links

- Repository: https://github.com/Fearsky2020/meteora-curvepilot
- Meteora track: https://superteam.fun/earn/listing/meteora-dbc
- Product screenshot: https://github.com/Fearsky2020/meteora-curvepilot/blob/main/docs/curvepilot-dashboard.png
- Pitch deck storyboard: https://github.com/Fearsky2020/meteora-curvepilot/blob/main/PITCH.md
- Demo script: https://github.com/Fearsky2020/meteora-curvepilot/blob/main/DEMO.md

## Main pitch outline

See `PITCH.md`. Recommended recording length: 3 minutes.

## Separate technical demo outline

See the final section of `DEMO.md`. Recommended recording length: 60 seconds.

## Eligibility checklist

Complete these platform-controlled steps before submission:

- Register for the main Crypto World's Fair hackathon on Colosseum.
- Set the Colosseum profile country to Netherlands.
- Submit CurvePilot to the main hackathon.
- Add every team member to the Colosseum project.
- Make the repository, pitch video, technical demo, and deck accessible.
- Submit the same project to the Superteam Netherlands track.

These steps may require account ownership, legal acceptance, identity/profile confirmation, or final publish actions and must be completed by the account holder.
