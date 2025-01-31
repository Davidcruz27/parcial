"use client";
import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { DoorClosed, PercentDiamondIcon, PlusCircle } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "@/components/Pdf";
import { Casa } from "@prisma/client";

interface DataTableProps<TData extends Casa, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Casa, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter Ciudad..."
          value={(table.getColumn("ciudad")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("ciudad")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />{" "}
        <div className="flex gap-5">
          <Button>
            <PercentDiamondIcon className="h-4 w-4 mr-2" />
            <PDFDownloadLink
              document={
                <PDF
                  casaData={data.filter(
                    (casa) =>
                      casa.precio !== null &&
                      casa.habitaciones !== null &&
                      casa.imageUrl !== null
                  )}
                />
              }
              fileName="casa_data.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <button>Loading...</button>
                ) : (
                  <button>Download</button>
                )
              }
            </PDFDownloadLink>
          </Button>

          <Link href={"/registra"}>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Home
            </Button>
          </Link>
          <Link href={"/"}>
            <Button>
              <DoorClosed className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
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
  );
}
