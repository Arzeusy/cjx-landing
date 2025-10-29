"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase/supabaseClient"
import { toast } from "sonner"
import DataTable from "@/components/form/dataTable"
import InscripcionForm from "@/components/form/inscripcionForm"
import CreateInscripcion from "@/components/form/CreateInscripcion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

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

export default function InscripcionPage() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const [ticket, setTicket] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")

  const [results, setResults] = useState<Inscripcion[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Inscripcion | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const ADMIN_USER = "admin"
  const ADMIN_PASS = "admin123"

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (user === ADMIN_USER && password === ADMIN_PASS) {
      setAuthenticated(true)
      toast.success("Autenticado")
    } else {
      toast.error("Credenciales incorrectas")
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setUser("")
    setPassword("")
    setResults([])
  }

  async function searchInscripciones() {
    setLoading(true)
    try {
      let query = supabase.from("inscripciones").select("*")

      if (ticket) {
        const idNum = Number(ticket)
        if (!Number.isNaN(idNum)) query = query.eq("id", idNum)
        else {
          toast.error("El ticket debe ser un número")
          setLoading(false)
          return
        }
      }
      if (telefono) query = query.ilike("telefono", `%${telefono}%`)
      if (correo) query = query.ilike("correo", `%${correo}%`)

      const { data, error } = await query.order("id", { ascending: false }).limit(500).eq("activo", true  )
      if (error) throw error
      setResults((data as Inscripcion[]) || [])
    } catch (err: any) {
      console.error(err)
      toast.error("Error al buscar inscripciones")
    } finally {
      setLoading(false)
    }
  }

  const handleDeactivate = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("inscripciones")
        .update({ activo: false })
        .eq("id", id)
        .select("*")
        .single()

      if (error) throw error
      // update local list
      // setResults((prev) => prev.map((r) => (r.id === id ? { ...r, activo: false } : r)))
      searchInscripciones()

      toast.success("Registro dado de baja")
    } catch (err) {
      console.error(err)
      toast.error("Error al dar de baja")
    }
  }

  const handleView = (ins: Inscripcion) => {
    setSelected(ins)
  }

  const handleSaved = (updated: Inscripcion) => {
    setResults((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
    setSelected(null)
  }

  useEffect(() => {
    if (authenticated && !ticket && !telefono && !correo) {
      searchInscripciones()
    }
  }, [authenticated])

  return (
    <div className="min-h-screen bg-card p-6">
      <nav className="bg-cyan-950 shadow rounded-lg p-4 flex items-center justify-between">
        <form onSubmit={handleLogin} className="flex items-center gap-2">
          <Input
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-32"
          />
          <Input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-32"
          />
          {!authenticated ? (
            <Button type="submit" className="bg-yellow-500 text-red-900 hover:bg-yellow-600">
              Entrar
            </Button>
          ) : (
            <Button type="button" variant="secondary" onClick={handleLogout}>
              Salir
            </Button>
          )}
        </form>

        <Image src="/conjuvexWhite.svg" alt="Conjuvex" width={80} height={40} priority />
      </nav>

      <main className="mt-6">
        {!authenticated ? (
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle>Acceso requerido</CardTitle>
              <CardDescription>
                Ingresa las credenciales para ver inscripciones
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros de búsqueda</CardTitle>
                <CardDescription>
                  Usa uno o más filtros para refinar los resultados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label>Ticket (ID)</Label>
                    <Input
                      value={ticket}
                      onChange={(e) => setTicket(e.target.value)}
                      placeholder="Ej: 123"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Teléfono</Label>
                    <Input
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Ej: 502 1234 5678"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Correo</Label>
                    <Input
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="Ej: correo@email.com"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button
                      onClick={() => searchInscripciones()}
                      className="bg-yellow-500 text-red-900 hover:bg-yellow-600"
                    >
                      {loading ? "Buscando..." : "Buscar"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTicket("")
                        setTelefono("")
                        setCorreo("")
                        searchInscripciones()
                      }}
                    >
                      Limpiar
                    </Button>
                    <Button
                      onClick={() => setShowCreate(true)}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Inscribir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selected ? (
              <InscripcionForm initial={selected} onCancel={() => setSelected(null)} onSaved={handleSaved} />
            ) : (
              <>
                <DataTable data={results} onView={handleView} onDeactivate={handleDeactivate} />
                <CreateInscripcion
                  open={showCreate}
                  onClose={() => setShowCreate(false)}
                  onCreated={(ins) => {
                    setResults((prev) => [ins as any, ...prev])
                  }}
                />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
