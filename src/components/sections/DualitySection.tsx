"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarMotif from "@/components/StarMotif";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function DualitySection() {
  const containerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const starRightRef = useRef<HTMLDivElement>(null);
  const starLeftRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Estado Inicial
      gsap.set(img1Ref.current, { scale: 1.1, force3D: true });
      gsap.set(img2Ref.current, { y: "-100%", force3D: true });
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { y: 40, force3D: true });
      gsap.set([starRightRef.current, starLeftRef.current], { opacity: 0, scale: 0, rotation: -90, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // PHASE 1: Entrada do Gatinho
      tl.to(img1Ref.current, { opacity: 1, scale: 1, duration: 3, ease: "power2.out" }, 0.2);

      // PHASE 2: Textos Iniciais e Estrela na Direita
      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 2 }, 1.5)
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 2 }, 2.5)
        .to(starRightRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 2, ease: "back.out(1.5)" }, 2.5);

      // PHASE 3: Limpeza Completa (inclusive a estrela)
      tl.to([text1Ref.current, text2Ref.current, starRightRef.current], { opacity: 0, y: -30, duration: 2 }, 5.5);

      // PHASE 4: A Queda da Foto Colorida
      tl.to(img2Ref.current, { 
        y: "0%", 
        duration: 7, 
        ease: "none",
        immediateRender: false
      }, 6.5);

      // PHASE 5: Texto Final Colorido e Estrela na Esquerda
      tl.to(text3Ref.current, { opacity: 1, y: 0, duration: 3 }, 14)
        .to(starLeftRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 3, ease: "back.out(1.5)" }, 14.5);

      // HOLD FINAL
      tl.to({}, { duration: 4 });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* FRAME CONTIDO */}
      <div 
        ref={frameRef}
        className="relative w-[85vw] h-[60vh] md:w-[50vw] md:h-[75vh] bg-[#0a0a0a] overflow-hidden rounded-sm border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.9)] z-10"
      >
        <div ref={img1Ref} className="absolute inset-0 w-full h-full opacity-0">
          <Image
            src="/images/4-delicate.png" 
            alt="Tatuagem Gato"
            fill
            sizes="(max-width: 768px) 85vw, 50vw"
            className="object-cover brightness-[0.75]"
            priority
          />
        </div>

        <div ref={img2Ref} className="absolute inset-0 w-full h-full">
          <Image
            src="/images/5-color.png" 
            alt="Tatuagem Cogumelo"
            fill
            sizes="(max-width: 768px) 85vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* CAMADA INTERATIVA: TEXTOS E ESTRELAS */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none p-10 md:p-24 font-display">
        
        {/* ESTRELA DA DIREITA (Com o Gato) */}
        <div 
          ref={starRightRef}
          className="absolute top-[35%] right-[10%] md:top-[40%] md:right-[15%] z-10"
        >
          <StarMotif className="w-14 h-14 md:w-24 md:h-24 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]" />
        </div>

        {/* ESTRELA DA ESQUERDA (Com o Colorido) */}
        <div 
          ref={starLeftRef}
          className="absolute bottom-[25%] left-[10%] md:bottom-[30%] md:left-[15%] z-10"
        >
          <StarMotif className="w-14 h-14 md:w-24 md:h-24 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]" />
        </div>

        {/* TEXTO 1: TOP LEFT */}
        <div ref={text1Ref} className="absolute top-10 left-10 md:top-30 md:left-45 max-w-sm opacity-0">
          <h2 className="text-[6vw] md:text-[2.6vw] text-white font-black uppercase leading-[0.9] tracking-tight sticker-shadow-md">
            Também faço (e amo) <br />
            projetinhos mais <br />
            delicados e sutis...
          </h2>
        </div>

        {/* TEXTO 2: BOTTOM LEFT */}
        <div ref={text2Ref} className="absolute bottom-10 left-10 md:bottom-23 md:left-65 max-w-sm opacity-0">
          <h2 className="text-[6vw] md:text-[2.6vw] text-white font-black uppercase leading-[0.9] tracking-tight sticker-shadow-md">
            Tudo depende da sua <br /> 
            intenção com <br />
            aquela tattoo...
          </h2>
        </div>

        {/* TEXTO 3: BOTTOM RIGHT */}
        <div ref={text3Ref} className="absolute bottom-10 right-10 md:bottom-23 md:right-20 text-right opacity-0">
          <h3 className="text-[8vw] md:text-[4.2vw] text-white font-black uppercase leading-[0.85] tracking-tighter sticker-shadow-md">
            E uma corzinha <br />
            no projeto vai ser <br />
            sempre bem vinda!
          </h3>
        </div>

      </div>
    </section>
  );
}