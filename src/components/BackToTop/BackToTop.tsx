"use client";

import { useEffect, useRef, useState } from "react";

import ArrowIcon from "@/components/ArrowIcon";
import styles from "./BackToTop.module.scss";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateButton = () => {
      animationFrame = 0;
      const footer = document.querySelector("footer");
      const footerOffset = footer
        ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)
        : 0;

      buttonRef.current?.style.setProperty("--footer-offset", `${footerOffset}px`);
      setIsVisible(window.scrollY > window.innerHeight * 0.75);
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateButton);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      className={`${styles.backToTop} ${isVisible ? styles.visible : ""}`}
      type="button"
      aria-label="Retour en haut de la page"
      aria-hidden={!isVisible}
      disabled={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <ArrowIcon direction="up" />
    </button>
  );
}
