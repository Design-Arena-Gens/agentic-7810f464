import { Fragment } from "react";
import type { PipelineStage, StageStatus } from "@/lib/sample-data";
import { statusColorMap, statusLabel } from "@/lib/utils";

const stagePalette: Record<StageStatus, string> = {
  pending: "bg-zinc-50 dark:bg-zinc-900",
  "in-progress": "bg-indigo-50 dark:bg-indigo-950/20",
  done: "bg-emerald-50 dark:bg-emerald-950/20",
  blocked: "bg-rose-50 dark:bg-rose-950/20",
};

const stageStatusOrder: StageStatus[] = [
  "pending",
  "in-progress",
  "done",
  "blocked",
];

interface PipelineBoardProps {
  stages: PipelineStage[];
  onStatusChange: (stageId: string, status: StageStatus) => void;
}

export const PipelineBoard = ({
  stages,
  onStatusChange,
}: PipelineBoardProps) => (
  <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
    <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Daily Story Assembly Line
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Track every automation agent from ideation to the scheduled upload.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {stageStatusOrder.map((status) => (
          <span
            key={status}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColorMap[status]}`}
          >
            {status.replace("-", " ")}
          </span>
        ))}
      </div>
    </header>

    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {stages.map((stage, index) => (
        <Fragment key={stage.id}>
          <article
            className={`relative overflow-hidden rounded-2xl border border-zinc-200 p-5 transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 ${stagePalette[stage.status]}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  Stage {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {stage.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {stage.description}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Owner:{" "}
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                      {stage.owner}
                    </span>
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Due:{" "}
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                      {index === 0
                        ? "Today"
                        : index === 1
                          ? "Today 6pm"
                          : `Day ${stage.dueOffsetDays + 1}`}
                    </span>
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Output:{" "}
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">
                      {stage.deliverable}
                    </span>
                  </span>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusColorMap[stage.status]}`}
              >
                {statusLabel(stage.status)}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {stage.automationHooks.map((hook) => (
                <span
                  key={hook}
                  className="rounded-full border border-dashed border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
                >
                  {hook}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {stageStatusOrder.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => onStatusChange(stage.id, status)}
                  className={`rounded-full border px-4 py-1 text-sm font-medium transition ${
                    stage.status === status
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                      : "border-transparent bg-zinc-900/5 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-900/10 dark:bg-white/10 dark:text-zinc-300 dark:hover:border-white/40 dark:hover:bg-white/20"
                  }`}
                >
                  {statusLabel(status)}
                </button>
              ))}
            </div>
          </article>
        </Fragment>
      ))}
    </div>
  </section>
);
