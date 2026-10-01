# CurvePilot MVP specification

## Product promise

A builder can go from an asset idea to a reviewed Meteora DBC launch configuration without sending a transaction or risking funds.

## User flow

1. Choose RWA, tokenized stock, AI agent, or meme.
2. Enter target raise, initial price, graduation target, volatility tolerance, and fee preference.
3. Review ranked presets with plain-language trade-offs.
4. Stress-test the selected configuration against deterministic buyer sequences.
5. Resolve linter findings.
6. Export configuration and a simulation receipt.
7. Optionally create the config on Solana devnet.

## Guardrails

- No mainnet transaction path in the MVP.
- No private-key persistence.
- Wallet signing stays explicit and local.
- Every recommendation includes assumptions and a reproducible input hash.
- Simulation output is a model, not a promise of financial performance.

## Milestones

- M1: typed domain model, presets, simulator, linter, tests.
- M2: preset comparison UI and charts.
- M3: real DBC SDK adapter and devnet config creation.
- M4: DAMM v2 migration preview and receipt sharing.
- M5: demo polish, walkthrough, and Superteam submission.
