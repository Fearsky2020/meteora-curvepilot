import type { LaunchConfig, LintFinding } from './model';

export function lintConfig(config: LaunchConfig): LintFinding[] {
  const findings: LintFinding[] = [];
  const error = (code: string, message: string) => findings.push({ severity: 'error', code, message });
  const warn = (code: string, message: string) => findings.push({ severity: 'warning', code, message });
  const totalFees = config.tradeFeeBps + config.creatorFeeBps + config.migrationFeeBps;

  if (config.supplyTokens <= 0) error('SUPPLY_INVALID', 'Supply must be greater than zero.');
  if (config.saleAllocationBps < 500 || config.saleAllocationBps > 9000) {
    error('ALLOCATION_RANGE', 'Sale allocation must be between 5% and 90%.');
  }
  if (config.targetRaiseUsd <= 0) error('RAISE_INVALID', 'Target raise must be greater than zero.');
  if (config.graduationThresholdUsd <= 0 || config.graduationThresholdUsd > config.targetRaiseUsd) {
    error('GRADUATION_RANGE', 'Graduation threshold must be positive and no higher than the target raise.');
  } else if (config.graduationThresholdUsd < config.targetRaiseUsd * 0.4) {
    warn('GRADUATION_EARLY', 'Graduation happens before 40% of the target raise.');
  }
  if (config.curve.initialPriceUsd <= 0 || config.curve.terminalPriceUsd <= 0) {
    error('PRICE_INVALID', 'Curve prices must be greater than zero.');
  }
  if (config.curve.terminalPriceUsd < config.curve.initialPriceUsd) {
    error('PRICE_DESCENDING', 'Terminal price cannot be below the initial price.');
  }
  if (totalFees > 1000) error('FEES_EXCESSIVE', 'Combined fees cannot exceed 10%.');
  else if (totalFees > 500) warn('FEES_HIGH', 'Combined fees exceed 5%.');
  if (config.maxWalletBps <= 0 || config.maxWalletBps > 2000) {
    error('WALLET_LIMIT_RANGE', 'Maximum wallet must be between 0% and 20%.');
  }
  if ((config.assetClass === 'rwa' || config.assetClass === 'stock') && config.maxWalletBps > 500) {
    warn('CONCENTRATION_RWA', 'RWA and stock presets should usually cap wallets at 5%.');
  }
  if (config.migrationPool !== 'damm-v2') error('MIGRATION_POOL', 'CurvePilot MVP supports DAMM v2 migration only.');
  return findings;
}

export function isSafeToExport(config: LaunchConfig): boolean {
  return !lintConfig(config).some((finding) => finding.severity === 'error');
}
