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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
  const [selectedForDeactivation, setSelectedForDeactivation] = useState<Inscripcion | null>(null)

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
            onClick={() => setSelectedForDeactivation(row.original)}
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
    <>
      <AlertDialog open={!!selectedForDeactivation} onOpenChange={(open) => !open && setSelectedForDeactivation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar dar de baja?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción dará de baja la inscripción de{" "}
              <span className="font-medium">{selectedForDeactivation?.nombre}</span> (Ticket #{" "}
              {selectedForDeactivation?.id}). Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (selectedForDeactivation && onDeactivate) {
                  await onDeactivate(selectedForDeactivation.id)
                  setSelectedForDeactivation(null)
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Dar de baja
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
    </>
  )
}
