// "use client";

// // import { DropdownMenuTrigger, MixerHorizontalIcon } from "lucide-react";

// // import { Button } from "~/components/ui/button";

// import type { Table } from "@tanstack/react-table";

// // import {
// //   DropdownMenu,
// //   DropdownMenuCheckboxItem,
// //   DropdownMenuContent,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// // } from "@/registry/new-york/ui/dropdown-menu";


// interface DataTableViewOptionsProps<TData> {
//   table: Table<TData>
// }

// export function DataTableViewOptions<TData>({
//   table,
// }: DataTableViewOptionsProps<TData>) {
//   return (
//     // <DropdownMenu>
//     //   <DropdownMenuTrigger asChild>
//     //     <Button
//     //       variant="outline"
//     //       size="sm"
//     //       className="ml-auto hidden h-8 lg:flex"
//     //     >
//     //       <MixerHorizontalIcon className="mr-2 h-4 w-4" />
//     //       View
//     //     </Button>
//     //   </DropdownMenuTrigger>
//     //   <DropdownMenuContent align="end" className="w-[150px]">
//     //     <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
//     //     <DropdownMenuSeparator />
//     //     {table
//     //       .getAllColumns()
//     //       .filter(
//     //         column =>
//     //           typeof column.accessorFn !== "undefined" && column.getCanHide(),
//     //       )
//     //       .map(column => {
//     //         return (
//     //           <DropdownMenuCheckboxItem
//     //             key={column.id}
//     //             className="capitalize"
//     //             checked={column.getIsVisible()}
//     //             onCheckedChange={value => column.toggleVisibility(!!value)}
//     //           >
//     //             {column.id}
//     //           </DropdownMenuCheckboxItem>
//     //         );
//     //       })}
//     //   </DropdownMenuContent>
//     // </DropdownMenu>
//   );
// }