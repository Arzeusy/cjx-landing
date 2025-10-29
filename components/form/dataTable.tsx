"use client"

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

type Inscripcion = {
  id: number
  nombre?: string
  telefono?: string
  correo?: string
  acompanantes?: number | null
  imagen_url?: string | null
  creado?: string
  activo?: boolean | null
}

const columns: ColumnDef<Inscripcion>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "telefono", header: "Teléfono" },
  { accessorKey: "correo", header: "Correo" },
  {
    accessorKey: "acompanantes",
    header: "Acompañantes",
    cell: ({ row }) => row.original.acompanantes ?? "-",
  },
  {
    accessorKey: "imagen_url",
    header: "Imagen",
    cell: ({ row }) =>
      row.original.imagen_url ? (
        <a
          href={row.original.imagen_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Ver
        </a>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "creado",
    header: "Fecha",
    cell: ({ row }) =>
      row.original.creado
        ? new Date(row.original.creado).toLocaleString()
        : "-",
  },
]

export default function DataTable({
  data,
  onView,
  onDeactivate,
}: {
  data: Inscripcion[]
  onView?: (ins: Inscripcion) => void
  onDeactivate?: (id: number) => Promise<void>
}) {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  // Move columns inside component so action callbacks can be used.
  const columns: ColumnDef<Inscripcion>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "telefono", header: "Teléfono" },
    { accessorKey: "correo", header: "Correo" },
    {
      accessorKey: "acompanantes",
      header: "Acompañantes",
      cell: ({ row }) => row.original.acompanantes ?? "-",
    },
    {
      accessorKey: "imagen_url",
      header: "Imagen",
      cell: ({ row }) =>
        row.original.imagen_url ? (
          <a
            href={row.original.imagen_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Ver
          </a>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "creado",
      header: "Fecha",
      cell: ({ row }) =>
        row.original.creado ? new Date(row.original.creado).toLocaleString() : "-",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onView?.(row.original)}>
            Ver
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDeactivate?.(row.original.id)}
            disabled={row.original.activo === false}
          >
            Dar de baja
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { pagination: { pageIndex, pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize })
        setPageIndex(newState.pageIndex)
        setPageSize(newState.pageSize)
      }
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscripciones ({data.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
                  <TableCell colSpan={columns.length} className="text-center">
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <span>
            Página {pageIndex + 1} de {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
