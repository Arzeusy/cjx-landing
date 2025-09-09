import React from "react";
import { Camera, Star } from "lucide-react";
import Image from "next/image";

interface TicketProps {
  formData?: {
    nombre?: string;
    ubicacion?: string;
    edad?: string;
    acompanantes?: string;
    idc?: string;
    telefono?: string;
    correo?: string;
  };
  ticketNumber?: string;
  isGenerated?: boolean;
}

const TicketPreview: React.FC<TicketProps> = ({ 
  formData = {}, 
  ticketNumber = "",
  isGenerated = false 
}) => {
  // Fecha actual formateada
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const displayTicketNumber = isGenerated ? ticketNumber : "XXXX";

  return (
    <div className="flex justify-center items-center px-4">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden border border-background">
        
        {/* Encabezado rojo */}
        <div className="bg-gradient-to-b from-red-900/80 to-black/90 text-white z-30 px-6 py-3 relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold tracking-wide">EN MEMORIA DE MI</div>
              <div className="text-xs font-medium">CONFERENCIA JUVENIL</div>
            </div>
               {isGenerated && ticketNumber ? ticketNumber : "XXXXXXX"}
          </div>
          
          {/* Perforaciones semicirculares en el borde inferior */}
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-white rounded-full mx-0.5 opacity-90" />
            ))}
          </div>
        </div>

        {/* Contenido principal beige */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 px-6 py-4 relative">
          
          {/* Código de barras */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="text-xs font-mono text-gray-800">
                {isGenerated && ticketNumber ? ticketNumber : "XXXXXXXXXXXX"}
              </div>
            </div>
            
            {/* Ícono de cámara con borde */}
            <div className=" absolute right-3 p-2 ml-4 mr-8">
                  <Image
                    src="/corona.ico"
                    alt="corona"
                    width={100}
                    height={100}
                    className="w-40 h-40"
                  />
            </div>
          </div>

          {/* Información del participante sin títulos */}
          <div className="space-y-1/2 text-base mb-8">
            <div className="font-bold text-gray-900">
              {formData?.nombre || "------"}
            </div>
            
            <div className="font-bold text-gray-900">
              {formData?.idc || "------"}
            </div>
            
            <div className="font-bold text-gray-900">
              {formData?.telefono || "--"}
            </div>
            
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-2">acompañantes:</span>
              <span className="font-bold text-gray-900">{formData?.acompanantes || "0"}</span>
            </div>
          </div>

        </div>

        {/* Sección lateral derecha roja - extendida a todo el largo */}
        <div className="absolute z-10 top-0 right-0 bottom-0 w-12 bg-gradient-to-b from-red-900/100 to-black/90 flex flex-col items-center justify-center">
          <div className="transform -rotate-90 text-white text-xs font-semibold whitespace-nowrap">
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
          </div>
        </div>

        {/* Perforaciones circulares en los lados */}
        <div className="absolute z-20 top-1/2 -left-3 w-6 h-7 bg-background rounded-full transform -translate-y-1/2 " />
        <div className="absolute z-20 top-1/2 -right-3 w-6 h-7 bg-background rounded-full transform -translate-y-1/2 " />
      </div>
    </div>
  );
};

export default TicketPreview;