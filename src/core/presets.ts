import type { AssetClass, LaunchConfig } from './model';

export const PRESETS: Record<AssetClass, LaunchConfig> = {
  rwa: {
    id: 'rwa-stable', name: 'RWA Stable Discovery', assetClass: 'rwa',
    curve: { kind: 'long', initialPriceUsd: 0.98, terminalPriceUsd: 1.12, exponent: 1.35 },
    supplyTokens: 1_000_000, saleAllocationBps: 7000, targetRaiseUsd: 350_000,
    tradeFeeBps: 80, creatorFeeBps: 20, migrationFeeBps: 25,
    graduationThresholdUsd: 280_000, maxWalletBps: 250, migrationPool: 'damm-v2',
  },
  stock: {
    id: 'stock-discovery', name: 'Tokenized Stock Discovery', assetClass: 'stock',
    curve: { kind: 'linear', initialPriceUsd: 24, terminalPriceUsd: 30 },
    supplyTokens: 10_000_000, saleAllocationBps: 7000, targetRaiseUsd: 800_000,
    tradeFeeBps: 60, creatorFeeBps: 15, migrationFeeBps: 25,
    graduationThresholdUsd: 650_000, maxWalletBps: 300, migrationPool: 'damm-v2',
  },
  'ai-agent': {
    id: 'agent-growth', name: 'AI Agent Growth', assetClass: 'ai-agent',
    curve: { kind: 'exponential', initialPriceUsd: 0.02, terminalPriceUsd: 0.16, exponent: 2.1 },
    supplyTokens: 100_000_000, saleAllocationBps: 6500, targetRaiseUsd: 2_500_000,
    tradeFeeBps: 180, creatorFeeBps: 45, migrationFeeBps: 25,
    graduationThresholdUsd: 1_800_000, maxWalletBps: 600, migrationPool: 'damm-v2',
  },
  meme: {
    id: 'meme-fast', name: 'Meme Fast Graduation', assetClass: 'meme',
    curve: { kind: 'exponential', initialPriceUsd: 0.00001, terminalPriceUsd: 0.00035, exponent: 2.6 },
    supplyTokens: 1_000_000_000, saleAllocationBps: 6500, targetRaiseUsd: 120_000,
    tradeFeeBps: 250, creatorFeeBps: 80, migrationFeeBps: 30,
    graduationThresholdUsd: 75_000, maxWalletBps: 1000, migrationPool: 'damm-v2',
  },
};

export function clonePreset(assetClass: AssetClass): LaunchConfig {
  return structuredClone(PRESETS[assetClass]);
}
