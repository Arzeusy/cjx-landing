"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Activities from "@/components/section/activities"
import SpeakersSection from "@/components/section/speakers"
import Hospedaje from "@/components/section/hotels"
import InscripcionSection from "@/components/section/InscripcionSection"
import Footer from "@/components/section/footer"
import GalaEvent from "@/components/section/gala"
// import CTAButton from "@/components/ui/CTAbutton"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionInterRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const section4Ref = useRef<HTMLDivElement>(null)
  const section5Ref = useRef<HTMLDivElement>(null)

  const backgrounds = [
    {
      src: "/letras_1.svg",
      opacity: 0.7,
      position: "center",
      size: "contain",
    },
  ]
  
  const [mounted, setMounted] = useState(false)
  const [fadeI, setFadeI] = useState(1)
  const [fade2, setFade2] = useState(1)
  const [fade3, setFade3] = useState(1)
  const [fade4, setFade4] = useState(1)
  const [fade5, setFade5] = useState(1)
  const [bgSrc, setBgSrc] = useState(backgrounds[0]) // Fondo inicial

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      const winH = window.innerHeight

      // Fade sección inter
      if (sectionInterRef.current) {
        const rect = sectionInterRef.current.getBoundingClientRect()
        const opacity = 1 - Math.max(0, (winH / 2 - rect.top) / winH)
        setFadeI(Math.max(0, Math.min(1, opacity)))
        if (opacity > 0.5) setBgSrc(backgrounds[0])
      }

      // Fade sección 2
      if (section2Ref.current) {
        const rect = section2Ref.current.getBoundingClientRect()
        const opacity2 = 1 - Math.max(0, (winH / 2 - rect.top) / winH)
        setFade2(Math.max(0, Math.min(1, opacity2)))
        if (opacity2 > 0.5) setBgSrc(backgrounds[0])
      }

      // Fade sección 3
      if (section3Ref.current) {
        const rect = section3Ref.current.getBoundingClientRect()
        const opacity3 = 1 - Math.max(0, (winH / 2 - rect.top) / winH)
        setFade3(Math.max(0, Math.min(1, opacity3)))
        if (opacity3 > 0.5) setBgSrc(backgrounds[0])
      }

      if (section4Ref.current) {
        const rect = section4Ref.current.getBoundingClientRect()
        const opacity4 = 1 - Math.max(0, (winH / 2 - rect.top) / winH)
        setFade4(Math.max(0, Math.min(1, opacity4)))
        if (opacity4 > 0.5) setBgSrc(backgrounds[0])
      }

      if (section5Ref.current) {
        const rect = section5Ref.current.getBoundingClientRect()
        const opacity5 = 1 - Math.max(0, (winH / 2 - rect.top) / winH)
        setFade5(Math.max(0, Math.min(1, opacity5)))
        if (opacity5 > 0.5) setBgSrc(backgrounds[0])
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll, { passive: true })
      handleScroll()
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [backgrounds, mounted])

  return (
    <main className="w-full relative">

      {/* -------- Hero (Sección 1) -------- */}
      <div
        ref={heroRef}
        className="fixed inset-0 z-0 w-screen h-min-screen"
      >
        <Image
          src="/Arte-Corona.svg"
          alt="Hero Background"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2
          -translate-y-1/2 opacity-20 object-cover sm:object-contain w-full h-full"
          width={1920}
          height={1080}
          priority
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
        className="min-h-screen  relative z-10 flex items-center justify-center"
        style={{
          opacity: fadeI,
          transform: `scale(${0.9 + fadeI * 0.1})`,
          transition: "opacity 0.2s linear, transform 0.2s linear",
        }}
      ></section>

      <section
        ref={section2Ref}
        className="min-h-screen  relative z-10 flex items-center justify-center py-6 sm:p-12 md:p-9 lg:p-6"
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
        ref={section5Ref}
        className="min-h-screen  relative z-20 flex flex-col justify-center items-center text-center px-6"
        style={{
          transform: `scale(${0.9 + fade5 * 0.1})`,
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
          <GalaEvent />
      </section>

      <section
        ref={section3Ref}
        className="min-h-screen  relative z-20 flex flex-col justify-center items-center text-center px-6"
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
        <SpeakersSection />
      </section>

      <section
        ref={section4Ref}
        className="min-h-screen  relative z-20 flex flex-col justify-center items-center text-center px-6"
        style={{
          transform: `scale(${0.9 + fade4 * 0.1})`,
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
        <Hospedaje />
      </section>


 

      {/* -------- Sección lts -------- */}
      <section className="relative z-30 overflow-hidden "> 
        {/* el pb-20 asegura el mismo espacio que el footer (py-20) */}
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 to-black/90" />
        </div>

        {/* Contenido visible */}
        <div className="relative z-10 pt-[14vh] pb-[20vh]">
          <InscripcionSection />
        </div>
      </section>

      {/* -------- Footer -------- */}
      <Footer />
    </main>
  )
}
