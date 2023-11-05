"use client";

import { XIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { InputRaw } from "~/components/ui/inputs/input";

// TODO: Incorporate Table View Options
// import { DataTableViewOptions } from "./view-options";

import { DataTableFacetedFilter } from "./faceted-filter";

import type { DataTableFacetedFilterOption } from "./faceted-filter";
import type { Table } from "@tanstack/react-table";

// TODO: Deal with this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const JUDGING_GROUP_OPTIONS: DataTableFacetedFilterOption[] = Array.from({ length: 12 }, (_, i) => ({ label: `Group ${i + 1}`, value: i + 1 }));

// TODO: Deal with this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DISQUALIFIED_OPTIONS: DataTableFacetedFilterOption[] = [{ label: "Not Disqualified", value: false }, { label: "Disqualified", value: true }];

// TODO: Deal with this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const TRACK_OPTIONS: DataTableFacetedFilterOption[] = [
  { label: "Green Tech", value: "Green Tech" },
  { label: "Education", value: "Education" },
  { label: "Social Issues", value: "Social Issues" },
  { label: "Security", value: "Security" },
];


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* TODO: Make toolbar *not* global */}
        <InputRaw
          name="Filter"
          placeholder="Filter projects..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={event =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("judgingGroup") && (
          <DataTableFacetedFilter
            column={table.getColumn("judgingGroup")}
            title="Group"
            options={JUDGING_GROUP_OPTIONS}
            many
          />
        )}
        {table.getColumn("applicableTracks") && (
          <DataTableFacetedFilter
            column={table.getColumn("applicableTracks")}
            title="Applicable Tracks"
            options={TRACK_OPTIONS}
          />
        )}
        {table.getColumn("disqualified") && (
          <DataTableFacetedFilter
            column={table.getColumn("disqualified")}
            title="Disqualified"
            options={DISQUALIFIED_OPTIONS}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset Filters
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}