import type { ContentSlot } from "@/lib/sample-data";
import { formatDate, statusColorMap, statusLabel } from "@/lib/utils";

interface ContentCalendarProps {
  slots: ContentSlot[];
  onSlotStatusChange: (
    id: string,
    status: ContentSlot["status"],
  ) => void;
}

const statuses: ContentSlot["status"][] = [
  "draft",
  "scheduled",
  "uploading",
  "published",
];

export const ContentCalendar = ({
  slots,
  onSlotStatusChange,
}: ContentCalendarProps) => (
  <section className="rounded-3xl border border-zinc-200 bg-white px-6 pb-6 pt-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
    <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Upload Timeline
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Forecast the next four days of releases with automation checkpoints.
        </p>
      </div>
    </header>
    <div className="mt-6 space-y-4">
      {slots.map((slot) => (
        <article
          key={slot.id}
          className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:bg-zinc-100/70 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {slot.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {slot.theme} • {slot.runtime}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {formatDate(slot.publishDate)}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusColorMap[slot.status]}`}
              >
                {statusLabel(slot.status)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                className={`rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-wide transition ${
                  slot.status === status
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-transparent bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-white/40 dark:hover:bg-white/10"
                }`}
                onClick={() => onSlotStatusChange(slot.id, status)}
              >
                {statusLabel(status)}
              </button>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
);
