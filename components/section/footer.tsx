import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black py-20 flex items-center justify-between px-8 relative z-40">
      {/* Imagen izquierda */}
      <Image
        src="/conjuvexWhite.svg"
        alt="Decoración izquierda"
        width={48}   // ajusta a tu tamaño
        height={48}
        className="h-16 w-auto"
      />

      {/* Texto centrado (flex entre imágenes) */}
      <p className="text-white text-xl text-center">
        Conferencias Juveniles | Xela
      </p>

      {/* Imagen derecha */}
      <Image
        src="/TrueKingdom.svg"
        alt="Decoración derecha"
        width={48}
        height={48}
        className="h-12 w-auto"
      />
    </footer>
  );
}
