"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarMotif from "@/components/StarMotif";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function FinalCTASection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgFrameRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const starTopRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !bgFrameRef.current || !text1Ref.current || !text2Ref.current || !ctaButtonRef.current || !starTopRef.current) return;

    let ctx = gsap.context(() => {
      // 1. SETUP INICIAL: Controlando a rotação estritamente pelo GSAP para evitar conflitos
      gsap.set(bgFrameRef.current, { scale: 1.2, opacity: 0 });
      gsap.set(text1Ref.current, { opacity: 0, scale: 0.85, x: -60, rotation: -32 });
      gsap.set(text2Ref.current, { opacity: 0, scale: 0.9, y: 40 });
      gsap.set(ctaButtonRef.current, { opacity: 0, y: 30 });
      gsap.set(starTopRef.current, { opacity: 0, scale: 0, rotation: -45 });

      // 2. TIMELINE COM CRONOGRAMA SINCRONIZADO
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        }
      });

      tl.to(bgFrameRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: "power3.inOut"
      }, 0);

      // Mantém os -32deg perfeitamente alinhados com o braço na animação
      tl.to(text1Ref.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1,
        ease: "back.out(1.1)"
      }, 0.6);

      tl.to(starTopRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, 0.9);

      tl.to(text2Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out"
      }, 1.2);

      tl.to(ctaButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, 1.6);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
    >

      {/* FRAME DA IMAGEM CENTRALIZADA */}
      <div
        ref={bgFrameRef}
        className="absolute w-[100vw] h-[60vh] sm:h-[65vh] md:w-[80vw] md:h-[85vh] bg-[#050505] overflow-hidden rounded-sm z-0 transform-gpu"
      >
        <Image
          src="/images/7-final.png"
          alt="Tatuagem Lettering Original"
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover object-center transform-gpu"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* CAMADA INTERATIVA DE TEXTOS COM MAX-W PARA TRAVAR EM TELAS GIGANTES */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto pointer-events-none">

        {/* TEXTO 1: TOP LEFT (Removido a rotação física do Tailwind para casar com o GSAP) */}
        <div
          ref={text1Ref}
          className="absolute top-[24%] sm:top-[22%] md:top-[16%] left-[4%] md:left-[5%] origin-center z-20 will-change-transform"
        >
          <h2
            className="font-display font-black text-[7vw] sm:text-[6vw] md:text-[3.5vw] lg:text-[3.8rem] text-white uppercase leading-[0.9] tracking-tight text-left sticker-shadow-lg selection:bg-white selection:text-black"
          >
            Bora tirar tua <br />
            ideia do papel?
          </h2>
        </div>

        {/* ESTRELA IDÊNTICA AO DO POST DO INSTAGRAM */}
        <div
          ref={starTopRef}
          className="absolute bottom-[38%] sm:bottom-[36%] md:bottom-[22%] left-[12%] md:left-[14%] z-10"
        >
          <StarMotif className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]" />
        </div>

        {/* TEXTO 2: BOTTOM RIGHT */}
        <div
          ref={text2Ref}
          className="absolute bottom-[30%] sm:bottom-[28%] md:bottom-[15%] right-[4%] md:right-[6%] z-20"
        >
          <h2
            className="font-display font-black text-[6vw] sm:text-[5.5vw] md:text-[3vw] lg:text-[3.2rem] text-white uppercase leading-[0.95] tracking-tight text-right sticker-shadow-lg"
          >
            A vida é curta <br />
            demais pra não <br />
            se tatuar!
          </h2>
        </div>

        {/* BOTÃO CTA: CENTRO INFERIOR */}
        <div
          ref={ctaButtonRef}
          className="absolute bottom-[6%] sm:bottom-[8%] md:bottom-[6%] left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
        >
          <a
            href="https://wa.me/5551985009184?text=Oi%20Xulia%2C%20vim%20do%20seu%20site%20e%20gostaria%20de%20fazer%20um%20or%C3%A7amento!"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-10 sm:px-14 md:px-24 py-3 sm:py-4 md:py-6 bg-black/40 backdrop-blur-sm text-white border-2 border-white font-sans font-black text-xs sm:text-sm md:text-lg uppercase tracking-widest overflow-hidden transition-all duration-500 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
            data-magnetic="true"
          >
            <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] z-0" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Agendar Sessão
            </span>
          </a>
        </div>

      </div>

    </section>
  );
}