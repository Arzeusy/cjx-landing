"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Activities() {

    return (
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-6">
            📖 ¡Súper Bibliatón! 📖
          </h2>
          <p className="text-white text-lg max-w-2xl mb-8 mx-auto lg:mx-0">
            Un evento especial donde pondrás a prueba tus conocimientos bíblicos de forma divertida y en equipo.
            Habrá preguntas, retos y sobre todo, un tiempo para crecer juntos.
          </p>
          <span className="text-white text-lg max-w-2xl mb-4 block">
            🗓️ Fecha: 1 de noviembre
          </span>
          <span className="text-white text-lg max-w-2xl mb-4 block">
            📍 Lugar: centro de convenciones
          </span>
          <span className="text-white text-lg max-w-2xl mb-8 block">
            👥 Participación: Por equipos
          </span>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold px-8 py-4 text-lg rounded-md">
              Inscribe a tu equipo
          </Button>
        </div>

        {/* Imagen */}
        <div className="flex-1 flex justify-center md:text-center">
          <img 
            src="/bibliaton.jpeg" 
            alt="Súper Bibliatón" 
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>
    )

}