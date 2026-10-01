import Head from 'next/head';
import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import { clonePreset, PRESETS } from '@/core/presets';
import { lintConfig } from '@/core/lint';
import { stressScenarios } from '@/core/simulate';
import { downloadableMeteoraParams } from '@/core/meteora';
import { configReceipt } from '@/core/receipt';
import type { AssetClass, LaunchConfig } from '@/core/model';

const ASSET_LABELS: Record<AssetClass, string> = {
  rwa: 'RWA',
  stock: 'Tokenized Stock',
  'ai-agent': 'AI Agent',
  meme: 'Meme',
};

const formatUsd = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: value < 1 ? 5 : 0 }).format(value);

function Metric({ label, value, tone = 'neutral' }: { label: string; value: string; tone?: 'neutral' | 'good' | 'warn' }) {
  const toneClass = tone === 'good' ? 'text-emerald' : tone === 'warn' ? 'text-amber-300' : 'text-white';
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-925 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">{label}</div>
      <div className={`mt-2 text-xl font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}

export default function CurvePilotPage() {
  const [assetClass, setAssetClass] = useState<AssetClass>('rwa');
  const [config, setConfig] = useState<LaunchConfig>(() => clonePreset('rwa'));
  const findings = useMemo(() => lintConfig(config), [config]);
  const scenarios = useMemo(() => stressScenarios(config), [config]);
  const blocking = findings.filter((finding) => finding.severity === 'error').length;
  const receipt = useMemo(() => configReceipt(config), [config]);

  const chooseAsset = (next: AssetClass) => {
    setAssetClass(next);
    setConfig(clonePreset(next));
  };

  const patch = (key: keyof LaunchConfig, value: number) =>
    setConfig((current) => ({ ...current, [key]: value }));

  const exportConfig = () => {
    if (blocking > 0) return;
    const payload = JSON.stringify(downloadableMeteoraParams(config), null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `curvepilot-${config.id}-devnet.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Meteora CurvePilot</title>
        <meta name="description" content="Simulate and audit Meteora DBC launch configurations before signing." />
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-neutral-950 to-cyan-500/10 p-6 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Meteora DBC + DAMM v2</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">Design the curve before the market tests it.</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-300 sm:text-lg">
              CurvePilot turns launch assumptions into deterministic stress tests, readable findings, and an exportable DBC configuration. No wallet or transaction is required to explore.
            </p>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_1.4fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-925 p-5">
                <h2 className="text-lg font-semibold">1. Asset profile</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(Object.keys(PRESETS) as AssetClass[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => chooseAsset(item)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${assetClass === item ? 'border-primary bg-primary/15 text-primary' : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-600'}`}
                    >
                      {ASSET_LABELS[item]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-925 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">2. Launch constraints</h2>
                    <p className="mt-1 text-sm text-neutral-500">{config.name}</p>
                  </div>
                  <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs uppercase tracking-wider text-neutral-400">{config.curve.kind}</span>
                </div>
                <div className="mt-5 space-y-5">
                  {[
                    ['targetRaiseUsd', 'Target raise', 10000, 5000000, 10000],
                    ['graduationThresholdUsd', 'Graduation threshold', 5000, 5000000, 5000],
                    ['tradeFeeBps', 'Trade fee (bps)', 0, 1000, 10],
                    ['maxWalletBps', 'Max wallet (bps)', 50, 2000, 50],
                  ].map(([key, label, min, max, step]) => (
                    <label key={String(key)} className="block">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-neutral-300">{String(label)}</span>
                        <span className="font-mono text-neutral-100">{key.toString().includes('Usd') ? formatUsd(Number(config[key as keyof LaunchConfig])) : String(config[key as keyof LaunchConfig])}</span>
                      </div>
                      <input
                        className="w-full accent-primary"
                        type="range"
                        min={Number(min)}
                        max={Number(max)}
                        step={Number(step)}
                        value={Number(config[key as keyof LaunchConfig])}
                        onChange={(event) => patch(key as keyof LaunchConfig, Number(event.target.value))}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-925 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">3. Stress results</h2>
                    <p className="mt-1 text-sm text-neutral-500">Deterministic inputs; identical config yields identical results.</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${blocking ? 'bg-rose/15 text-rose' : 'bg-emerald/15 text-emerald'}`}>
                    {blocking ? `${blocking} blocking findings` : 'Export-safe'}
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <Metric label="Organic graduation" value={scenarios.organic.graduated ? 'Yes' : 'No'} tone={scenarios.organic.graduated ? 'good' : 'warn'} />
                  <Metric label="Whale concentration" value={`${scenarios.whale.largestWalletBps.toFixed(0)} bps`} tone={scenarios.whale.largestWalletBps > config.maxWalletBps ? 'warn' : 'good'} />
                  <Metric label="Thin-liquidity raise" value={formatUsd(scenarios.thin.raisedUsd)} />
                  <Metric label="Final modeled price" value={formatUsd(scenarios.organic.finalPriceUsd)} />
                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 text-neutral-500">
                      <tr><th className="px-4 py-3">Scenario</th><th className="px-4 py-3">Raised</th><th className="px-4 py-3">Fees</th><th className="px-4 py-3">Graduated</th></tr>
                    </thead>
                    <tbody>
                      {Object.entries(scenarios).map(([name, result]) => (
                        <tr key={name} className="border-t border-neutral-800">
                          <td className="px-4 py-3 capitalize text-white">{name}</td>
                          <td className="px-4 py-3 text-neutral-300">{formatUsd(result.raisedUsd)}</td>
                          <td className="px-4 py-3 text-neutral-300">{formatUsd(result.feesUsd)}</td>
                          <td className="px-4 py-3">{result.graduated ? <span className="text-emerald">Yes</span> : <span className="text-amber-300">No</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-925 p-5">
                <h2 className="text-lg font-semibold">4. Config audit</h2>
                {findings.length === 0 ? (
                  <p className="mt-4 rounded-xl border border-emerald/30 bg-emerald/10 p-4 text-sm text-emerald">No linter findings. The configuration is ready for SDK export.</p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {findings.map((finding) => (
                      <li key={finding.code} className={`rounded-xl border p-4 text-sm ${finding.severity === 'error' ? 'border-rose/30 bg-rose/10 text-rose' : 'border-amber-300/30 bg-amber-300/10 text-amber-200'}`}>
                        <span className="font-mono text-xs">{finding.code}</span>
                        <p className="mt-1">{finding.message}</p>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  disabled={blocking > 0}
                  onClick={exportConfig}
                  className="mt-5 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-950 transition hover:bg-primary-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Download Meteora DBC config
                </button>
                <p className="mt-3 text-center text-xs text-neutral-500">SDK-validated parameters · USDC quote · devnet only</p>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs">
                  <span className="uppercase tracking-wider text-neutral-500">Audit receipt</span>
                  <code className="text-primary">{receipt}</code>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
