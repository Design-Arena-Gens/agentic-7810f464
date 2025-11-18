"use client";

import { useMemo, useState } from "react";
import { StatGrid } from "@/components/stat-grid";
import { PipelineBoard } from "@/components/pipeline-board";
import { ContentCalendar } from "@/components/content-calendar";
import { AutomationPanel } from "@/components/automation-panel";
import { DailyRunbook } from "@/components/daily-runbook";
import { AssetGraph } from "@/components/asset-graph";
import {
  automationPresets as presetsSeed,
  initialStages,
  upcomingSlots,
  type AutomationPreset,
  type ContentSlot,
  type PipelineStage,
  type StageStatus,
} from "@/lib/sample-data";
import { statusLabel } from "@/lib/utils";

const checklistBlueprint = [
  {
    id: "prompts",
    label: "Refresh prompt bank",
    detail: "Pull latest trending topics and validate moral themes.",
  },
  {
    id: "render",
    label: "Kick off render queue",
    detail: "Dispatch animation pass to GPU cluster.",
  },
  {
    id: "mix",
    label: "Mix narration + SFX",
    detail: "Balance levels and export master WAV.",
  },
  {
    id: "qc",
    label: "Quality check final master",
    detail: "Auto-review runtime, watermark, and end-slate.",
  },
  {
    id: "schedule",
    label: "Schedule upload slot",
    detail: "Confirm metadata and release cadence for next 72 hours.",
  },
];

const assetCapacity = [
  {
    id: "rigs",
    label: "Character rigs",
    available: 46,
    needed: 40,
  },
  {
    id: "backgrounds",
    label: "Background environments",
    available: 26,
    needed: 32,
  },
  {
    id: "music",
    label: "Music beds",
    available: 18,
    needed: 24,
  },
  {
    id: "voices",
    label: "Voice packs",
    available: 12,
    needed: 10,
  },
];

export default function Home() {
  const [stages, setStages] = useState<PipelineStage[]>(initialStages);
  const [slots, setSlots] = useState<ContentSlot[]>(upcomingSlots);
  const [presets, setPresets] = useState<AutomationPreset[]>(presetsSeed);
  const [checklist, setChecklist] = useState<string[]>(["prompts"]);

  const automationVelocity = useMemo(() => {
    const totalStages = stages.length;
    const completedStages = stages.filter((stage) => stage.status === "done");
    const velocity = Math.round((completedStages.length / totalStages) * 100);
    return {
      completedStages,
      velocity,
    };
  }, [stages]);

  const enabledPresets = presets.filter((preset) => preset.enabled).length;
  const nextUpload = useMemo(() => {
    const sorted = [...slots].sort(
      (a, b) =>
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime(),
    );
    return sorted[0];
  }, [slots]);

  const statItems = [
    {
      id: "velocity",
      label: "Pipeline Velocity",
      value: `${automationVelocity.velocity}%`,
      trend:
        automationVelocity.velocity > 70
          ? "+4% vs. yesterday"
          : "-3% vs. target",
      hint: `${automationVelocity.completedStages.length}/${stages.length} agents completed`,
    },
    {
      id: "next-upload",
      label: "Next Upload",
      value: nextUpload
        ? new Date(nextUpload.publishDate).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })
        : "TBD",
      trend: nextUpload ? statusLabel(nextUpload.status) : "Awaiting slot",
      hint: nextUpload ? nextUpload.title : "No slot configured",
    },
    {
      id: "presets",
      label: "Active Automations",
      value: enabledPresets.toString().padStart(2, "0"),
      trend: `${presets.length - enabledPresets} standby`,
      hint: "Switch presets to pivot styles instantly.",
    },
    {
      id: "reliability",
      label: "Upload Reliability",
      value: "98.2%",
      trend: "Last 30 days",
      hint: "Measured by on-time publish versus schedule.",
    },
  ];

  const handleStageStatusChange = (stageId: string, status: StageStatus) => {
    setStages((prev) =>
      prev.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              status,
            }
          : stage,
      ),
    );
  };

  const handleSlotStatusChange = (
    slotId: string,
    status: ContentSlot["status"],
  ) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              status,
            }
          : slot,
      ),
    );
  };

  const handlePresetToggle = (presetId: string) => {
    setPresets((prev) =>
      prev.map((preset) =>
        preset.id === presetId
          ? {
              ...preset,
              enabled: !preset.enabled,
            }
          : preset,
      ),
    );
  };

  const handleStepEdit = (
    presetId: string,
    stepId: string,
    value: string,
  ) => {
    setPresets((prev) =>
      prev.map((preset) =>
        preset.id === presetId
          ? {
              ...preset,
              steps: preset.steps.map((step) =>
                step.id === stepId
                  ? {
                      ...step,
                      output: value,
                    }
                  : step,
              ),
            }
          : preset,
      ),
    );
  };

  const handleChecklistToggle = (itemId: string) => {
    setChecklist((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-sky-50 pb-24 pt-12 font-sans dark:from-zinc-950 dark:via-zinc-950 dark:to-sky-950/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <section className="relative overflow-hidden rounded-[40px] border border-zinc-200 bg-white px-8 pb-10 pt-12 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="absolute inset-y-[-25%] right-[-10%] w-1/2 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10" />
          <div className="absolute inset-y-0 left-[-15%] w-1/3 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl space-y-4">
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                Agent Stack v1.0
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
                Nebula Animator, your daily YouTube animation operator.
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">
                Coordinate idea generation, animation renders, audio mixing, and
                upload logistics from a single automation cockpit tuned for
                daily storytelling.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Trigger Today&apos;s Workflow
                </button>
                <button
                  type="button"
                  className="rounded-full border border-zinc-300 px-6 py-2 text-sm font-semibold text-zinc-600 transition hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
                >
                  Preview Story Assets
                </button>
              </div>
            </div>
            <div className="grid gap-3 rounded-3xl border border-zinc-200 bg-white/80 p-6 text-sm shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/60">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Today&apos;s Upload Stack
              </span>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {stages.slice(0, 4).map((stage) => (
                  <div
                    key={stage.id}
                    className="flex items-center justify-between"
                  >
                    <span>{stage.title}</span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {statusLabel(stage.status)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-xs text-zinc-400">
                Syncs with render queue & scheduling agents in real time.
              </span>
            </div>
          </div>
        </section>

        <StatGrid stats={statItems} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <PipelineBoard
            stages={stages}
            onStatusChange={handleStageStatusChange}
          />
          <div className="grid gap-6">
            <ContentCalendar
              slots={slots}
              onSlotStatusChange={handleSlotStatusChange}
            />
            <DailyRunbook
              items={checklistBlueprint}
              completed={checklist}
              onToggle={handleChecklistToggle}
              slotCount={slots.length}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AutomationPanel
            presets={presets}
            onToggle={handlePresetToggle}
            onStepEdit={handleStepEdit}
          />
          <AssetGraph assets={assetCapacity} />
        </div>
      </div>
    </main>
  );
}
