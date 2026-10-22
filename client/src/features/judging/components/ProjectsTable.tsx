"use client";

import { useQuery } from "@apollo/client";
import { Loader, Sparkles, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { DataTableColumnHeader } from "~/components/ui/data-table/column-header";

import { GetProjectsDocument } from "../generated/graphql/graphql";
import { DEMO_PROJECTS } from "../lib/demoData";
import { parseTracks } from "../lib/utils";

import { DisqualifyForm } from "./DisqualifyForm";
import { JudgementForm } from "./JudgementForm";
import { ProjectClusterView } from "./ProjectClusterView";
import { ProjectNodeGrid } from "./ProjectNodeGrid";
import { ProjectNodeToolbar } from "./ProjectNodeToolbar";
import { ProjectTableRowActions } from "./ProjectTableRowActions";
import { ProjectTelemetryPanel } from "./ProjectTelemetryPanel";

import type { ProjectItem, SortOption, StatusFilter } from "../types";
import type { ColumnDef } from "@tanstack/react-table";


export function ProjectsTable() {
  const { data, loading } = useQuery(GetProjectsDocument);

  const [projectForJudgement, setProjectForJudgement] = useState<ProjectItem>();
  const [projectForDisqualification, setProjectForDisqualification] = useState<ProjectItem>();
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);

  // View state: Node view is now the original/default view (isListView = false)
  const [isListView, setIsListView] = useState<boolean>(false);
  const [groupByCluster, setGroupByCluster] = useState<boolean>(false);

  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("priority");

  const rawProjects = useMemo<ProjectItem[]>(() => {
    if (data?.projects && data.projects.length > 0) {
      return data.projects;
    }
    if (isDemoActive) {
      return DEMO_PROJECTS;
    }
    return [];
  }, [data?.projects, isDemoActive]);

  const isFiltered = Boolean(
    searchQuery.trim() || selectedGroup !== null || selectedTrack !== null || statusFilter !== "all",
  );

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedGroup(null);
    setSelectedTrack(null);
    setStatusFilter("all");
    setSortBy("priority");
  };

  const processedProjects = useMemo<ProjectItem[]>(() => {
    let result = [...rawProjects];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(project => {
        const nameMatch = project.name?.toLowerCase().includes(q) ?? false;
        const tracks = parseTracks(project.applicableTracks);
        const trackMatch = tracks.some(t => t.toLowerCase().includes(q));
        const groupMatch = project.judgingGroup ? `group ${project.judgingGroup}`.includes(q) : false;
        return nameMatch || trackMatch || groupMatch;
      });
    }

    // Group filter
    if (selectedGroup !== null) {
      result = result.filter(project => project.judgingGroup === selectedGroup);
    }

    // Track filter
    if (selectedTrack !== null) {
      result = result.filter(project => {
        const tracks = parseTracks(project.applicableTracks);
        return tracks.includes(selectedTrack);
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(project => {
        const isDisq = Boolean(project.disqualified);
        const count = project.countJudgements ?? 0;
        if (statusFilter === "disqualified") return isDisq;
        if (isDisq) return false;
        if (statusFilter === "needs-judging") return count === 0;
        if (statusFilter === "in-review") return count > 0 && count < 3;
        if (statusFilter === "completed") return count >= 3;
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "priority": {
          const aDisq = a.disqualified ? 1 : 0;
          const bDisq = b.disqualified ? 1 : 0;
          if (aDisq !== bDisq) return aDisq - bDisq;

          const aCount = a.countJudgements ?? 0;
          const bCount = b.countJudgements ?? 0;
          return aCount - bCount;
        }
        case "name-asc":
          return (a.name ?? "").localeCompare(b.name ?? "");
        case "name-desc":
          return (b.name ?? "").localeCompare(a.name ?? "");
        case "group-asc":
          return (a.judgingGroup ?? 999) - (b.judgingGroup ?? 999);
        case "score-desc": {
          const aScore = a.score ? Number(a.score) : -1;
          const bScore = b.score ? Number(b.score) : -1;
          return bScore - aScore;
        }
        case "judgements-asc":
          return (a.countJudgements ?? 0) - (b.countJudgements ?? 0);
        case "judgements-desc":
          return (b.countJudgements ?? 0) - (a.countJudgements ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [rawProjects, searchQuery, selectedGroup, selectedTrack, statusFilter, sortBy]);

  // Classic Table View Columns
  const tableColumns = useMemo<ColumnDef<ProjectItem>[]>(() => [
    {
      id: "actions",
      cell: ({ row }) => (
        <ProjectTableRowActions
          row={row}
          devpostUrl={row.original.url ?? "#"}
          makeJudgement={setProjectForJudgement}
          disqualifyProject={setProjectForDisqualification}
        />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Project Name" className="min-w-[300px]" />,
    },
    {
      accessorKey: "applicableTracks",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tracks" />,
      cell: ({ row }) => {
        const tracks = parseTracks(row.original.applicableTracks);
        return tracks.length > 0 ? tracks.join(", ") : "—";
      },
    },
    {
      accessorKey: "judgingGroup",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Group" />,
      cell: ({ row }) => (row.original.judgingGroup ? `Group ${row.original.judgingGroup}` : "—"),
    },
    {
      accessorKey: "countJudgements",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Judgements" />,
    },
    {
      accessorKey: "score",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Score" />,
      cell: ({ row }) => (row.original.score ? Number(row.original.score).toFixed(1) : "—"),
    },
    {
      accessorKey: "disqualified",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Disqualified" />,
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="flex justify-center">
            <XCircle className="text-destructive" />
          </span>
        ) : (
          ""
        ),
    },
  ], []);

  const hasNoData = !loading && rawProjects.length === 0;

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Loading state indicator */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-16 text-primary font-mono">
          <Loader className="w-5 h-5 animate-spin" />
          <span>INITIALIZING PROJECT NODES MATRIX...</span>
        </div>
      )}

      {/* Empty Database notice with Demo Mode Toggle */}
      {hasNoData && (
        <div className="rounded-xl border border-dashed border-border p-8 bg-card/60 flex flex-col items-center text-center gap-4">
          <div className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            No live projects were found in the database. Either you need to sign in at{" "}
            <Link href="/signin" className="text-popover hover:underline font-semibold underline">
              /signin
            </Link>
            , request judging permissions from an admin, or wait until judging commences.
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Button
              onClick={() => setIsDemoActive(true)}
              className="bg-primary text-primary-foreground font-bold font-mono shadow-[0_0_12px_rgba(0,255,65,0.4)]"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              Preview Sample Projects in Node View
            </Button>
          </div>
        </div>
      )}

      {/* When projects are present (live or demo) */}
      {!loading && rawProjects.length > 0 && (
        <>
          {/* Demo Mode banner indicator */}
          {isDemoActive && !data?.projects?.length && (
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-primary/10 border border-primary/40 text-xs font-mono text-primary">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                DEMO MODE ACTIVE: Showing sample project nodes for evaluation
              </span>
              <button
                type="button"
                onClick={() => setIsDemoActive(false)}
                className="underline hover:text-foreground"
              >
                Exit Demo
              </button>
            </div>
          )}

          {/* Top Telemetry Panel */}
          <ProjectTelemetryPanel
            projects={rawProjects}
            activeFilter={statusFilter}
            onSelectFilter={setStatusFilter}
          />

          {/* Controls & Filter Toolbar with Top-Right List View Toggle */}
          <ProjectNodeToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGroup={selectedGroup}
            onGroupChange={setSelectedGroup}
            selectedTrack={selectedTrack}
            onTrackChange={setSelectedTrack}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            isListView={isListView}
            onToggleListView={setIsListView}
            groupByCluster={groupByCluster}
            onToggleGroupByCluster={setGroupByCluster}
            onResetFilters={handleResetFilters}
            isFiltered={isFiltered}
            totalFilteredCount={processedProjects.length}
            totalCount={rawProjects.length}
          />

          {/* View Modes: List View when toggled ON; otherwise original Node View (Grid or Cluster) */}
          {isListView ? (
            <DataTable
              columns={tableColumns}
              data={processedProjects}
              isLoading={loading}
            />
          ) : groupByCluster ? (
            <ProjectClusterView
              projects={processedProjects}
              onJudge={setProjectForJudgement}
              onDisqualify={setProjectForDisqualification}
              onResetFilters={isFiltered ? handleResetFilters : undefined}
            />
          ) : (
            <ProjectNodeGrid
              projects={processedProjects}
              onJudge={setProjectForJudgement}
              onDisqualify={setProjectForDisqualification}
              onResetFilters={isFiltered ? handleResetFilters : undefined}
            />
          )}
        </>
      )}

      {/* Disqualify Modal */}
      {projectForDisqualification && (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-50 p-4">
          <div className="flex flex-col gap-4 bg-background w-[min(90vw,640px)] p-6 rounded-lg border border-border shadow-2xl max-h-[90vh] overflow-y-auto">
            <h1 className="text-xl font-bold font-mono text-destructive flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Disqualify Project: {projectForDisqualification.name}
            </h1>
            <hr className="border border-border" />
            <DisqualifyForm
              projectId={projectForDisqualification.id}
              onCancel={() => setProjectForDisqualification(undefined)}
            />
          </div>
        </div>
      )}

      {/* Judgement Modal */}
      {projectForJudgement && (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-50 p-4">
          <div className="flex flex-col gap-4 bg-background w-[min(90vw,760px)] p-6 rounded-lg border border-primary shadow-[0_0_30px_rgba(0,255,65,0.2)] max-h-[90vh] overflow-y-auto">
            <h1 className="text-xl font-bold font-mono text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Judge Node: {projectForJudgement.name}
            </h1>
            <hr className="border border-border" />
            <JudgementForm
              projectId={projectForJudgement.id}
              onCancel={() => setProjectForJudgement(undefined)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
