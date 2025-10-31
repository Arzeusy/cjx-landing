"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import InscriptionModal, { FormDataType } from "@/components/form/inscriptionModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InscripcionSection() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleFormSubmit = (data: FormDataType) => {
    // 🔥 Aquí podrías enviar a Firebase / Supabase
  };

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2500);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 items-center">
      {/* Mapa */}
      <div className="rounded-xl overflow-hidden shadow-lg">
      
        <Card
            className="bg-gradient-to-b from-red-900/80 to-black/90 border border-yellow-500 text-white rounded-2xl shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Salon XelaFer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full rounded-lg overflow-hidden">              
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.375519797572!2d-91.5045256!3d14.8602659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858ea2bef8e7afbf%3A0x6600e10422303c85!2sFeria%20Nacional%20XELAFER!5e0!3m2!1ses!2sgt!4v1756863564257!5m2!1ses!2sgt"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>
            
            </CardContent>
          </Card>
      </div>

      {/* Texto + Botones */}
      <div className="flex flex-col justify-center items-center text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-400">
          Sé Parte del Cambio
        </h2>
        <p className="text-white text-lg max-w-md">
          Inscríbete ahora y vive una experiencia espiritual única junto a miles de jóvenes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold px-8 py-4 text-lg rounded-md"
            onClick={() => setOpen(true)}
          >
            Inscríbete Ahora
          </Button>
          <Button
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold px-8 py-4 text-lg rounded-md"
          >
            Más Información
          </Button>
        </div>

        {/* Información de cuentas para depósitos */}
        <div className="w-full max-w-md bg-black/50 border border-yellow-500 rounded-md p-4 text-left mt-4 text-white">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">Cuentas para depósitos</h3>

          <div className="mb-3">
            <p className="text-sm text-yellow-300 font-medium">Banco Industrial — Monetaria</p>
            <p className="text-sm">Número de cuenta: <span className="font-mono">4130045943</span></p>
            <p className="text-sm">A nombre de: Brandon Abraham Perez Perez</p>
            <div className="mt-2">
              <Button
                size="sm"
                className="bg-yellow-500 text-red-900 px-3 py-1 rounded-md"
                onClick={() => copyToClipboard("4130045943", "industrial")}
                aria-label="Copiar cuenta Banco Industrial"
              >
                {copied === "industrial" ? "Copiado" : "Copiar número"}
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-yellow-300 font-medium">Banco BANRURAL — Ahorro</p>
            <p className="text-sm">Número de cuenta: <span className="font-mono">4419080213</span></p>
            <p className="text-sm">A nombre de: Brandon Abraham Perez Perez</p>
            <div className="mt-2">
              <Button
                size="sm"
                className="bg-yellow-500 text-red-900 px-3 py-1 rounded-md"
                onClick={() => copyToClipboard("4419080213", "banrural")}
                aria-label="Copiar cuenta BANRURAL"
              >
                {copied === "banrural" ? "Copiado" : "Copiar número"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Reutilizable */}
      <InscriptionModal open={open} setOpen={setOpen} onSubmit={handleFormSubmit} />
    </div>
  );
}
