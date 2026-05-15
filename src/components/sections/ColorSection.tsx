"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarMotif from "@/components/StarMotif";

gsap.registerPlugin(ScrollTrigger);

export default function ColorSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !bgRef.current) return;

    gsap.fromTo(
      bgRef.current,
      { filter: "grayscale(100%)", opacity: 0.5 },
      {
        filter: "grayscale(0%)",
        opacity: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "center center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        {/* Using placeholder for color mushroom tattoo */}
        <img 
          src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2000" 
          alt="Tatuagem com Cor" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-32">
        <div ref={textRef} className="max-w-2xl flex flex-col items-start space-y-8">
          <StarMotif className="w-12 h-12" />
          <h2 className="font-sans font-bold text-4xl md:text-6xl text-white uppercase tracking-wide leading-tight drop-shadow-lg">
            E uma <span className="text-[#ff4040]">corzinha</span> no projeto <br/>
            vai ser sempre <br/>
            <span className="font-playfair italic font-normal text-gray-200 lowercase">bem vinda!</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
