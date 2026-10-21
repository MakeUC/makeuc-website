"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Gavel,
  XCircle,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/utils";

import { getTrackBadgeStyle, parseTracks } from "../lib/utils";

import type { ProjectItem } from "../types";


export interface ProjectNodeProps {
  project: ProjectItem;
  nodeIndex?: number;
  onJudge: (project: ProjectItem) => void;
  onDisqualify: (project: ProjectItem) => void;
  className?: string;
}

export function ProjectNode({
  project,
  nodeIndex,
  onJudge,
  onDisqualify,
  className,
}: ProjectNodeProps) {
  const tracks = parseTracks(project.applicableTracks);
  const judgementsCount = project.countJudgements ?? 0;
  const isDisqualified = Boolean(project.disqualified);
  const isComplete = judgementsCount >= 3;
  const inProgress = judgementsCount > 0 && judgementsCount < 3;

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-lg border bg-card/90 text-card-foreground",
        "transition-all duration-200 shadow-md group",
        isDisqualified
          ? "border-destructive/60 hover:border-destructive hover:shadow-[0_0_15px_rgba(209,86,53,0.3)]"
          : isComplete
            ? "border-primary/50 hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,65,0.25)]"
            : inProgress
              ? "border-[#39ff14]/40 hover:border-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]"
              : "border-border hover:border-primary/70 hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]",
        className,
      )}
    >
      {/* Visual Node Input Socket (Left Pin) */}
      <div
        className={cn(
          "absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background",
          "flex items-center justify-center transition-all z-10",
          isDisqualified
            ? "bg-destructive/80"
            : isComplete
              ? "bg-primary group-hover:shadow-[0_0_8px_#00ff41]"
              : "bg-muted-foreground/60 group-hover:bg-primary",
        )}
        title="Input Port: Assigned Tracks & Group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-background" />
      </div>

      {/* Visual Node Output Socket (Right Pin) */}
      <div
        className={cn(
          "absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background",
          "flex items-center justify-center transition-all z-10",
          isDisqualified
            ? "bg-destructive/80"
            : isComplete
              ? "bg-primary group-hover:shadow-[0_0_8px_#00ff41]"
              : inProgress
                ? "bg-[#39ff14] group-hover:shadow-[0_0_8px_#39ff14]"
                : "bg-muted-foreground/60 group-hover:bg-primary",
        )}
        title="Output Port: Evaluation Matrix & Score"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-background" />
      </div>

      {/* Node Top Header Rail */}
      <div className="flex items-center justify-between border-b border-border/80 px-4 py-2.5 bg-background-inset/90 rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-muted-foreground">
            NODE {typeof nodeIndex === "number" ? `#${String(nodeIndex + 1).padStart(2, "0")}` : `#${project.id.slice(-4).toUpperCase()}`}
          </span>
          <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold bg-background border border-border text-primary font-mono">
            GROUP {project.judgingGroup ?? "—"}
          </span>
        </div>

        {/* Node Status Badge */}
        <div>
          {isDisqualified ? (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-destructive/20 border border-destructive/60 text-destructive-foreground">
              <XCircle className="w-3.5 h-3.5 text-destructive" />
              DISQUALIFIED
            </span>
          ) : isComplete ? (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-primary/20 border border-primary text-primary glow-text">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              COMPLETE
            </span>
          ) : inProgress ? (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-[#39ff14]/15 border border-[#39ff14]/60 text-popover">
              <Clock className="w-3.5 h-3.5 text-popover" />
              IN REVIEW ({judgementsCount}/3)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-muted border border-border text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              NEEDS REVIEW
            </span>
          )}
        </div>
      </div>

      {/* Node Center Core (Title & Tracks) */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg md:text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
              {project.name ?? "Untitled Project"}
            </h3>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-1"
                title="Open Devpost"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            )}
          </div>
          {project.year && (
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              CYCLE // {project.year}
            </p>
          )}
        </div>

        {/* Applicable Tracks */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {tracks.length > 0 ? (
            tracks.map(track => (
              <span
                key={track}
                className={cn(
                  "inline-flex items-center text-xs px-2 py-0.5 rounded border font-mono tracking-tight",
                  getTrackBadgeStyle(track),
                )}
              >
                ◈ {track}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground font-mono">
              ◈ General Submission
            </span>
          )}
        </div>

        {/* Telemetry Module (Judgements progress & score) */}
        <div className="mt-auto pt-2">
          <div className="bg-background-inset/90 border border-border/80 rounded-md p-3 flex items-center justify-between gap-2">
            {/* Judgements Progress Sub-node */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                Review Progress
              </span>
              <div className="flex items-center gap-2">
                {/* 3-step LED indicator */}
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map(slot => {
                    const isLit = judgementsCount > slot;
                    return (
                      <span
                        key={slot}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full border transition-all",
                          isLit
                            ? "bg-primary border-primary shadow-[0_0_6px_#00ff41]"
                            : "bg-background border-border",
                        )}
                        title={`Judgement ${slot + 1} ${isLit ? "Submitted" : "Pending"}`}
                      />
                    );
                  })}
                </div>
                <span className="text-xs font-mono font-bold text-foreground">
                  {judgementsCount} {judgementsCount === 1 ? "Judge" : "Judges"}
                </span>
              </div>
            </div>

            {/* Score Readout Sub-node */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                Current Score
              </span>
              <span
                className={cn(
                  "text-sm font-mono font-bold px-2 py-0.5 rounded border",
                  project.score
                    ? "border-primary/60 bg-primary/10 text-primary glow-text"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {project.score ? `${Number(project.score).toFixed(1)} PTS` : "PENDING"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Node Controls & Action Bar */}
      <div className="p-3 bg-background-inset/60 border-t border-border/80 rounded-b-lg flex items-center justify-between gap-2">
        {/* Disqualify button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDisqualify(project)}
          className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 px-2 h-8"
          title="Disqualify Project"
        >
          <AlertTriangle className="w-3.5 h-3.5 mr-1" />
          Disqualify
        </Button>

        <div className="flex items-center gap-2">
          {project.url && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(project.url ?? "#", "_blank")}
              className="text-xs px-2.5 h-8 border-border hover:border-primary font-mono"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              Devpost
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => onJudge(project)}
            className="text-xs px-3 h-8 bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-[0_0_10px_rgba(0,255,65,0.3)] font-mono"
          >
            <Gavel className="w-3.5 h-3.5 mr-1" />
            Judge Node
          </Button>
        </div>
      </div>
    </div>
  );
}
