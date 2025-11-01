import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Inscripcion = {
  id: number
  nombre?: string
  idc?: string | null
  ubicacion?: string | null
  telefono?: string
  correo?: string
  edad?: number | null
  acompanantes?: number | null
  imagen_url?: string | null
  creado?: string
  genero?: string | null
  tipo_pago?: string | null
  monto?: number | null
  pago_confirmado?: boolean | null
  acompanante_de?: number | null
  activo?: boolean | null
  bautizado?: boolean | null
}


interface AcompanantesSectionProps {
  relatedInscripciones: Inscripcion[]
  onViewOrigin: (id: number) => void
  onEdit?: (ins: Inscripcion) => void
  onDeactivate: (id: number) => void
}

export default function AcompanantesSection({
  relatedInscripciones,
  onViewOrigin,
  onEdit,
  onDeactivate,
}: AcompanantesSectionProps) {
  if (!relatedInscripciones.length) return null

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2 text-lg text-yellow-600">Acompañantes</h4>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {relatedInscripciones.map((ins) => (
          <AccordionItem
            key={ins.id}
            value={`item-${ins.id}`}
            className="border rounded-lg px-3 bg-muted/30"
          >
            {/* Header: keep trigger small and move action buttons out to avoid nested <button> */}
            <div className="flex items-center justify-between py-2 font-medium">
              <AccordionTrigger className="flex-1 text-left">
                <div className="flex flex-col">
                  <span>Acompañante: {ins.nombre}</span>
                  <span className="text-sm text-muted-foreground">Ticket #{ins.id}</span>
                </div>
              </AccordionTrigger>

              <div className="flex gap-2 ml-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    // prevent the trigger toggle when clicking these action buttons
                    e.stopPropagation()
                    onEdit?.(ins)
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant={ins.activo ? "destructive" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeactivate?.(ins.id)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-4 p-4 border rounded bg-background">
                  <div className="font-medium">
                    <span className="text-yellow-600">Ticket:</span> {ins.id}
                  </div>
                  <div className="font-medium">
                    <span className="text-yellow-600">Nombre:</span> {ins.nombre}
                  </div>
                  <div className="font-medium">
                    <span className="text-yellow-600">Edad:</span> {ins.edad}
                  </div>
                  <div className="font-medium">
                    <span className="text-yellow-600">Teléfono:</span> {ins.telefono ?? "Sin teléfono"}
                  </div>
                  <div className="font-medium">
                    <span className="text-yellow-600">Correo:</span> {ins.correo ?? "Sin correo"}
                  </div>
                  <div className="font-medium">
                    <span className="text-yellow-600">De:</span> {ins.ubicacion} - {ins.idc}
                  </div>
                  <div className="font-medium col-span-2">
                    <span className="text-yellow-600">Bautizado:</span> {ins.bautizado ? "Sí" : "No"}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
