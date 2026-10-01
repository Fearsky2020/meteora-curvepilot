# Meteora CurvePilot pitch deck

## 1. Design the curve before the market tests it

Meteora CurvePilot is an AI-native pre-flight workbench for Dynamic Bonding Curve launches.

**One line:** turn launch assumptions into stress scenarios, blocking safety checks, SDK-ready parameters, and an auditable configuration receipt.

Visual: `docs/curvepilot-dashboard.png`

## 2. The problem

A DBC launch is a system, not a form.

Raise targets, supply distribution, fees, wallet concentration, graduation, and migration all interact. A configuration can be accepted by software and still produce a fragile market under whale-heavy demand or thin liquidity.

Teams need to answer three questions before they risk capital:

- What does this configuration do under realistic stress?
- Which assumptions are unsafe or internally inconsistent?
- Can another reviewer reproduce exactly what was approved?

## 3. The product

CurvePilot gives builders one repeatable pre-flight loop:

1. Start from an RWA, tokenized-stock, AI-agent, or meme profile.
2. Tune raise, graduation, fee, and wallet constraints.
3. Compare organic, whale, and thin-liquidity scenarios.
4. Resolve blocking lint findings.
5. Export official Meteora DBC SDK parameters.
6. Share a deterministic audit receipt with reviewers.

## 4. Meteora-native integration

CurvePilot uses `@meteora-ag/dynamic-bonding-curve-sdk` directly.

- Executes `buildCurve` during validation.
- Produces `MET_DAMM_V2` migration parameters.
- Uses a USDC quote model and supported fixed migration fees.
- Exports immutable SPL token settings and quote-token fee collection.
- Blocks export when the product-level safety checks fail.

This is reusable developer infrastructure around Meteora DBC, not a mocked integration.

## 5. A safer launch workflow

Every profile is tested against three deterministic demand regimes.

- **Organic:** balanced participation and steady discovery.
- **Whale:** concentrated demand reveals wallet and slippage risk.
- **Thin liquidity:** low participation reveals graduation fragility.

The same inputs always produce the same results and the same audit receipt, so reviewers can reproduce decisions instead of trusting screenshots.

## 6. Built for multiple real markets

- **RWAs:** conservative concentration and graduation assumptions.
- **Tokenized stocks:** structured liquidity planning around familiar assets.
- **AI-agent assets:** repeatable launch checks for autonomous products.
- **Memes:** fast iteration without abandoning risk controls.

One engine, four launch contexts, and a common Meteora integration path.

## 7. Technical proof

- Typed launch schema and deterministic simulator.
- Official SDK adapter and validation.
- Devnet-only transaction guard with simulation-before-broadcast.
- Wallet auto-connect disabled.
- Eight passing tests covering presets, stress behavior, SDK construction, blocked exports, and receipt stability.
- Successful production Next.js build.
- Public ISC-licensed repository with documented upstream attribution.

Repository: https://github.com/Fearsky2020/meteora-curvepilot

## 8. Why it can matter

CurvePilot can become the review layer between an idea and a live DBC launch.

Next steps after the hackathon:

- Compare configurations across teams and assets.
- Add historical market calibration and richer scenario libraries.
- Publish signed approval receipts for multi-party launch governance.
- Feed approved parameters into controlled deployment pipelines.

**Closing:** safer launches, clearer assumptions, and more repeatable Meteora adoption.
