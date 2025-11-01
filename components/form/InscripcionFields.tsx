"use client"

import React from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LabeledInput } from "@/components/ui/labelInput"
import { Switch } from "@/components/ui/switch"

import { Inscripcion } from "@/types/inscripcion"

interface Props {
  value: Partial<Inscripcion>
  onChange: (key: keyof Inscripcion, value: Inscripcion[keyof Inscripcion]) => void
  disabled?: Record<string, boolean>
  className?: string
}

export default function InscripcionFields({ value, onChange, disabled, className }: Props) {
  const montoCalculado = 150 * ((Number(value.acompanantes) || 0) + 1)
  const montoMostrado = value.monto !== null && value.monto !== undefined ? value.monto : montoCalculado

  return (
    <div className={className}>
      <div className="col-span-2 grid sm:grid-cols-2 gap-4">
        {/* <LabeledInput label="# Ticket" value={value.id ?? ""} readOnly disabled /> */}

        <LabeledInput
          label="Nombre"
          value={value.nombre ?? ""}
          onChange={(e) => onChange("nombre", e.target.value)}
        />
        <LabeledInput
          label="IDC"
          value={value.idc ?? ""}
          onChange={(e) => onChange("idc", e.target.value)}
        />
        <LabeledInput
          label="Ubicación"
          value={value.ubicacion ?? ""}
          onChange={(e) => onChange("ubicacion", e.target.value)}
        />
        <LabeledInput
          label="Teléfono"
          value={value.telefono ?? ""}
          onChange={(e) => onChange("telefono", e.target.value)}
        />
        <LabeledInput
          label="Correo"
          value={value.correo ?? ""}
          onChange={(e) => onChange("correo", e.target.value)}
        />
        <LabeledInput
          type="number"
          label="Edad"
          value={value.edad ?? ""}
          onChange={(e) => onChange("edad", e.target.value ? Number(e.target.value) : null)}
        />
        <LabeledInput
          type="number"
          label="Acompañantes"
          value={value.acompanantes ?? ""}
          onChange={(e) => onChange("acompanantes", e.target.value ? Number(e.target.value) : null)}
          disabled={!!disabled?.acompanantes}
        />

        <div>
          <Label>Género</Label>
          <select
            value={value.genero ?? ""}
            onChange={(e) => onChange("genero", e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option className="text-black" value="">--</option>
            <option className="text-black" value="Masculino">Masculino</option>
            <option className="text-black" value="Femenino">Femenino</option>
          </select>
        </div>

        <div>
          <Label>Tipo de pago</Label>
          <select
            value={value.tipo_pago ?? ""}
            onChange={(e) => onChange("tipo_pago", e.target.value)}
            className="w-full border rounded px-2 py-1"
            disabled={!!disabled?.tipo_pago}
          >
            <option className="text-black" value="">--</option>
            <option className="text-black" value="electronico">Electrónico</option>
            <option className="text-black" value="efectivo">Efectivo</option>
          </select>
        </div>

        <LabeledInput
          type="number"
          label="Monto"
          value={montoMostrado}
          onChange={(e) => {
            const newValue = e.target.value ? Number(e.target.value) : null
            onChange("monto", newValue)
          }}
          disabled={!!disabled?.monto}
          placeholder={`Sugerido: ${montoCalculado}`}
        />

        <div className="flex items-center gap-2">
          <Switch
            id="pago_confirmado"
            checked={!!value.pago_confirmado}
            onCheckedChange={(checked) => onChange("pago_confirmado", checked)}
          />
          <Label htmlFor="pago_confirmado">Pago confirmado</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="bautizado"
            checked={!!value.bautizado}
            onCheckedChange={(checked) => onChange("bautizado", checked)}
          />
          <Label htmlFor="bautizado">Bautizado</Label>
        </div>
       { (value.id ?? 0) < 1 && ( 
            <div className="flex items-center gap-2">
            <input
                id="activo"
                type="checkbox"
                checked={!!value.activo}
                onChange={(e) => onChange("activo", e.target.checked)}
            />
            
            <Label htmlFor="activo">{value.activo ? "Activo" : "Inactivo"}</Label>
            </div>
        )}
      </div>
    </div>
  )
}
