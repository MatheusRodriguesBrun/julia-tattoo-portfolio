"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animação do Título: Linha por linha
    const titleLines = titleRef.current?.querySelectorAll(".line-inner");
    if (titleLines) {
      tl.fromTo(
        titleLines,
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" }
      );
    }

    // Animação da Imagem: Slide lateral com escala
    tl.fromTo(
      imageRef.current,
      { x: 100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" },
      "-=1"
    );

    // Animação do parágrafo de apoio
    tl.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-20 overflow-hidden"
    >
      {/* LADO ESQUERDO: TEXTOS */}
      <div className="w-full md:w-1/2 z-20">
        <h2
          ref={titleRef}
          className="handwritten-text text-white font-normal leading-[1.1] flex flex-col"
        >
          <div className="overflow-hidden py-1">
            <span className="line-inner inline-block text-[12vw] md:text-[7vw] tracking-tight">
              SOU
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="line-inner inline-block text-[12vw] md:text-[7vw] tracking-tight">
              TATUADORA
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="line-inner inline-block text-[12vw] md:text-[7vw] tracking-tight text-gray-400">
              HÁ 5 ANOS...
            </span>
          </div>
        </h2>

        <p
          ref={textRef}
          className="mt-12 max-w-xl font-sans font-extralight italic text-[5vw] md:text-[2vw] tracking-[0.1em] text-white leading-relaxed uppercase"
        >
          Trabalho com projetos autorais, pensados única e exclusivamente 
          para cada pessoa, respeitando a anatomia e a história de cada pele.
        </p>
      </div>

      {/* LADO DIREITO: IMAGEM COM MOLDURA EDITORIAL */}
      <div 
        ref={imageRef}
        className="w-full md:w-[40%] mt-16 md:mt-0 relative"
      >
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-sm grayscale-[20%] hover:grayscale-0 transition-all duration-1000 shadow-2xl">
          <Image
            src="/images/2-about.png"
            alt="Júlia em ação"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Detalhe estético: Número de anos flutuando */}
        <div className="absolute -bottom-10 -left-10 hidden md:block">
          <span className="handwritten-text text-[15vw] text-white opacity-[0.03] select-none">
            05
          </span>
        </div>
      </div>


    </section>
  );
}