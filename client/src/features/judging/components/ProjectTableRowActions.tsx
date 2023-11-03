"use client";

import { MoreHorizontal } from "lucide-react";


import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import type { Row } from "@tanstack/react-table";


interface ProjectTableRowActionsProps<TData> {
  row: Row<TData>;
  devpostUrl: string;
  makeJudgement?: (row: TData) => void;
  disqualifyProject?: (row: TData) => void;
}

export function ProjectTableRowActions<TData>({
  row,
  devpostUrl,
  makeJudgement,
  disqualifyProject,
}: ProjectTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => window.open(devpostUrl, "_blank")}>View Devpost</DropdownMenuItem>
        <DropdownMenuItem onClick={() => makeJudgement?.(row.original)}>Make Judgement</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disqualifyProject?.(row.original)} className="focus:bg-destructive focus:text-destructive-foreground">Disqualify</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}