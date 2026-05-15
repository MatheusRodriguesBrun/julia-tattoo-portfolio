"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarMotif from "@/components/StarMotif";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "5551985009184"; 

const cities = [
  { 
    name: "Gravataí", 
    link: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Oi Xulia, vim do seu site e gostaria de fazer um orçamento para atendimento em Gravataí.")}`
  },
  { 
    name: "Porto Alegre", 
    link: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Oi Xulia, vim do seu site e gostaria de fazer um orçamento para atendimento em Porto Alegre.")}`
  },
  { 
    name: "Canoas", 
    link: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Oi Xulia, vim do seu site e gostaria de fazer um orçamento para atendimento em Canoas.")}`
  },
  { 
    name: "Florianópolis", 
    link: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Oi Xulia, vim do seu site e gostaria de fazer um orçamento para atendimento em Florianópolis.")}`
  },
];

export default function LocationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hoverImgRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      textRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoverImgRef.current && hoveredIndex !== null) {
        gsap.to(hoverImgRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredIndex]);

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-[#080808] flex flex-col items-center justify-center py-24 relative overflow-hidden">
      
      {/* IMAGEM DE FUNDO FIXA (6-location.png) */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/6-location.png"
          alt="Background Localização"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Overlay escuro sutil para garantir contraste do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
      </div>

      {/* Imagem Seguidora do Mouse (Mantida caso queira usar imagens por cidade no futuro) */}
      <div 
        ref={hoverImgRef}
        className={`fixed top-0 left-0 w-64 h-80 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[40%_60%_70%_30%] transition-opacity duration-500 mix-blend-screen grayscale ${hoveredIndex !== null ? 'opacity-50' : 'opacity-0'}`}
      >
        {hoveredIndex !== null && (cities[hoveredIndex] as any).image && (
          <Image
            src={(cities[hoveredIndex] as any).image}
            alt={cities[hoveredIndex].name}
            fill
            sizes="256px"
            className="object-cover scale-110"
          />
        )}
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div ref={textRef} className="flex flex-col items-center justify-center space-y-16 z-20 w-full">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-white uppercase tracking-tighter leading-[0.9] text-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
          Posso te atender em
        </h2>
        
        <ul className="space-y-4 w-full max-w-2xl px-6">
          {cities.map((city, idx) => (
            <li 
              key={idx} 
              className="border-b border-white/10 pb-4"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a 
                href={city.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full cursor-pointer select-none"
                data-magnetic="true"
              >
                <span className="font-display text-4xl md:text-7xl text-gray-400 font-light group-hover:text-white transition-all duration-300 group-hover:translate-x-4 drop-shadow-md uppercase tracking-tight">
                  {city.name}
                </span>
                <StarMotif className="w-8 h-8 md:w-10 md:h-10 text-gray-600 transition-all duration-500 group-hover:text-white group-hover:rotate-180 group-hover:scale-125" />
              </a>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}