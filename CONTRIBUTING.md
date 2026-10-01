# Contributing

- Keep launch decisions deterministic and testable.
- Never commit secrets, private keys, or mainnet signing material.
- Add a regression test for every linter rule or simulator change.
- Prefer explicit units in names (`lamports`, `bps`, `tokens`) over ambiguous numbers.
- Do not deploy or send a transaction from CI.
