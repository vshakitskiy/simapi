"use client"

import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { requestColumn } from "@/types/dataTable"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

type ColumnItems = requestColumn & { ms: number }

export const columns: ColumnDef<ColumnItems>[] = [
  {
    accessorKey: "usedApiKey",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}
      >
        API key
        <ArrowUpDown className={cn("ml-2 w-4 h-4", {
          "-scale-y-100 -rotate-180": column.getIsSorted() === "asc",
          "text-primary": column.getIsSorted() !== false
        })} />
      </Button>
    )
  },
  {
    accessorKey: "path",
    header: "Path",
    cell: ({ row }) => <>{`api${row.getValue<string>("path").split("/api")[1]}`}</>
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}
      >
        Recency
        <ArrowUpDown className={cn("ml-2 w-4 h-4", {
          "-scale-y-100 -rotate-180": column.getIsSorted() === "asc",
          "text-primary": column.getIsSorted() !== false
        })} />
      </Button>
    ),
    sortingFn: (rowA, rowB, _columnID) => {
      return rowA.original.ms - rowB.original.ms
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}
      >
        Duration
        <ArrowUpDown className={cn("ml-2 w-4 h-4", {
          "-scale-y-100 -rotate-180": column.getIsSorted() === "asc",
          "text-primary": column.getIsSorted() !== false
        })} />
      </Button>
    ),
    cell: ({ row }) => <>{`${row.getValue<string>("duration")} ms`}</>
  },
  {
    accessorKey: "status",
    header: "Status"
  }
]