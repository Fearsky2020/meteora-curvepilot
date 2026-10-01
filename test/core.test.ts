import test from 'node:test';
import assert from 'node:assert/strict';
import { clonePreset, PRESETS } from '../src/core/presets.ts';
import { isSafeToExport, lintConfig } from '../src/core/lint.ts';
import { buildMeteoraCurve, downloadableMeteoraParams, toMeteoraBuildParams } from '../src/core/meteora.ts';
import { configReceipt } from '../src/core/receipt.ts';
import { priceAt, simulate, stressScenarios } from '../src/core/simulate.ts';

test('all shipped presets pass export-blocking lint rules', () => {
  for (const preset of Object.values(PRESETS)) assert.equal(isSafeToExport(preset), true);
});

test('linter blocks unsafe prices, allocation, fees, and graduation', () => {
  const config = clonePreset('meme');
  config.curve.initialPriceUsd = -1;
  config.saleAllocationBps = 9500;
  config.tradeFeeBps = 950;
  config.graduationThresholdUsd = config.targetRaiseUsd * 2;
  const codes = lintConfig(config).map((finding) => finding.code);
  assert.deepEqual(codes, ['ALLOCATION_RANGE', 'GRADUATION_RANGE', 'PRICE_INVALID', 'FEES_EXCESSIVE', 'CREATOR_FEE_SHARE']);
});

test('linear curve interpolates deterministically', () => {
  const config = clonePreset('stock');
  assert.equal(priceAt(config, 0), 24);
  assert.equal(priceAt(config, 0.5), 27);
  assert.equal(priceAt(config, 1), 30);
});

test('simulation accounts for fees and graduation', () => {
  const config = clonePreset('rwa');
  const result = simulate(config, [
    { buyer: 'a', amountUsd: 150_000 },
    { buyer: 'b', amountUsd: 150_000 },
  ]);
  assert.equal(result.raisedUsd, 300_000);
  assert.equal(result.graduated, true);
  assert.ok(result.feesUsd > 0);
  assert.ok(result.tokensSold > 0);
});

test('stress suite exposes whale concentration', () => {
  const config = clonePreset('ai-agent');
  const scenarios = stressScenarios(config);
  assert.ok(scenarios.whale.largestWalletBps > scenarios.organic.largestWalletBps);
  assert.equal(scenarios.thin.graduated, false);
});

test('Meteora adapter emits DAMM v2 buildCurve parameters', () => {
  const config = clonePreset('rwa');
  const params = toMeteoraBuildParams(config);
  assert.equal(params.percentageSupplyOnMigration, 30);
  assert.equal(params.migrationQuoteThreshold, 280_000);
  assert.equal(params.fee.creatorTradingFeePercentage, 25);
  for (const preset of Object.values(PRESETS)) assert.doesNotThrow(() => buildMeteoraCurve(preset));
});

test('audit receipt is deterministic and included in downloads', () => {
  const config = clonePreset('ai-agent');
  const first = configReceipt(config);
  assert.match(first, /^cp-[0-9a-f]{8}$/);
  assert.equal(configReceipt(structuredClone(config)), first);
  assert.equal(downloadableMeteoraParams(config).auditReceipt, first);
  config.targetRaiseUsd += 1;
  assert.notEqual(configReceipt(config), first);
});

test('Meteora adapter refuses a config blocked by the linter', () => {
  const config = clonePreset('stock');
  config.migrationFeeBps = 20;
  assert.throws(() => toMeteoraBuildParams(config), /MIGRATION_FEE_OPTION/);
});
