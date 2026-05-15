"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarMotif from "@/components/StarMotif";

gsap.registerPlugin(ScrollTrigger);

export default function DelicateSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef1.current || !textRef2.current || !imageRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    tl.fromTo(textRef1.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0 })
      .fromTo(imageRef.current, { opacity: 0, scale: 0.9, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)" }, "-=0.2")
      .fromTo(textRef2.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=0.2");
      
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-[#0c0c0c] flex items-center justify-center py-24">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="flex flex-col space-y-16 order-2 lg:order-1">
          <h2 ref={textRef1} className="font-sans font-bold text-3xl md:text-5xl text-white uppercase tracking-wide leading-snug">
            Também faço (e amo) <br/>
            <span className="font-playfair lowercase italic font-normal text-gray-400">projetinhos mais delicados e sutis...</span>
          </h2>
          
          <h2 ref={textRef2} className="font-sans font-bold text-3xl md:text-5xl text-white uppercase tracking-wide leading-snug">
            Tudo depende da <br/>
            sua intenção com <br/>
            <span className="font-playfair lowercase italic font-normal text-gray-400">aquela tattoo...</span>
          </h2>
          
          <StarMotif className="w-16 h-16 ml-8" />
        </div>

        <div ref={imageRef} className="relative w-full aspect-square lg:aspect-4/5 overflow-hidden rounded-sm order-1 lg:order-2 group">
           <Image
            src="/images/4-delicate.png"
            alt="Tattoo Delicada"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
        </div>

      </div>
    </section>
  );
}
