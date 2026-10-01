import {
  ActivationType,
  BaseFeeMode,
  buildCurve,
  type BuildCurveParams,
  CollectFeeMode,
  MigrationFeeOption,
  MigrationOption,
  TokenAuthorityOption,
  TokenDecimal,
  TokenType,
} from '@meteora-ag/dynamic-bonding-curve-sdk';
import type { LaunchConfig } from './model';
import { isSafeToExport, lintConfig } from './lint.ts';
import { configReceipt } from './receipt.ts';

const MIGRATION_OPTIONS: Record<number, MigrationFeeOption> = {
  25: MigrationFeeOption.FixedBps25,
  30: MigrationFeeOption.FixedBps30,
  100: MigrationFeeOption.FixedBps100,
  200: MigrationFeeOption.FixedBps200,
  400: MigrationFeeOption.FixedBps400,
  600: MigrationFeeOption.FixedBps600,
};

export function creatorTradingFeePercentage(config: LaunchConfig): number {
  if (config.tradeFeeBps === 0) return 0;
  return Math.round((config.creatorFeeBps / config.tradeFeeBps) * 100);
}

export function toMeteoraBuildParams(config: LaunchConfig): BuildCurveParams {
  if (!isSafeToExport(config)) {
    const errors = lintConfig(config)
      .filter((finding) => finding.severity === 'error')
      .map((finding) => finding.code)
      .join(', ');
    throw new Error(`CurvePilot blocked export: ${errors}`);
  }

  return {
    token: {
      tokenType: TokenType.SPLToken,
      tokenBaseDecimal: TokenDecimal.SIX,
      tokenQuoteDecimal: TokenDecimal.SIX,
      tokenAuthorityOption: TokenAuthorityOption.Immutable,
      totalTokenSupply: config.supplyTokens,
      leftover: 0,
    },
    fee: {
      baseFeeParams: {
        baseFeeMode: BaseFeeMode.FeeSchedulerLinear,
        feeSchedulerParam: {
          startingFeeBps: config.tradeFeeBps,
          endingFeeBps: config.tradeFeeBps,
          numberOfPeriod: 0,
          totalDuration: 0,
        },
      },
      dynamicFeeEnabled: config.assetClass === 'ai-agent' || config.assetClass === 'meme',
      collectFeeMode: CollectFeeMode.QuoteToken,
      creatorTradingFeePercentage: creatorTradingFeePercentage(config),
      poolCreationFee: 0,
      enableFirstSwapWithMinFee: false,
    },
    migration: {
      migrationOption: MigrationOption.MET_DAMM_V2,
      migrationFeeOption: MIGRATION_OPTIONS[config.migrationFeeBps],
      migrationFee: {
        feePercentage: 0,
        creatorFeePercentage: 0,
      },
    },
    liquidityDistribution: {
      partnerLiquidityPercentage: 0,
      partnerPermanentLockedLiquidityPercentage: 100,
      creatorLiquidityPercentage: 0,
      creatorPermanentLockedLiquidityPercentage: 0,
    },
    lockedVesting: {
      totalLockedVestingAmount: 0,
      numberOfVestingPeriod: 0,
      cliffUnlockAmount: 0,
      totalVestingDuration: 0,
      cliffDurationFromMigrationTime: 0,
    },
    activationType: ActivationType.Timestamp,
    percentageSupplyOnMigration: (10_000 - config.saleAllocationBps) / 100,
    migrationQuoteThreshold: config.graduationThresholdUsd,
  };
}

export function buildMeteoraCurve(config: LaunchConfig) {
  return buildCurve(toMeteoraBuildParams(config));
}

export function downloadableMeteoraParams(config: LaunchConfig) {
  return {
    schema: 'meteora-dbc-build-curve/v1',
    cluster: 'devnet',
    quoteAsset: 'USDC',
    generatedBy: 'CurvePilot',
    auditReceipt: configReceipt(config),
    sourceConfig: config,
    buildCurveParams: toMeteoraBuildParams(config),
  };
}
