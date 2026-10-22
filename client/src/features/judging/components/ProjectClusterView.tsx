"use client";

import { Cpu, GitBranch, Layers } from "lucide-react";
import { useMemo } from "react";

import { ProjectNode } from "./ProjectNode";

import type { ProjectItem } from "../types";


export interface ProjectClusterViewProps {
  projects: ProjectItem[];
  onJudge: (project: ProjectItem) => void;
  onDisqualify: (project: ProjectItem) => void;
  onResetFilters?: () => void;
}

interface GroupCluster {
  groupName: string;
  groupId: number | null;
  projects: ProjectItem[];
  completedCount: number;
  inProgressCount: number;
  unjudgedCount: number;
}

export function ProjectClusterView({
  projects,
  onJudge,
  onDisqualify,
  onResetFilters,
}: ProjectClusterViewProps) {
  const clusters = useMemo<GroupCluster[]>(() => {
    const map = new Map<number | null, ProjectItem[]>();

    for (const project of projects) {
      const g = project.judgingGroup ?? null;
      const list = map.get(g) ?? [];
      list.push(project);
      map.set(g, list);
    }

    const sortedGroupKeys = Array.from(map.keys()).sort((a, b) => {
      if (a === null) return 1;
      if (b === null) return -1;
      return a - b;
    });

    return sortedGroupKeys.map(key => {
      const groupProjects = map.get(key) ?? [];
      const completedCount = groupProjects.filter(p => (p.countJudgements ?? 0) >= 3).length;
      const inProgressCount = groupProjects.filter(
        p => (p.countJudgements ?? 0) > 0 && (p.countJudgements ?? 0) < 3,
      ).length;
      const unjudgedCount = groupProjects.filter(p => (p.countJudgements ?? 0) === 0).length;

      return {
        groupName: key !== null ? `Judging Group ${key}` : "Unassigned Group",
        groupId: key,
        projects: groupProjects,
        completedCount,
        inProgressCount,
        unjudgedCount,
      };
    });
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center bg-card/40 flex flex-col items-center justify-center gap-3">
        <GitBranch className="w-8 h-8 text-primary animate-pulse" />
        <h3 className="text-xl font-bold text-foreground">No Project Clusters Found</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          No projects matched your criteria to build group clusters.
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
    <div className="flex flex-col gap-12">
      {clusters.map(cluster => {
        const total = cluster.projects.length;
        const percent = total > 0 ? Math.round((cluster.completedCount / total) * 100) : 0;

        return (
          <section
            key={cluster.groupName}
            className="relative flex flex-col items-center rounded-xl border border-border/80 bg-background-inset/40 p-6 pt-7"
          >
            {/* Cluster Hub Controller Node */}
            <div className="relative z-10 w-full max-w-md rounded-lg border-2 border-primary/60 bg-card p-4 shadow-[0_0_20px_rgba(0,255,65,0.15)] text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-primary/15 text-primary border border-primary/40 uppercase mb-2">
                <Cpu className="w-3.5 h-3.5" />
                Cluster Controller Hub
              </div>
              <h4 className="text-2xl font-bold text-foreground font-mono tracking-wide">
                {cluster.groupName.toUpperCase()}
              </h4>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {total} Assigned Project {total === 1 ? "Node" : "Nodes"} • {cluster.completedCount} Judged (
                {percent}%)
              </p>

              {/* Cluster Progress Bar */}
              <div className="w-full bg-background-inset rounded-full h-2 mt-3 overflow-hidden border border-border">
                <div
                  className="bg-primary h-full transition-all duration-300 shadow-[0_0_8px_#00ff41]"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground mt-2">
                <span>● {cluster.unjudgedCount} Pending</span>
                <span>◐ {cluster.inProgressCount} In Review</span>
                <span className="text-primary font-bold">✓ {cluster.completedCount} Done</span>
              </div>

              {/* Hub Bottom Connection Pin */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-card shadow-[0_0_10px_#00ff41] z-20 flex items-center justify-center"
                title="Cluster Hub Distribution Port"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-background" />
              </div>
            </div>

            {/* Visual Bus Branch Connector Graphic */}
            <div className="w-full flex flex-col items-center my-3 relative">
              <div className="w-0.5 h-6 bg-primary/60" />
              <div className="w-2/3 max-w-2xl h-0.5 bg-primary/40" />
              <div className="w-full flex justify-around">
                <div className="w-0.5 h-4 bg-primary/40" />
                <div className="w-0.5 h-4 bg-primary/40" />
                <div className="w-0.5 h-4 bg-primary/40" />
              </div>
            </div>

            {/* Child Project Nodes in this Cluster */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {cluster.projects.map((project, idx) => (
                <ProjectNode
                  key={project.id}
                  project={project}
                  nodeIndex={idx}
                  onJudge={onJudge}
                  onDisqualify={onDisqualify}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
