"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import InscripcionFields from "@/components/form/InscripcionFields"
import { supabase } from "@/lib/supabase/supabaseClient"

import { Inscripcion } from "@/types/inscripcion"

interface Props {
  open: boolean
  onClose: () => void
  onCreated: (ins: Inscripcion) => void
}

export default function CreateInscripcion({ open, onClose, onCreated }: Props) {
  const [form, setForm] = useState<Partial<Inscripcion>>({
    nombre: "",
    idc: "",
    ubicacion: "",
    telefono: "",
    correo: "",
    edad: null,
    acompanantes: 0,
    genero: "",
    tipo_pago: "",
    monto: null,
    pago_confirmado: false,
    activo: true,
    bautizado: false,
  })
  const [saving, setSaving] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (key: keyof Inscripcion, value: Inscripcion[keyof Inscripcion]) => {
    setForm((p) => ({ ...p, [key]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0]
    setFile(f ?? null)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        nombre: form.nombre,
        idc: form.idc,
        ubicacion: form.ubicacion,
        telefono: form.telefono,
        correo: form.correo,
        edad: form.edad ?? null,
        acompanantes: form.acompanantes ?? null,
        genero: form.genero ?? null,
        tipo_pago: form.tipo_pago ?? null,
        monto: form.monto ?? null,
        pago_confirmado: form.pago_confirmado ?? null,
        acompanante_de: form.acompanante_de ?? null,
        activo: form.activo ?? true,
        bautizado: form.bautizado ?? false,
      }

      // If a file was selected, upload it to Supabase Storage and attach public url
      if (file) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from("comprobantes").upload(fileName, file)
        if (uploadError) throw uploadError

        const { data: publicUrl } = supabase.storage.from("comprobantes").getPublicUrl(fileName)
        ;(payload as Partial<Inscripcion>).imagen_url = publicUrl.publicUrl
      }
      const { data, error } = await supabase.from("inscripciones").insert([payload]).select("*").single()
      if (error) throw error
      toast.success("Inscripción creada")
      onCreated(data as Inscripcion)
      onClose()
    } catch (err) {
      console.error(err)
      toast.error("Error al crear inscripción")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Crear nueva inscripción</DialogTitle>
        </DialogHeader>

        <div className="p-2">
          <InscripcionFields value={form} onChange={handleChange} />

          <div className="mt-3">
            <label className="text-sm font-medium">Comprobante (imagen)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block mt-2"
            />
            {file && <div className="text-xs text-muted-foreground mt-1">Archivo seleccionado: {file.name}</div>}
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} disabled={saving} className="bg-yellow-500 text-red-900">
              {saving ? "Guardando..." : "Inscribir"}
            </Button>
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
