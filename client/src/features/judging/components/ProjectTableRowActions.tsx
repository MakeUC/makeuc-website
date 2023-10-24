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
  row: Row<TData>
}

export function ProjectTableRowActions<TData>({
  row,
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
        {/* TODO: Make functional */}
        <DropdownMenuItem onClick={() => console.log(row)}>View Devpost</DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log(row)}>Make Judgement</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log(row)} className="focus:bg-destructive focus:text-destructive-foreground">Disqualify</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}