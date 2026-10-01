# Meteora CurvePilot demo script

Target length: 3 minutes.

## Recording setup

- Run `npm install`, `npm test`, and `npm run dev`.
- Open `http://localhost:3000/curvepilot`.
- Record the browser at 1440p if available.
- Keep the terminal ready for the final technical proof.
- Do not connect a wallet or broadcast a transaction.

## 0:00–0:20 — Hook

Show the full dashboard.

Narration:

> A bonding curve can be valid code and still be a bad launch. Meteora CurvePilot helps a team test its assumptions before it risks capital. It combines deterministic stress scenarios, blocking safety checks, official Meteora DBC SDK validation, and an auditable configuration receipt.

## 0:20–0:55 — Four launch contexts

Switch through RWA, tokenized-stock, AI-agent, and meme profiles.

Narration:

> CurvePilot starts with four market contexts. Each preset gives the team a defensible baseline for raise size, graduation, fees, and wallet concentration, while keeping every assumption editable.

Pause briefly on the profile descriptions and metrics.

## 0:55–1:30 — Stress the design

Move one or two controls far enough to create a blocking finding. Compare organic, whale, and thin-liquidity results.

Narration:

> A single configuration is evaluated under three deterministic demand regimes. Whale-heavy demand exposes concentration risk. Thin liquidity exposes graduation fragility. When an assumption becomes unsafe or inconsistent, CurvePilot explains the finding and blocks export.

Return the control to a safe value and show the finding disappear.

## 1:30–2:05 — Meteora integration

Show the export panel and download the DBC parameter JSON.

Narration:

> This is not a mock integration. CurvePilot maps the product model into the official `@meteora-ag/dynamic-bonding-curve-sdk` types and executes `buildCurve` during validation. The export targets a USDC-quoted curve with DAMM v2 migration and supported fixed migration fees.

Open the downloaded JSON long enough to show the SDK fields and receipt.

## 2:05–2:30 — Audit receipt

Change one input and download again.

Narration:

> Every export includes a deterministic audit receipt. Change any source assumption and the receipt changes. Reviewers can reproduce exactly which configuration was approved instead of relying on a screenshot or an informal message.

## 2:30–2:50 — Safety boundary

Show the safety copy in the product or repository.

Narration:

> CurvePilot stores no keys, takes no custody, disables wallet auto-connect, and never targets mainnet. Its optional relay requires an explicit devnet configuration and simulates before broadcast.

## 2:50–3:00 — Technical proof and close

Switch to the terminal and run `npm test`.

Narration:

> Eight deterministic tests cover all presets, stress behavior, SDK construction, blocked exports, and receipt stability. CurvePilot is the pre-flight layer for safer, more explainable Meteora launches.

End on the dashboard and repository URL.

## Separate 60-second technical demo

Use this shorter recording if a track asks for a distinct technical walkthrough.

1. Open `src/core/meteora.ts` and show the official SDK imports.
2. Show the translation into `buildCurve` parameters and `MET_DAMM_V2`.
3. Open `src/core/receipt.ts` and explain the deterministic receipt.
4. Run `npm test` and show eight passing tests.
5. Run `npm run build` or show a fresh successful build.
6. Close on the devnet-only relay guards.

Suggested narration:

> The UI model is translated into the official Meteora DBC SDK types, then `buildCurve` is executed as a real validation step. Product-level constraints can still block an SDK-valid but unsafe export. A deterministic receipt hashes every source assumption, and tests reproduce presets, stress behavior, SDK construction, blocked exports, and receipt stability. The relay rejects non-devnet configuration and simulates any devnet transaction before broadcast.
