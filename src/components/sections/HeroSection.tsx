"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarMotif from "@/components/StarMotif";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageWrapperRef.current || !containerRef.current) return;

    const tl = gsap.timeline();

    // Reveal da Imagem: Efeito de zoom-out suave com remoção de blur
    tl.fromTo(
      imageWrapperRef.current,
      { scale: 1.2, opacity: 0, filter: "blur(20px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.2, ease: "expo.out" }
    );

    // Parallax: A imagem sobe mais devagar que o scroll
    gsap.to(imageWrapperRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* 1. IMAGEM CENTRALIZADA (Sem cortes) */}
      <div 
        ref={imageWrapperRef} 
        className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-12"
      >
        <div className="relative aspect-1265/1244 h-full max-h-[85vh] w-auto">
          <Image
            src="/images/1-hero.png"
            alt="Júlia Tattoo"
            fill
            priority
            className="object-contain grayscale-15 brightness-90 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          />
          {/* Overlay sutil para garantir que o texto seja lido onde sobrepõe */}
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
        </div>
      </div>

      {/* 2. TEXTO À ESQUERDA COM OVERLAP E ANIMAÇÃO HANDWRITTEN */}
      <div className="absolute inset-0 z-20 container mx-auto px-6 md:px-2 flex flex-col justify-center pointer-events-none">
        <div className="flex flex-col items-start gap-4 md:gap-4">
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="font-display handwritten-text text-white font-normal leading-[0.8] flex flex-col"
          >
            <span className="text-[14vw] md:text-[8vw] tracking-[-0.06em]">
              OI, EU SOU
            </span><br></br>
            <span className="text-[16vw] md:text-[10vw] tracking-[-0.04em]">
              A JÚLIA
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-2 md:mt-4 ml-4"
          >
            <span className="font-sans font-extralight italic text-[5vw] md:text-[2vw] tracking-[0.3em] text-white">
              (OU XULIA)
            </span>
          </motion.div>
        </div>
      </div>

      {/* 3. ELEMENTOS DE APOIO (Estrela e Scroll) */}
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 z-30">
        <StarMotif className="w-12 h-12 md:w-20 md:h-20 opacity-40 animate-[spin_10s_linear_infinite]" />
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30 z-30">
        <div className="w-px h-12 bg-white/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white origin-top animate-scroll-line" />
        </div>
      </div>


    </section>
  );
}