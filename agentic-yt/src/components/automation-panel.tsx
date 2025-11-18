import type { AutomationPreset } from "@/lib/sample-data";

interface AutomationPanelProps {
  presets: AutomationPreset[];
  onToggle: (id: string) => void;
  onStepEdit: (presetId: string, stepId: string, value: string) => void;
}

export const AutomationPanel = ({
  presets,
  onToggle,
  onStepEdit,
}: AutomationPanelProps) => (
  <section className="rounded-3xl border border-zinc-200 bg-white px-6 pb-6 pt-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
    <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Automation Presets
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Toggle creative presets and adjust individual agent outputs.
        </p>
      </div>
    </header>

    <div className="space-y-4">
      {presets.map((preset) => (
        <article
          key={preset.id}
          className="rounded-2xl border border-zinc-200 bg-zinc-50/40 p-5 transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
        >
          <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {preset.name}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {preset.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onToggle(preset.id)}
              className={`rounded-full px-4 py-1 text-sm font-medium transition ${
                preset.enabled
                  ? "border border-emerald-500 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:border-emerald-400 dark:text-emerald-300"
                  : "border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {preset.enabled ? "Enabled" : "Disabled"}
            </button>
          </header>

          <div className="mt-4 space-y-3">
            {preset.steps.map((step) => (
              <div
                key={step.id}
                className="rounded-xl border border-dashed border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950/40"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {step.label}
                  </span>
                  <textarea
                    value={step.output}
                    onChange={(event) =>
                      onStepEdit(preset.id, step.id, event.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-transparent p-3 text-sm text-zinc-700 shadow-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
);
