interface Stat {
  id: string;
  label: string;
  value: string;
  trend: string;
  hint?: string;
}

interface StatGridProps {
  stats: Stat[];
}

export const StatGrid = ({ stats }: StatGridProps) => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat) => (
      <article
        key={stat.id}
        className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60"
      >
        <header className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {stat.label}
          </span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {stat.trend}
          </span>
        </header>
        <p className="mt-4 text-3xl font-semibold text-zinc-900 dark:text-white">
          {stat.value}
        </p>
        {stat.hint ? (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {stat.hint}
          </p>
        ) : null}
      </article>
    ))}
  </section>
);
