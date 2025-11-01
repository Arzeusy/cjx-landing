"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase/supabaseClient"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LabeledInput } from "@/components/ui/labelInput"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AcompanantesSection from "@/components/form/AcompanantesSection"
import InscripcionFields from "@/components/form/InscripcionFields"


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

interface InscripcionFormProps {
  initial: Inscripcion
  onCancel: () => void
  onSaved: (updated: Inscripcion) => void
  onViewOrigin?: (id: number) => void
}

export default function InscripcionForm({
  initial,
  onCancel,
  onSaved,
  onViewOrigin,
}: InscripcionFormProps) {
  const [form, setForm] = useState<Inscripcion>(initial)
  const [saving, setSaving] = useState(false)
  const [rotation, setRotation] = useState<number>(0)
  const [relatedInscripciones, setRelatedInscripciones] = useState<Inscripcion[]>([])
  const [_, setOriginalInscription] = useState<Inscripcion| null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showNewCompanion, setShowNewCompanion] = useState(false)
  const [editingCompanion, setEditingCompanion] = useState<Inscripcion | null>(null)
  const [newCompanion, setNewCompanion] = useState<Partial<Inscripcion>>({
    nombre: "",
    idc: "",
    ubicacion: "",
    telefono: "",
    correo: "",
    edad: null,
    genero: "",
    bautizado: false,
    acompanantes: 0,
  })

  // use loose key typing so this function is compatible with the generic InscripcionFields component
  const handleChange = (key: keyof Inscripcion, value: Inscripcion[keyof Inscripcion]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleCompanionChange = (key: keyof Inscripcion, value: Inscripcion[keyof Inscripcion]) => {
    setNewCompanion((prev) => ({ ...prev, [key]: value }))
  }

  // Cargar inscripciones relacionadas al montar o cambiar ID
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const { data: acompanantes, error: error1 } = await supabase
          .from("inscripciones")
          .select("*")
          .eq("acompanante_de", form.id)
          .eq("activo", true)
        if (error1) throw error1

        // const origen: Inscripcion[] = []
        if (form.acompanante_de) {
          const { data: origenData, error: error2 } = await supabase
            .from("inscripciones")
            .select("*")
            .eq("id", form.acompanante_de)
            .single()
          if (error2) throw error2
          if (origenData){
            setOriginalInscription(origenData)
          }
        }

        setRelatedInscripciones([...(acompanantes || [])])
      } catch (err) {
        console.error("Error fetching related inscripciones:", err)
        toast.error("Error al cargar inscripciones relacionadas")
      }
    }

    fetchRelated()
  }, [form.id, form.acompanante_de])

  const handleSaveCompanion = async () => {
    try {
      const { error } = await supabase
        .from("inscripciones")
        .insert([
          {
            ...newCompanion,
            activo: true,
            tipo_pago: form.tipo_pago,
            monto: form.monto,
            pago_confirmado: form.pago_confirmado,
            acompanante_de: form.id,
          },
        ])
        .select("*")
        .single()
      if (error) throw error

      toast.success("Acompañante agregado")
      setShowNewCompanion(false)
      setNewCompanion({})

      const { data: updated, error: error2 } = await supabase
        .from("inscripciones")
        .select("*")
        .eq("acompanante_de", form.id)
      if (error2) throw error2
      setRelatedInscripciones(updated || [])
    } catch (err) {
      console.error("Error saving companion:", err)
      toast.error("Error al guardar acompañante")
    }
  }

  useEffect(() => {
    if (editingCompanion) {
      setForm(editingCompanion)
    }
  }, [editingCompanion])

  const handleSave = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
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
        activo: form.activo ?? null,
        bautizado: form.bautizado ?? null,
      }

      // If a new file was selected, upload it and set imagen_url
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from("comprobantes").upload(fileName, selectedFile)
        if (uploadError) throw uploadError

        const { data: publicUrl } = supabase.storage.from("comprobantes").getPublicUrl(fileName)
        ;(payload as Partial<Inscripcion>).imagen_url = publicUrl.publicUrl
      }
      const { data, error } = await supabase
        .from("inscripciones")
        .update(payload)
        .eq("id", form.id)
        .select("*")
        .single()
      if (error) throw error
      toast.success("Inscripción actualizada")
      onSaved(data as Inscripcion)
    } catch (err) {
      console.error(err)
      toast.error("Error al actualizar")
    } finally {
      setSaving(false)
    }
  }

    const handleAvaliableCompanions = () => {
      if (form.acompanante_de) return false
      if (!form.acompanantes || form.acompanantes <= 0) return false
      const actuales = relatedInscripciones.length
      return actuales < form.acompanantes

    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscripción #{form.id}</CardTitle>
      </CardHeader>
      <CardContent>

        <form onSubmit={handleSave} className="grid sm:grid-cols-3 gap-6">
          {/* Imagen 1/3 */}
          <div className="col-span-1">
            <Label>Comprobante</Label>
            {form.imagen_url ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    src={form.imagen_url ?? ""}
                    alt={`img-${form.id}`}
                    className="max-w-full max-h-96 rounded cursor-pointer hover:opacity-90 transition"
                    width={800}
                    height={600}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Imagen ampliada</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      src={form.imagen_url ?? ""}
                      alt={`img-${form.id}`}
                      className="max-h-[80vh] rounded transition-transform"
                      style={{ transform: `rotate(${rotation}deg)` }}
                      width={1200}
                      height={800}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setRotation((r) => (r + 90) % 360)}
                    >
                      Rotar 90°
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="text-sm text-gray-600">No hay imagen</div>
            )}
            <div className="mt-2">
              <label className="text-sm font-medium">Subir nueva imagen (opcional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                className="block mt-2"
              />
              {selectedFile && <div className="text-xs text-muted-foreground mt-1">Archivo: {selectedFile.name}</div>}
            </div>
          </div>

          {/* Formulario 2/3 (shared fields) */}
          <div className="col-span-2">
            <div className={form.acompanante_de ? "col-span-2 flex items-center justify-between mb-4" : ""}>
              <LabeledInput
                label="# Ticket"
                value={form.id}
                readOnly
                disabled
              />
              {form.acompanante_de && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (form.acompanante_de) {
                      // navigate to original inscription if available
                      onViewOrigin?.(form.acompanante_de)
                    }
                  }}
                  className="ml-4"
                >
                  Ir a inscripción origen
                </Button>
              )}
            </div>

            <InscripcionFields
              value={form}
              onChange={handleChange}
              disabled={{ acompanantes: !!form.acompanante_de, tipo_pago: !!form.acompanante_de, monto: !!form.acompanante_de }}
            />

            <div className="flex gap-2 mt-2 col-span-2">
              <Button type="submit" className="bg-yellow-500 text-red-900" disabled={saving}>
                {saving ? "Guardando..." : "Guardar"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </div>
        </form>


        <AcompanantesSection
            relatedInscripciones={relatedInscripciones}
            onViewOrigin={(id: number) => onViewOrigin?.(id)}
            onEdit={setEditingCompanion}
            onDeactivate={async (id:number) => {
                const { error } = await supabase
                .from("inscripciones")
                .update({ activo: false })
                .eq("id", id)
                if (error) toast.error("Error al desactivar")
                else toast.success("Inscripción dada de baja")
            }}
        />

        {/* Nuevo acompañante */}
        {(handleAvaliableCompanions())   && (
          <div className="mt-6 border rounded p-4">
            {!showNewCompanion ? (
              <Button onClick={() => setShowNewCompanion(true)}>Agregar acompañante</Button>
            ) : (
              <div className="col-span-2 grid sm:grid-cols-2 gap-4 ">
                {/* <h4 className="font-medium">Nuevo acompañante</h4> */}
                {[
                  ["Nombre", "nombre", "text"],
                  ["IDC", "idc", "text"],
                  ["Ubicación", "ubicacion", "text"],
                  ["Teléfono", "telefono", "tel"],
                  ["Correo", "correo", "email"],
                  ["Edad", "edad", "number"],
                ].map(([label, key, type]) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <Input
                      type={type}
                      value={
                        newCompanion[key as keyof Inscripcion] !== null &&
                        newCompanion[key as keyof Inscripcion] !== undefined
                          ? String(newCompanion[key as keyof Inscripcion])
                          : ""
                      }
                      onChange={(e) =>
                        handleCompanionChange(
                          key as keyof Inscripcion,
                          type === "number"
                            ? e.target.value
                              ? Number(e.target.value)
                              : null
                            : e.target.value
                        )
                      }
                    />
                  </div>
                ))}

                <div>
                  <Label>Género</Label>
                  <select
                    value={newCompanion.genero ?? ""}
                    onChange={(e) => handleCompanionChange("genero", e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  >
                    <option className="text-black" value="">--</option>
                    <option className="text-black" value="Masculino">Masculino</option>
                    <option className="text-black" value="Femenino">Femenino</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="companion_bautizado"
                    checked={!!newCompanion.bautizado}
                    onCheckedChange={(checked) => handleCompanionChange("bautizado", checked)}
                  />
                  <Label htmlFor="companion_bautizado">Bautizado</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveCompanion}>Guardar acompañante</Button>
                  <Button variant="outline" onClick={() => setShowNewCompanion(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
