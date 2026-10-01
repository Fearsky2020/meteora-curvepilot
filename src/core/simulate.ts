import type { LaunchConfig, SimulationResult, TradeInput } from './model';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function priceAt(config: LaunchConfig, progress: number): number {
  const p = clamp(progress, 0, 1);
  const { initialPriceUsd: start, terminalPriceUsd: end, kind } = config.curve;
  if (kind === 'flat') return start;
  if (kind === 'linear') return start + (end - start) * p;
  const exponent = config.curve.exponent ?? (kind === 'long' ? 1.35 : 2);
  return start + (end - start) * p ** exponent;
}

export function simulate(config: LaunchConfig, inputs: TradeInput[]): SimulationResult {
  const saleSupply = config.supplyTokens * config.saleAllocationBps / 10_000;
  const feeBps = config.tradeFeeBps + config.creatorFeeBps + config.migrationFeeBps;
  let raisedUsd = 0;
  let feesUsd = 0;
  let tokensSold = 0;
  const wallets = new Map<string, number>();
  const trades = [];

  for (const input of inputs) {
    if (input.amountUsd <= 0 || tokensSold >= saleSupply) continue;
    const progressBefore = tokensSold / saleSupply;
    const feeUsd = input.amountUsd * feeBps / 10_000;
    const netUsd = input.amountUsd - feeUsd;
    const estimatedProgress = clamp(progressBefore + netUsd / config.targetRaiseUsd, 0, 1);
    const averagePriceUsd = (priceAt(config, progressBefore) + priceAt(config, estimatedProgress)) / 2;
    const tokensOut = Math.min(netUsd / averagePriceUsd, saleSupply - tokensSold);
    tokensSold += tokensOut;
    raisedUsd += input.amountUsd;
    feesUsd += feeUsd;
    wallets.set(input.buyer, (wallets.get(input.buyer) ?? 0) + tokensOut);
    trades.push({
      ...input, tokensOut, averagePriceUsd, feeUsd, progressBefore,
      progressAfter: tokensSold / saleSupply,
    });
  }

  const largestWallet = Math.max(0, ...wallets.values());
  return {
    raisedUsd, feesUsd, tokensSold,
    graduated: raisedUsd >= config.graduationThresholdUsd,
    finalPriceUsd: priceAt(config, tokensSold / saleSupply),
    largestWalletBps: saleSupply ? largestWallet / saleSupply * 10_000 : 0,
    trades,
  };
}

export function stressScenarios(config: LaunchConfig): Record<string, SimulationResult> {
  const organic = Array.from({ length: 40 }, (_, i) => ({ buyer: 'organic-' + i, amountUsd: config.targetRaiseUsd / 40 }));
  const whale = [
    { buyer: 'whale', amountUsd: config.targetRaiseUsd * 0.45 },
    ...Array.from({ length: 20 }, (_, i) => ({ buyer: 'retail-' + i, amountUsd: config.targetRaiseUsd * 0.55 / 20 })),
  ];
  const thin = Array.from({ length: 12 }, (_, i) => ({ buyer: 'thin-' + i, amountUsd: config.targetRaiseUsd * 0.28 / 12 }));
  return { organic: simulate(config, organic), whale: simulate(config, whale), thin: simulate(config, thin) };
}
