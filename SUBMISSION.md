# Superteam submission draft

## Project

**Meteora CurvePilot — design the curve before the market tests it.**

CurvePilot is a safety-first design and stress-testing workbench for Meteora Dynamic Bonding Curve launches. It turns launch assumptions into deterministic scenarios, blocking lint findings, official SDK parameters, and a reproducible audit receipt before a builder signs anything.

Repository: https://github.com/Fearsky2020/meteora-curvepilot

Track: https://superteam.fun/earn/listing/meteora-dbc

## Problem

DBC parameters couple supply distribution, fee capture, concentration, graduation, and migration. A configuration can be syntactically valid yet behave badly under whale-heavy or thin-liquidity demand. Builders need a fast way to compare these outcomes without risking capital.

## Solution

CurvePilot provides:

- RWA, tokenized-stock, AI-agent, and meme launch profiles.
- Editable raise, graduation, trading-fee, and wallet-concentration controls.
- Deterministic organic, whale, and thin-liquidity stress scenarios.
- Blocking configuration checks with plain-language explanations.
- Official Meteora DBC SDK validation for every shipped preset.
- Downloadable `buildCurve` parameters for a USDC-quoted DAMM v2 migration.
- A stable audit receipt that changes whenever any source assumption changes.

## Meteora integration

`src/core/meteora.ts` translates the product model into the official `@meteora-ag/dynamic-bonding-curve-sdk` types and executes `buildCurve` during validation. Exports use immutable SPL tokens, USDC quote decimals, quote-token fee collection, supported fixed migration-fee options, and `MET_DAMM_V2`.

The transaction relay is disabled unless both an explicit devnet cluster and an HTTPS devnet RPC hostname are configured. Wallet auto-connect is off, and any devnet transaction is simulated before broadcast.

## Evidence

- `npm test`: 8 passing tests.
- `npm run build`: successful production Next.js build.
- Deterministic test coverage includes all presets, stress behavior, SDK construction, blocked exports, and audit receipt stability.

## Why it matters

CurvePilot is not another launchpad UI. It is reusable launch infrastructure: a pre-flight system that lets teams reason about curve behavior, publish auditable assumptions, and hand SDK-ready parameters to an implementation team. The same workflow applies across high-compliance RWAs, tokenized stocks, autonomous-agent assets, and fast-moving meme launches.

## Demo flow

1. Open `/curvepilot`.
2. Switch among the four asset profiles.
3. Move the raise, graduation, fee, and wallet sliders.
4. Compare scenario results and resolve any blocking finding.
5. Download the Meteora DBC JSON and verify the audit receipt.
6. Run `npm test` to reproduce the SDK and receipt checks.

## Safety and scope

The project does not custody funds, store keys, auto-connect wallets, deploy to mainnet, or send production transactions. It is a design and devnet-validation tool, not financial advice or a performance guarantee.
