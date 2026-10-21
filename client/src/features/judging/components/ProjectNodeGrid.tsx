"use client";

import { Sparkles } from "lucide-react";

import { ProjectNode } from "./ProjectNode";

import type { ProjectItem } from "../types";


export interface ProjectNodeGridProps {
  projects: ProjectItem[];
  onJudge: (project: ProjectItem) => void;
  onDisqualify: (project: ProjectItem) => void;
  onResetFilters?: () => void;
}

export function ProjectNodeGrid({
  projects,
  onJudge,
  onDisqualify,
  onResetFilters,
}: ProjectNodeGridProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center bg-card/40 flex flex-col items-center justify-center gap-3">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        <h3 className="text-xl font-bold text-foreground">No Matching Project Nodes</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          No project nodes matched your active search or filter criteria. Try clearing or relaxing your filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-2 text-xs font-mono px-3 py-1.5 rounded border border-primary bg-primary/10 text-primary hover:bg-primary/20 transition-all"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectNode
          key={project.id}
          project={project}
          nodeIndex={index}
          onJudge={onJudge}
          onDisqualify={onDisqualify}
        />
      ))}
    </div>
  );
}
