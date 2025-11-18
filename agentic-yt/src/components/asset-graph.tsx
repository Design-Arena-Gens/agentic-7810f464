interface AssetTrack {
  id: string;
  label: string;
  available: number;
  needed: number;
}

interface AssetGraphProps {
  assets: AssetTrack[];
}

export const AssetGraph = ({ assets }: AssetGraphProps) => (
  <section className="rounded-3xl border border-zinc-200 bg-white px-6 pb-6 pt-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
    <header className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Asset Capacity
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Ensure the animation library can keep pace with daily production.
        </p>
      </div>
    </header>
    <div className="space-y-4">
      {assets.map((asset) => {
        const ratio = Math.min(asset.available / asset.needed, 1);
        const diff = asset.available - asset.needed;
        return (
          <article
            key={asset.id}
            className="rounded-2xl border border-zinc-200 bg-zinc-50/40 p-4 dark:border-zinc-700 dark:bg-zinc-900/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                {asset.label}
              </h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  diff >= 0
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-rose-500/10 text-rose-600"
                }`}
              >
                {diff >= 0 ? `Surplus ${diff}` : `Need ${Math.abs(diff)}`}
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className={`h-full rounded-full ${
                  diff >= 0 ? "bg-emerald-500" : "bg-rose-500"
                }`}
                style={{ width: `${ratio * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {asset.available} available / {asset.needed} needed
            </p>
          </article>
        );
      })}
    </div>
  </section>
);
