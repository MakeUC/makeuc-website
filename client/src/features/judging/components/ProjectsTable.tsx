"use client";
import { useQuery } from "@apollo/client";
import { XCircle } from "lucide-react";

import { DataTable } from "~/components/ui/data-table";
import { DataTableColumnHeader } from "~/components/ui/data-table/column-header";

import { GetProjectsDocument } from "../generated/graphql/graphql";

import { ProjectTableRowActions } from "./ProjectTableRowActions";

import type { GetProjectsQuery } from "../generated/graphql/graphql";
import type { ColumnDef } from "@tanstack/react-table";


const PROJECTS_TABLE_COLUMNS: ColumnDef<NonNullable<GetProjectsQuery["projects"]>[number]>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Project Name" className="min-w-[300px]" />,
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
  {
    id: "actions",
    cell: ({ row }) => <ProjectTableRowActions row={row} />,
  },
];

export interface ProjectsTableProps {

}

export function ProjectsTable({ }: ProjectsTableProps) {
  const { data } = useQuery(GetProjectsDocument);

  return (
    <DataTable
      columns={PROJECTS_TABLE_COLUMNS}
      data={data?.projects ?? []}
    />
  );
}