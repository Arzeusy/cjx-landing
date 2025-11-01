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
        <AccordionItem
          key={relatedInscripciones[0].id}
          value={`item-${relatedInscripciones[0].id}`}
          className="border rounded-lg px-3 bg-muted/30"
        >
          {/* Header: keep trigger small and move action buttons out to avoid nested <button> */}
          <div className="flex items-center justify-between py-2 font-medium">
            <AccordionTrigger className="flex-1 text-left">
              <div className="flex flex-col">
                Acompañantes
              </div>
            </AccordionTrigger>

            <div className="flex gap-2 ml-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  // prevent the trigger toggle when clicking these action buttons
                  e.stopPropagation()
                  onEdit?.(relatedInscripciones[0])
                }}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant={relatedInscripciones[0].activo ? "destructive" : "outline"}
                onClick={(e) => {
                  e.stopPropagation()
                  onDeactivate?.(relatedInscripciones[0].id)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <AccordionContent>
            <div className="space-y-2 pt-2">
              {relatedInscripciones.map((ins) => (
                <div key={ins.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="font-medium"><b className="text-yellow-600">Ticket:</b> {ins.id}</div>
                  <div className="font-medium"><b className="text-yellow-600">Nombre:</b> {ins.nombre}</div>
                  <div className="font-medium"><b className="text-yellow-600">Edad:</b> {ins.edad}</div>
                  <div className="font-medium"><b className="text-yellow-600">Teléfono:</b> {ins.telefono != null ? ins.telefono : "Sin telefono"}</div>
                  <div className="font-medium"><b className="text-yellow-600">Correo:</b> {ins.correo != null ? ins.correo : "Sin correo"}</div>
                  <div className="font-medium">
                    <b className="text-yellow-600">De:</b> {ins.ubicacion} - {ins.idc}
                  </div>
                  <div className="font-medium"><b className="text-yellow-600">Bautizado:</b> {ins.bautizado ? "si" : "no"}</div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
