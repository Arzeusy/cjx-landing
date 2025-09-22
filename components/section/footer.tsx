import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; 
import Autoplay from "embla-carousel-autoplay";

export default function Footer() {
  return (
    <>
      {/* ===== Desktop / tablet ===== */}
      <footer className="hidden sm:flex bg-black py-20 items-center justify-between px-8 relative z-40">
        <Image
          src="/conjuvexWhite.svg"
          alt="Decoración izquierda"
          width={48}
          height={48}
          className="h-16 w-auto"
        />
        <p className="text-white text-xl text-center">
          Conferencias Juveniles | Xela
        </p>
        <Image
          src="/TrueKingdom.svg"
          alt="Decoración derecha"
          width={48}
          height={48}
          className="h-12 w-auto"
        />
      </footer>

      {/* ===== Mobile (≤ 600px) ===== */}
      <footer className="sm:hidden bg-black py-10 flex justify-center relative z-40">
         <Carousel
            className="w-full max-w-xs"
            plugins={[
                Autoplay({
                    delay: 3000, // 3 segundos entre slides
                    stopOnInteraction: false, // sigue aunque el usuario toque
                }),
            ]}
            opts={{
                loop: true, // <- Permite el bucle infinito
            }}
        >
          <CarouselContent>
            <CarouselItem className="flex justify-center">
              <Image src="/conjuvexWhite.svg" alt="" width={80} height={80} className="h-15 w-auto" />
            </CarouselItem>
            <CarouselItem className="flex justify-center">
              <p className="text-white text-xl text-center px-4">
                Conferencias Juveniles | Xela
              </p>
            </CarouselItem>
            <CarouselItem className="flex justify-center">
              <Image src="/TrueKingdom.svg" alt="" width={80} height={80}  className="h-15 w-auto"/>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </Carousel>
      </footer>
    </>
  );
}
