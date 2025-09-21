"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import TicketPreview from "../ui/ticketPreview"
import { supabase } from "@/lib/supabase/supabaseClient"
import { toast } from "sonner"
import { Download} from "lucide-react";
export type FormDataType = {
  nombre: string
  idc: string
  ubicacion: string
  telefono: string
  correo: string
  edad: string
  acompanantes: string
  imagen: File | null
}

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (data: FormDataType) => void
}

const initialFormData: FormDataType = {
  nombre: "",
  idc: "",
  ubicacion: "",
  telefono: "",
  correo: "",
  edad: "",
  acompanantes: "",
  imagen: null,
}

export default function InscriptionModal({ open, setOpen, onSubmit }: Props) {
  const [formData, setFormData] = useState<FormDataType>(initialFormData)

  // Estado para manejar vista en móvil
  const [showPreview, setShowPreview] = useState(false)
  const [ticketNumber, setTicketNumber] = useState<number>(0)

  const handleReset = () => {
    setFormData(initialFormData)
    setTicketNumber(0)
    setShowPreview(false)
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (files) setFormData({ ...formData, [name]: files[0] })
    else setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre || !formData.acompanantes || !formData.imagen) {
      toast.info("Nombre, acompañantes e imagen son obligatorios.")
      return
    }
    if (!formData.telefono && !formData.correo) {
      toast.info("Debes ingresar al menos teléfono o correo.")
      return
    }
    try {
      const newId = await saveInscription(formData)
      toast.success("Inscripción guardada con éxito 🎉")
      // setOpen(false)
      setTicketNumber(newId);
      setShowPreview(true);
    } catch (err) {
      console.error(err)
      toast.error("Error al guardar la inscripción. Intenta de nuevo.")
    }
  }


  async function saveInscription(data: FormDataType) {
    let imageUrl = null

    if (data.imagen) {
      const fileExt = data.imagen.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from("comprobantes")
        .upload(fileName, data.imagen)

      if (uploadError) throw uploadError

      const { data: publicUrl } = supabase
        .storage
        .from("comprobantes")
        .getPublicUrl(fileName)

      imageUrl = publicUrl.publicUrl
    }

    const { data: insertedData, error } = await supabase.from("inscripciones").insert([
      {
        nombre: data.nombre,
        idc: data.idc,
        ubicacion: data.ubicacion,
        telefono: data.telefono,
        correo: data.correo,
        edad: data.edad ? Number(data.edad) : null,
        acompanantes: Number(data.acompanantes),
        imagen_url: imageUrl,
      },
    ]).select("id").single() ;


    if (error) throw error
    else return insertedData.id;
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
          // className="w-auto max-w-full sm:max-w-fit rounded-xl shadow-xl border border-yellow-500"
              className="
    fixed inset-0 w-full h-full rounded-none translate-x-0 translate-y-0 max-w-full p-2
    sm:inset-auto sm:w-full sm:max-w-lg sm:h-auto sm:rounded-xl
    sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
    border border-yellow-500 shadow-xl
  "
        >
        <DialogHeader >
            <DialogTitle className="text-2xl font-bold text-yellow-600 w-full text-center">
            Formulario de Inscripción
          </DialogTitle>
        </DialogHeader>

          {
           ticketNumber == 0 && (
              <div className="flex  flex-col  justify-center  sm:justify-between sm:flex-row  mb-4 gap-4">
                <Button
                  type="button"
                  variant={!showPreview ? "default" : "outline"}
                  onClick={() => setShowPreview(false)}
                >
                  Formulario
                </Button>
                <Button
                  type="button"
                  variant={showPreview ? "default" : "outline"}
                  onClick={() => setShowPreview(true)}
                >
                  Ver Ticket
                </Button>
              </div>
            )
          }

          {!showPreview ? (
           <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombres completos *</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Ej: Juan Pérez"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="idc">IDC</Label>
              <Input
                id="idc"
                name="idc"
                placeholder="Ej: Olintepeque"
                value={formData.idc}
                onChange={handleChange}
                className="border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="ubicacion">Ubicación</Label>
              <Input
                id="ubicacion"
                name="ubicacion"
                placeholder="Ej: Quetzaltenango"
                value={formData.ubicacion}
                onChange={handleChange}
                className="border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                name="telefono"
                placeholder="Ej: 502 1234 5678"
                value={formData.telefono}
                onChange={handleChange}
                className="border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="correo">Correo electrónico</Label>
              <Input
                id="correo"
                type="email"
                name="correo"
                placeholder="Ej: correo@email.com"
                value={formData.correo}
                onChange={handleChange}
                className="border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="edad">Edad</Label>
              <Input
                id="edad"
                type="number"
                name="edad"
                placeholder="Ej: 18"
                value={formData.edad}
                onChange={handleChange}
                className="border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="acompanantes">Número de acompañantes *</Label>
              <Input
                id="acompanantes"
                type="number"
                name="acompanantes"
                placeholder="Ej: 2"
                value={formData.acompanantes}
                onChange={handleChange}
                required
                className="border border-gray-300"
              />
              <Label htmlFor="total" className=" text-yellow-600 text-sm">
                {formData.acompanantes && `Total de: ${(Number(formData.acompanantes) + 1) * 150}.00`}
              </Label>
            </div>

            <div>
              <Label htmlFor="imagen">Comprobante de pago *</Label>
              <Input
                id="imagen"
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
                required
                className="border border-gray-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold py-2 rounded-md"
            >
              Enviar Inscripción
            </Button>
          </form>

          ) : (
            <div className="w-full min-h-[254px] mx-auto">
              <TicketPreview formData={formData} handleReset={handleReset} ticketNumber={ticketNumber > 0 ? ticketNumber.toString(): ""} />
            </div>
          )}
      </DialogContent>
    </Dialog>
  )
}
