"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import InscriptionModal, { FormDataType } from "@/components/form/inscriptionModal";

export default function CTAButton() {
    const [open, setOpen] = useState(false);
    
    const handleFormSubmit = (data: FormDataType) => {
        // 🔥 Aquí podrías enviar a Firebase / Supabase
    };
  return (
     <div className="absolute top-6 right-6 z-30">
        <Button
            className="bg-purple-800 hover:bg-purple-500 text-white font-bold px-8 py-4 text-lg rounded-md"
            onClick={() => setOpen(true)}
          >
            Inscríbete Ahora
        </Button>
        <InscriptionModal open={open} setOpen={setOpen} onSubmit={handleFormSubmit} />
        
    </div>
  )
}
