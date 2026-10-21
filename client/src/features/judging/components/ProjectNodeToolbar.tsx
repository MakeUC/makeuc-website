"use client";

import {
  ArrowUpDown,
  Filter,
  Grid,
  List,
  Network,
  RotateCcw,
  Search,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/utils";

import type { SortOption, StatusFilter, ViewMode } from "../types";


const TRACK_OPTIONS = [
  "Green Tech",
  "Education",
  "Social Issues",
  "Security",
  "Hardware",
];

const GROUP_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

export interface ProjectNodeToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGroup: number | null;
  onGroupChange: (group: number | null) => void;
  selectedTrack: string | null;
  onTrackChange: (track: string | null) => void;
  statusFilter: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
  totalFilteredCount: number;
  totalCount: number;
}

export function ProjectNodeToolbar({
  searchQuery,
  onSearchChange,
  selectedGroup,
  onGroupChange,
  selectedTrack,
  onTrackChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  isFiltered,
  totalFilteredCount,
  totalCount,
}: ProjectNodeToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/80 bg-background-inset/50 p-4">
      {/* Top Bar: Search and View Mode Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects by name, track, or group..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-mono"
            >
              ✕
            </button>
          )}
        </div>

        {/* View Switcher Toggle Buttons */}
        <div className="flex items-center gap-1 self-start md:self-auto p-1 rounded-lg bg-background border border-border">
          <button
            type="button"
            onClick={() => onViewModeChange("node")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all",
              viewMode === "node"
                ? "bg-primary text-primary-foreground shadow-[0_0_8px_#00ff41]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
            title="Node Grid View"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Nodes</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("cluster")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all",
              viewMode === "cluster"
                ? "bg-primary text-primary-foreground shadow-[0_0_8px_#00ff41]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
            title="Group Clusters Tree View"
          >
            <Network className="w-3.5 h-3.5" />
            <span>Clusters</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all",
              viewMode === "table"
                ? "bg-primary text-primary-foreground shadow-[0_0_8px_#00ff41]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
            title="Classic Table List View"
          >
            <List className="w-3.5 h-3.5" />
            <span>List Table</span>
          </button>
        </div>
      </div>

      {/* Filter Selectors Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-border/50 text-xs font-mono">
        {/* Judging Group Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Group:</span>
          <select
            value={selectedGroup ?? ""}
            onChange={e => onGroupChange(e.target.value ? Number(e.target.value) : null)}
            className="rounded border border-border bg-background px-2.5 py-1 text-foreground focus:outline-none focus:border-primary"
          >
            <option value="">All Groups</option>
            {GROUP_OPTIONS.map(g => (
              <option key={g} value={g}>
                Group {g}
              </option>
            ))}
          </select>
        </div>

        {/* Track Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Track:</span>
          <select
            value={selectedTrack ?? ""}
            onChange={e => onTrackChange(e.target.value ? e.target.value : null)}
            className="rounded border border-border bg-background px-2.5 py-1 text-foreground focus:outline-none focus:border-primary"
          >
            <option value="">All Tracks</option>
            {TRACK_OPTIONS.map(track => (
              <option key={track} value={track}>
                {track}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Status:</span>
          <select
            value={statusFilter}
            onChange={e => onStatusChange(e.target.value as StatusFilter)}
            className="rounded border border-border bg-background px-2.5 py-1 text-foreground focus:outline-none focus:border-primary"
          >
            <option value="all">All Statuses</option>
            <option value="needs-judging">Needs Review (0)</option>
            <option value="in-review">In Review (1-2)</option>
            <option value="completed">Completed (3+)</option>
            <option value="disqualified">Disqualified</option>
          </select>
        </div>

        {/* Sort Option */}
        <div className="flex items-center gap-1.5 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value as SortOption)}
            className="rounded border border-border bg-background px-2.5 py-1 text-foreground focus:outline-none focus:border-primary"
          >
            <option value="priority">Priority (Needs Review)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="group-asc">Group (1-12)</option>
            <option value="score-desc">Score (High to Low)</option>
            <option value="judgements-asc">Judgements (Least)</option>
            <option value="judgements-desc">Judgements (Most)</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-primary font-mono ml-2"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Filter Summary Caption */}
      <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground pt-1">
        <span>
          Showing <strong className="text-foreground">{totalFilteredCount}</strong> of{" "}
          <strong className="text-foreground">{totalCount}</strong> project nodes
        </span>
        {isFiltered && <span className="text-popover">● Active Filters Applied</span>}
      </div>
    </div>
  );
}
