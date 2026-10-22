"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
} from "lucide-react";

import { cn } from "~/utils";

import type { ProjectItem, StatusFilter } from "../types";


export interface ProjectTelemetryPanelProps {
  projects: ProjectItem[];
  activeFilter: StatusFilter;
  onSelectFilter: (filter: StatusFilter) => void;
}

export function ProjectTelemetryPanel({
  projects,
  activeFilter,
  onSelectFilter,
}: ProjectTelemetryPanelProps) {
  const total = projects.length;
  const needsJudging = projects.filter(
    p => !p.disqualified && (p.countJudgements ?? 0) === 0,
  ).length;
  const inReview = projects.filter(
    p => !p.disqualified && (p.countJudgements ?? 0) > 0 && (p.countJudgements ?? 0) < 3,
  ).length;
  const completed = projects.filter(
    p => !p.disqualified && (p.countJudgements ?? 0) >= 3,
  ).length;
  const disqualified = projects.filter(p => Boolean(p.disqualified)).length;

  const items = [
    {
      id: "all" as StatusFilter,
      label: "TOTAL NODES",
      count: total,
      icon: Layers,
      color: "text-foreground",
      border: "border-border",
      bg: "bg-card/70",
    },
    {
      id: "needs-judging" as StatusFilter,
      label: "NEEDS REVIEW",
      count: needsJudging,
      icon: Clock,
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-950/20",
    },
    {
      id: "in-review" as StatusFilter,
      label: "IN PROGRESS",
      count: inReview,
      icon: Cpu,
      color: "text-[#39ff14]",
      border: "border-[#39ff14]/40",
      bg: "bg-[#39ff14]/10",
    },
    {
      id: "completed" as StatusFilter,
      label: "FULLY JUDGED",
      count: completed,
      icon: CheckCircle2,
      color: "text-primary",
      border: "border-primary/50",
      bg: "bg-primary/10",
    },
    {
      id: "disqualified" as StatusFilter,
      label: "DISQUALIFIED",
      count: disqualified,
      icon: AlertTriangle,
      color: "text-destructive",
      border: "border-destructive/40",
      bg: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {items.map(item => {
        const Icon = item.icon;
        const isSelected = activeFilter === item.id;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelectFilter(isSelected ? "all" : item.id)}
            className={cn(
              "flex flex-col justify-between p-3 rounded-lg border text-left transition-all font-mono",
              item.border,
              item.bg,
              isSelected
                ? "ring-2 ring-primary shadow-[0_0_15px_rgba(0,255,65,0.25)] scale-[1.02]"
                : "hover:border-primary/60 hover:scale-[1.01]",
            )}
          >
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold tracking-wider">{item.label}</span>
              <Icon className={cn("w-3.5 h-3.5", item.color)} />
            </div>
            <div className={cn("text-2xl font-bold font-mono tracking-tight", item.color)}>
              {item.count}
            </div>
          </button>
        );
      })}
    </div>
  );
}
