"use client"

import { Button } from "@/components/ui/button"

export default function GalaEvent() {
  return (
    <div className="relative z-10 flex flex-col gap-10">
      {/* Título centrado que abarca todo el ancho */}
      <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 text-center mb-4">
        🎬 ¡Luces, cámara y acción! 🎬
      </h2>

      {/* Contenido dividido en 2 columnas */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
        
        {/* Video Facebook */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fmibextid%3DwwXIfr%26v%3D4305961533061827%26rdid%3DGpM0sQ0VaFMa7H0i&show_text=false&width=560"
              width="100%"
              height="315"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Información */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-white text-lg max-w-2xl mb-6 mx-auto lg:mx-0">
            Una noche de gala donde celebraremos juntos en un ambiente único, 
            lleno de elegancia y momentos memorables.
          </p>
          <span className="text-white text-lg mb-4 block">
            🗓️ Fecha: Sábado 1 de noviembre
          </span>
          <span className="text-white text-lg mb-4 block">
            📍 Lugar: Centro de convenciones
          </span>
          <span className="text-white text-lg mb-8 block">
            👔 Código de vestimenta: Formal y elegante
          </span>

          <Button
            asChild
            className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold px-8 py-4 text-lg rounded-md"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdGalFormularioEjemplo/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserva tu lugar
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
