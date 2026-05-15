"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Isomorphic effect para rodar sincronamente no client (evita flash) e não dar erro no SSR
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function OrnamentSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Perspective para a sensação de profundidade 3D (Z-Axis)
      gsap.set(containerRef.current, { perspective: 1000 });

      // Estado inicial do Background com force3D para performance
      gsap.set(bgRef.current, { filter: "brightness(1)", scale: 1, force3D: true });

      // Estado inicial dos textos (Já vêm com opacity-0 do Tailwind para evitar flicker)
      gsap.set(text1Ref.current, { y: 50, scale: 1, force3D: true });
      gsap.set(text2Ref.current, { y: 50, scale: 1, force3D: true });
      gsap.set(text3Ref.current, { z: -500, scale: 0.5, y: 50, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350%", // Extensão maior para garantir o tempo de leitura
          pin: true,
          pinSpacing: true, // Garante que a próxima seção seja empurrada para baixo corretamente
          scrub: 1,
        }
      });

      // A Timeline inteira vai durar 13 segundos lógicos

      // 1. O Background: Permanece animando por toda a extensão principal
      tl.to(bgRef.current, {
        scale: 1.1,
        filter: "brightness(0.5)",
        ease: "none",
        duration: 13,
        force3D: true,
      }, 0);

      // --- Sequenciamento de Camadas com Tempos Explícitos ---

      // Frase 1: Entrada
      tl.to(text1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      }, 1);

      // Frase 1: Pausa e Saída (Focus & Scale)
      tl.to(text1Ref.current, {
        scale: 1.15,
        opacity: 0,
        y: -30,
        duration: 1.5,
        ease: "power2.inOut"
      }, 3.5); // Sai no 3.5, termina no 5.0

      // Frase 2: Entrada
      tl.to(text2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      }, 4.5); // Começa antes da Frase 1 sumir completamente, atinge 100% no 6.0

      // Frase 2: Pausa e Saída (Focus & Scale)
      tl.to(text2Ref.current, {
        scale: 1.15,
        opacity: 0,
        y: -30,
        duration: 1.5,
        ease: "power2.inOut"
      }, 6.5); // Termina no 8.0

      // Frase 3: O "PORÉM" (Entra com grande impacto)
      tl.to(text3Ref.current, {
        opacity: 1,
        z: 0,
        scale: 1.2,
        y: 0,
        duration: 2,
        ease: "power3.out",
      }, 7.5); // Começa no 7.5, atinge o clímax no 9.5

      // O Buffer de Saída (Crucial)
      // Força o ScrollTrigger a manter o pin travado por mais tempo após o "PORÉM" aparecer, 
      // criando uma transição calma para o Carrossel (DualitySection) que vem logo abaixo.
      tl.to({}, { duration: 3.5 }, 9.5); // A timeline total agora vai exatamente até 13.0

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">

      {/* 1. BACKGROUND ESTÁTICO (QUALIDADE TOTAL) - transform-gpu para evitar flickering */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full z-0 origin-center transform-gpu will-change-transform">
        <Image
          src="/images/3-ornamento.png"
          alt="Tatuagem Ornamental"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,black_100%)] opacity-80" />
      </div>

      {/* 2. LAYOUT BLOCKADO NOS CANTOS */}
      <div
        className="relative z-20 w-full h-full p-8 md:p-16 pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >

        {/* FRASE 1: CANTO SUPERIOR ESQUERDO */}
        <div
          className="absolute top-10 left-8 md:top-16 md:left-16 max-w-[80%]"
          style={{ transform: 'rotate(-1.5deg)' }}
        >
          <div ref={text1Ref} className="opacity-0">
            <h2 className="font-display text-[8vw] md:text-[4vw] text-white leading-[0.85] uppercase drop-shadow-2xl">
              GOSTO MUITO DE <br />
              <span className="text-transparent stroke-text">ADICIONAR ORNAMENTOS</span> <br />
              NOS MEUS PROJETOS...
            </h2>
          </div>
        </div>

        {/* FRASE 2: CANTO INFERIOR ESQUERDO */}
        <div
          className="absolute bottom-24 left-8 md:bottom-28 md:left-16 max-w-xl"
          style={{ transform: 'rotate(1deg)' }}
        >
          <div ref={text2Ref} className="opacity-0">
            <h2 className="font-display text-[7vw] md:text-[3.5vw] text-white leading-[0.9] uppercase drop-shadow-2xl">
              ALÉM DE UMA GRANDE <br /> 
              VARIAÇÃO DE <span className="text-transparent stroke-text">TRAÇOS...</span>
            </h2>
          </div>
        </div>

        {/* FRASE 3: CANTO INFERIOR DIREITO */}
        <div
          className="absolute bottom-10 right-8 md:bottom-16 md:right-16"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <div ref={text3Ref} className="opacity-0">
            <h3 className="font-display text-[14vw] md:text-[6.8vw] text-white/88 uppercase tracking-tighter leading-none">
              PORÉM
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}