"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Activities from "@/components/section/activities"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionInterRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)

  const backgrounds = [
    {
      src: "/letras_1.svg",
      opacity: 0.7,
      position: "center",
      size: "contain",
    },
  ]
  
  const [fadeI, setFadeI] = useState(1)
  const [fade2, setFade2] = useState(1)
  const [fade3, setFade3] = useState(1)
  const [bgSrc, setBgSrc] = useState(backgrounds[0]) // Fondo inicial

  useEffect(() => {
    
    
    const handleScroll = () => {
      const winH = window.innerHeight

      // Fade sección inter
      if (sectionInterRef.current) {
        const rect = sectionInterRef.current.getBoundingClientRect()
        let opacity = 1 - Math.max(0, (winH / 2 - rect.top) / winH)
        setFadeI(Math.max(0, Math.min(1, opacity)))
        if (opacity > 0.5) setBgSrc(backgrounds[0])
      }

      // Fade sección 2
      if (section2Ref.current) {
        const rect = section2Ref.current.getBoundingClientRect()
        let opacity = 1 - Math.max(0, (winH / 2 - rect.top) / winH)
        setFade2(Math.max(0, Math.min(1, opacity)))
        if (opacity > 0.5) setBgSrc(backgrounds[0])
      }

      // Fade sección 3
      if (section3Ref.current) {
        const rect = section3Ref.current.getBoundingClientRect()
        let opacity = 1 - Math.max(0, (winH / 2 - rect.top) / winH)
        setFade3(Math.max(0, Math.min(1, opacity)))
        if (opacity > 0.5) setBgSrc(backgrounds[0])
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="w-full relative">

      {/* -------- Hero (Sección 1) -------- */}
      <div
        ref={heroRef}
        className="fixed inset-0 z-0"
      >
        <img
          src="/Arte-Corona.svg"
          alt="Hero Background"
          className="object-cover w-[100vw] h-[100vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 
          -translate-y-1/2 opacity-20"
        />
      </div>
      
      {/* Fondo dinámico */}
      <div
        className="fixed inset-0 z-0 transition-all duration-500 object-cover w-full h-full"
        style={{
          backgroundImage: `url(${bgSrc.src})`,
          backgroundPosition: bgSrc.position,
          backgroundSize: bgSrc.size,
          backgroundRepeat: "no-repeat",
          opacity: bgSrc.opacity,
          pointerEvents: "none",
        }}
      ></div>

      {/* -------- Secciones 1 a 4 -------- */}
      <section
        ref={sectionInterRef}
        className="h-screen relative z-10 flex items-center justify-center"
        style={{
          opacity: fadeI,
          transform: `scale(${0.9 + fadeI * 0.1})`,
          transition: "opacity 0.2s linear, transform 0.2s linear",
        }}
      ></section>

      <section
        ref={section2Ref}
        className="h-screen relative z-10 flex items-center justify-center sm:p-12 md:p-9 lg:p-6"
        style={{
          transform: `scale(${0.9 + fade2 * 0.1})`,
          transition: "transform 0.1s ease-in-out",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-red-900/80 to-black/90"
          style={{
            opacity: 1,
            transition: "opacity 0.05s ease-in",
            zIndex: -1,
          }}
        ></div>
        <Activities />
      </section>

      <section
        ref={section3Ref}
        className="h-screen relative z-20 flex flex-col justify-center items-center text-center px-6"
        style={{
          transform: `scale(${0.9 + fade3 * 0.1})`,
          transition: "opacity 0.2s linear, transform 0.2s linear",
        }}
      >
         <div
          className="absolute inset-0 bg-gradient-to-b from-red-900/80 to-black/90"
          style={{
            opacity: 1,
            transition: "opacity 0.05s ease-in",
            zIndex: -1,
          }}
        ></div>
         <div className="max-w-2xl px-6 text-center text-white p-10 rounded-xl">
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-6">
            Información del Evento
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Únete a nosotros del <strong>15 al 17 de junio de 2025</strong> en el
            Centro de Convenciones. Tres días diseñados para fortalecer tu fe y
            conectarte con jóvenes de todo el mundo.
          </p>
          <p className="text-lg leading-relaxed">
            El evento incluye conferencias, talleres y momentos de adoración
            centrados en Cristo.
          </p>
        </div>
      </section>

      {/* -------- Sección 4 -------- */}
      <section className="h-screen relative z-30 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 to-black/90" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-6">
            Sé Parte del Cambio
          </h2>
          <p className="text-white text-lg max-w-2xl mb-10">
            Inscríbete ahora y vive una experiencia espiritual única junto a
            miles de jóvenes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold px-8 py-4 text-lg rounded-md">
              Inscríbete Ahora
            </Button>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold px-8 py-4 text-lg rounded-md"
            >
              Más Información
            </Button>
          </div>
        </div>
      </section>

      {/* -------- Footer -------- */}
      <footer className="bg-black py-20 flex items-center justify-center relative z-40">
        <p className="text-white text-xl">Fin del contenido parallax</p>
      </footer>
    </main>
  )
}
