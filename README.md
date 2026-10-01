# Meteora CurvePilot

AI-native launch design lab for Meteora Dynamic Bonding Curve (DBC) and DAMM v2.

CurvePilot helps builders choose, simulate, audit, and export launch configurations before they risk capital. It focuses on four asset classes highlighted by the Crypto World's Fair x Meteora track: RWAs, tokenized stocks, AI-agent assets, and memes.

## Workflow

1. Select an asset profile and constraints.
2. Compare presets and custom curves.
3. Run deterministic whale and thin-liquidity stress scenarios.
4. Inspect price impact, fee capture, concentration, and graduation behavior.
5. Export a Meteora-compatible config and reproducible audit receipt.
6. Optionally create the config on Solana devnet through the official SDK.

## Judging alignment

- **Meteora integration:** DBC config generation plus DAMM v2 migration preview.
- **Technical execution:** typed schema, deterministic simulation, fixtures, and tests.
- **Originality:** safety-first launch tooling rather than another single-purpose meme launchpad.
- **Impact:** reusable developer tooling across several asset classes.

## Safety

No custody, private-key storage, automatic mainnet deployment, or CI transactions. Development and demos use local simulation and Solana devnet.

## Upstream

The UI starts from Meteora Invent's ISC-licensed `fun-launch` scaffold.

- https://docs.meteora.ag/developer-guides/dbc
- https://docs.meteora.ag/developer-guides/damm-v2
- https://github.com/MeteoraAg/meteora-invent
- https://github.com/MeteoraAg/dynamic-bonding-curve-sdk

## Status

Initial architecture and scaffold. Core simulation, preset validation, SDK adapter, and tests are next.
