"use client"

import Image from "next/image"

type Speaker = {
  name: string
  role: string
  img: string
  videoUrl: string
  sizeClass?: string 
}

const speakers: Speaker[] = [
  {
    name: "Juan Manuel Meza",
    role: "Expositor",
    img: "/speakers/juanManuelMeza.png",
    videoUrl: "https://www.facebook.com/share/v/1727zzUs1A/",
    sizeClass: "scale-95", // se ajusta un poco más pequeño
  },
  {
    name: "Erick Gamez",
    role: "Expositor",
    img: "/speakers/erickGamez.png",
    videoUrl: "https://www.facebook.com/share/v/16vLBSoWrV/",
    sizeClass: "scale-110", // lo hacemos más grande
  },
  {
    name: "Marvin Espinoza",
    role: "Expositor",
    img: "/speakers/MarvinEspinoza.png",
    videoUrl: "",
    sizeClass: "scale-200", // tamaño normal
  },
]

function SpeakerCard({ speaker }: { speaker: Speaker }) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-50 h-50 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full flex items-center justify-center overflow-hidden border-2 border-yellow-400/40">
          <Image
            src={speaker.img}
            alt={speaker.name}
            width={240}
            height={240}
            className={`object-contain p-2 grayscale hover:grayscale-0 hover:scale-105 transition-transform duration-300 ${speaker.sizeClass ?? ""}`}
          />
        </div>
        <a
          href={speaker.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-lg md:text-xl font-bold text-yellow-400 hover:underline"
        >
          {speaker.name}
        </a>
        <p className="text-white text-sm md:text-base">{speaker.role}</p>
      </div>
    )
  }
  

export default function SpeakersSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 text-center text-white py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-10">
        Nuestros Expositores
      </h2>
      <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-10">
        Prepárate para escuchar a personas que viven lo que enseñan. 
        Cada expositor viene con experiencias y mensajes que pueden 
        desafiar tu manera de ver la fe y motivarte a crecer. 
        ¡No te pierdas la oportunidad de conocerlos y ser parte de lo que Dios está haciendo!
     </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 justify-items-center text-center">
        {speakers.map((s, i) => (
          <SpeakerCard key={i} speaker={s} />
        ))}
      </div>
    </div>
  )
}