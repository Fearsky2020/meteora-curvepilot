export type AssetClass = 'rwa' | 'stock' | 'ai-agent' | 'meme';
export type CurveKind = 'flat' | 'linear' | 'exponential' | 'long';

export interface CurveDefinition {
  kind: CurveKind;
  initialPriceUsd: number;
  terminalPriceUsd: number;
  exponent?: number;
}

export interface LaunchConfig {
  id: string;
  name: string;
  assetClass: AssetClass;
  curve: CurveDefinition;
  supplyTokens: number;
  saleAllocationBps: number;
  targetRaiseUsd: number;
  tradeFeeBps: number;
  creatorFeeBps: number;
  migrationFeeBps: number;
  graduationThresholdUsd: number;
  maxWalletBps: number;
  migrationPool: 'damm-v2';
}

export interface TradeInput {
  buyer: string;
  amountUsd: number;
}

export interface SimulatedTrade extends TradeInput {
  tokensOut: number;
  averagePriceUsd: number;
  feeUsd: number;
  progressBefore: number;
  progressAfter: number;
}

export interface SimulationResult {
  raisedUsd: number;
  feesUsd: number;
  tokensSold: number;
  graduated: boolean;
  finalPriceUsd: number;
  largestWalletBps: number;
  trades: SimulatedTrade[];
}

export interface LintFinding {
  severity: 'error' | 'warning';
  code: string;
  message: string;
}
