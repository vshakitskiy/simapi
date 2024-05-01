import { requestColumn } from "@/types/dataTable"
import type { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<requestColumn>[] = [
  {
    accessorKey: "usedApiKey",
    header: "API key"
  },
  {
    accessorKey: "path",
    header: "Path"
  },
  {
    accessorKey: "timestamp",
    header: "Recency"
  },
  {
    accessorKey: "duration",
    header: "Duration"
  },
  {
    accessorKey: "status",
    header: "Status"
  }
]