"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Image as ImageIcon, Phone } from "lucide-react"

export default function Hospedaje() {
  const hoteles = [
    {
      nombre: "Hotel El Angel ",
      fotos: "https://drive.google.com/drive/folders/1YZ7D1_krSuSzt7gY4CPmsRjlmX85dLem?usp=sharing", // link al drive
      ubicacion:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d964.0977386993209!2d-91.5196358!3d14.8594016!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858ea3ee6e8210a7%3A0x68d62eeb99a13292!2sHOTEL%20EL%20ANGEL.!5e0!3m2!1ses!2sgt!4v1756507428666!5m2!1ses!2sgt", // link embed
        link: "https://maps.app.goo.gl/rKo9aZuFRN3KoSh98", // link embed

    },
    {
      nombre: "Hotel Guadalupe",
      fotos: "https://drive.google.com/drive/folders/1vkKWtsogexnfRXuVirxGAo1qPFq0x3rZ?usp=drive_link", // link al drive
      ubicacion:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d964.0977909335837!2d-91.5199836!3d14.8593899!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858ea2a09634a969%3A0x6b6a821a726837be!2sHotel%20Guadalupe!5e0!3m2!1ses!2sgt!4v1756507303046!5m2!1ses!2sgt",
       link: "https://maps.app.goo.gl/HekErAekWapYMD7MA", // link embed
    },
  ]

  return (
    <section className="w-full px-4 py-12  text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-10">
        Hoteles y Hospedaje
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {hoteles.map((hotel, i) => (
          <Card
            key={i}
            className="bg-gradient-to-b from-red-900/80 to-black/90 border border-yellow-500 text-white rounded-2xl shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {hotel.nombre}
              </CardTitle>
              <CardDescription>
                <a
                  href={hotel.fotos}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline flex items-center gap-1"
                >
                  <ImageIcon className="w-5 h-5" /> Ver Fotos
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full rounded-lg overflow-hidden">              
                <iframe
                    src={hotel.ubicacion}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>
              <div className="mt-4 flex justify-center">
                <a
                  href={hotel.ubicacion.replace("embed?", "")} // link directo en maps
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellow-400 hover:underline"
                >
                  <MapPin className="w-5 h-5" /> Ver Ubicación
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contacto */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-2">Contacto de Hospedaje</h3>
        <p className="flex justify-center items-center gap-2 text-yellow-400">
          <Phone className="w-5 h-5" />
          Rony Herrera:{" "}
          <a
            href="tel:+50246808631"
            className="underline hover:text-yellow-300"
          >
            +502 4680 8631
          </a>
        </p>
      </div>
    </section>
  )
}
