interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
}

interface DailyRunbookProps {
  items: ChecklistItem[];
  completed: string[];
  onToggle: (id: string) => void;
  slotCount: number;
}

export const DailyRunbook = ({
  items,
  completed,
  onToggle,
  slotCount,
}: DailyRunbookProps) => (
  <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-6 pb-6 pt-5 shadow-sm dark:border-zinc-800 dark:from-indigo-950/40 dark:via-zinc-950/60 dark:to-emerald-950/30">
    <header className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Daily Autopilot Runbook
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Sync checklist across {slotCount} scheduled uploads.
        </p>
      </div>
    </header>
    <div className="space-y-3">
      {items.map((item) => {
        const isDone = completed.includes(item.id);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className={`flex w-full items-start gap-4 rounded-2xl border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950/60 ${
              isDone
                ? "border-emerald-500/40 bg-emerald-500/10"
                : "border-zinc-200 dark:border-zinc-700"
            }`}
          >
            <span
              className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm font-semibold ${
                isDone
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-zinc-300 text-zinc-400"
              }`}
            >
              {isDone ? "✔" : ""}
            </span>
            <span>
              <span
                className={`block text-base font-semibold ${
                  isDone ? "text-emerald-700 dark:text-emerald-300" : "text-zinc-900 dark:text-white"
                }`}
              >
                {item.label}
              </span>
              <span className="mt-1 block text-sm text-zinc-500 dark:text-zinc-300">
                {item.detail}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  </section>
);
