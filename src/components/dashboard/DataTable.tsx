"use client"

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, SortingState, useReactTable, getSortedRowModel } from "@tanstack/react-table"
import { Button } from "@/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/Table"
import { useState } from "react"

interface Props<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
}

const DataTable = <TData, TValue>({
  columns,
  data
}: Props<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting
    },
    initialState: {
      pagination: {
        pageSize: 6
      }
    }
  })
  return (
    <div className="flex flex-col">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center justify-center">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
          Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
          Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataTable