"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function StarMotif({ className = "" }: { className?: string }) {
  const starRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Simple continuous rotation
    if (starRef.current) {
      gsap.to(starRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    }
  }, []);

  return (
    <svg
      ref={starRef}
      className={`w-12 h-12 text-white ${className}`}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 0 L55 40 L95 20 L65 50 L95 80 L55 60 L50 100 L45 60 L5 80 L35 50 L5 20 L45 40 Z" />
    </svg>
  );
}
