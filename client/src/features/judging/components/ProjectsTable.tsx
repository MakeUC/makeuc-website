"use client";

import { useQuery } from "@apollo/client";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { DataTable } from "~/components/ui/data-table";
import { DataTableColumnHeader } from "~/components/ui/data-table/column-header";

import { GetProjectsDocument } from "../generated/graphql/graphql";

import { DisqualifyForm } from "./DisqualifyForm";
import { JudgementForm } from "./JudgementForm";
import { ProjectTableRowActions } from "./ProjectTableRowActions";

import type { GetProjectsQuery } from "../generated/graphql/graphql";
import type { ColumnDef } from "@tanstack/react-table";


export function ProjectsTable() {
  const { data, loading } = useQuery(GetProjectsDocument);

  const [projectForJudgement, setProjectForJudgement] = useState<NonNullable<NonNullable<typeof data>["projects"]>[number]>();
  const [projectForDisqualification, setProjectForDisqualification] = useState<NonNullable<NonNullable<typeof data>["projects"]>[number]>();

  const columns = useMemo<ColumnDef<NonNullable<GetProjectsQuery["projects"]>[number]>[]>(() => [
    {
      id: "actions",
      cell: ({ row }) =>
        <ProjectTableRowActions
          row={row}
          devpostUrl={row.original.url ?? "#"}
          makeJudgement={setProjectForJudgement}
          disqualifyProject={setProjectForDisqualification}
        />,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Project Name" className="min-w-[300px]" />,
    },
    {
      accessorKey: "applicableTracks",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tracks" />,
      filterFn: (row, id, value) => {
        if (!row.getValue(id) && value?.length > 0) return false;
        return value.some((trackNameFilter: string) => (row.getValue(id) as string).includes(trackNameFilter));
      },
    },
    {
      accessorKey: "judgingGroup",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Group" />,
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "countJudgements",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Judgements" />,
    },
    {
      accessorKey: "score",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Score" />,
    },
    {
      accessorKey: "disqualified",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Disqualified" />,
      cell: ({ getValue }) => getValue() ? <span className="flex justify-center"><XCircle className="text-destructive" /></span> : "",
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
  ], []);

  return (
    <>
      {!loading && (!data?.projects || data.projects.length === 0) ? (
        <div className="text-center py-8 text-muted-foreground">
          No projects were found. Either you need to: sign back in at{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            /signin
          </Link>
          , request permission from an admin, or wait until judging starts.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data?.projects ?? []}
          isLoading={loading}
        />
      )}
      {
        projectForDisqualification && (
          <div className="flex flex-col items-center justify-center fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-50">
            <div className="flex flex-col gap-4 bg-background w-[400px] p-4 rounded-md max-h-screen overflow-y-auto">
              <h1 className="text-lg font-medium">Disqualify Project</h1>
              <hr className="border border-muted-foreground" />
              <DisqualifyForm
                projectId={projectForDisqualification.id}
                onCancel={() => setProjectForDisqualification(undefined)}
              />
            </div>
          </div>
        )
      }
      {
        projectForJudgement && (
          <div className="flex flex-col items-center justify-center fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-50">
            <div className="flex flex-col gap-4 bg-background w-[400px] p-4 rounded-md max-h-screen overflow-y-auto">
              <h1 className="text-lg font-medium">Make Judgment</h1>
              <hr className="border border-muted-foreground" />
              <JudgementForm
                projectId={projectForJudgement.id}
                onCancel={() => setProjectForJudgement(undefined)}
              />
            </div>
          </div>
        )
      }
    </>
  );
}