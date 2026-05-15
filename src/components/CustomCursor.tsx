"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import StarMotif from "./StarMotif";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Esconder o cursor padrão no body
    document.body.style.cursor = "none";
    
    // Fallback para dispositivos touch
    if (window.matchMedia("(pointer: coarse)").matches) {
      document.body.style.cursor = "auto";
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // quickTo is highly optimized for mouse movements
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    let isMagnetic = false;
    let targetRect: DOMRect | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (isHidden) setIsHidden(false);
      
      if (isMagnetic && targetRect) {
        // Magnetic pull effect
        const centerX = targetRect.left + targetRect.width / 2;
        const centerY = targetRect.top + targetRect.height / 2;
        
        // Puxa o cursor em direção ao centro do elemento, mas não exatamente no centro,
        // dependendo de onde o mouse real está (efeito magnético sutil)
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        xTo(centerX + distanceX * 0.2);
        yTo(centerY + distanceY * 0.2);
      } else {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);

    // Setup hover listeners for interactive elements
    const updateHoverElements = () => {
      const interactives = document.querySelectorAll("a, button, input, textarea, select, [data-magnetic]");
      
      interactives.forEach((el) => {
        // Evita múltiplos listeners
        if (el.getAttribute("data-cursor-bound")) return;
        el.setAttribute("data-cursor-bound", "true");

        el.addEventListener("mouseenter", (e) => {
          setIsHovering(true);
          const target = e.currentTarget as HTMLElement;
          if (target.hasAttribute("data-magnetic") || target.tagName === "BUTTON" || target.tagName === "A") {
            isMagnetic = true;
            targetRect = target.getBoundingClientRect();
          }
        });
        
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          isMagnetic = false;
          targetRect = null;
        });
      });
    };

    updateHoverElements();
    
    // Observer for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      if (mutations.length > 0) updateHoverElements();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      document.body.style.cursor = "auto";
    };
  }, [pathname]);

  // Animations for hover states
  useEffect(() => {
    if (!cursorRef.current) return;
    
    if (isHovering) {
      gsap.to(cursorRef.current, {
        scale: 1.5,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovering]);

  if (isHidden) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className={`transition-transform duration-300 ${isHovering ? "rotate-45" : "rotate-0"}`}>
        <StarMotif className="w-full h-full text-white" />
      </div>
    </div>
  );
}
