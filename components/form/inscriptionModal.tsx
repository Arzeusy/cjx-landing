"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import TicketPreview from "../ui/ticketPreview"

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

export default function InscriptionModal({ open, setOpen, onSubmit }: Props) {
  const [formData, setFormData] = useState<FormDataType>({
    nombre: "",
    idc: "",
    ubicacion: "",
    telefono: "",
    correo: "",
    edad: "",
    acompanantes: "",
    imagen: null,
  })

  // Estado para manejar vista en móvil
  const [showPreview, setShowPreview] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (files) setFormData({ ...formData, [name]: files[0] })
    else setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre || !formData.acompanantes || !formData.imagen) {
      alert("Nombre, acompañantes e imagen son obligatorios.")
      return
    }
    if (!formData.telefono && !formData.correo) {
      alert("Debes ingresar al menos teléfono o correo.")
      return
    }
    onSubmit(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
          className="w-auto max-w-full sm:max-w-fit rounded-xl shadow-xl border border-yellow-500"
        >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-600">
            Formulario de Inscripción
          </DialogTitle>
        </DialogHeader>


          <div className="flex justify-between mb-4">
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
                placeholder="Ej: 123456"
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
            <div className="min-w-[462px] min-h-[254px] mx-auto">
              <TicketPreview formData={formData} />
            </div>
          )}
      </DialogContent>
    </Dialog>
  )
}
