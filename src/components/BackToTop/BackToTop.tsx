"use client";

import { useEffect, useState } from "react";

import styles from "./BackToTop.module.scss";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.75);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      className={`${styles.backToTop} ${isVisible ? styles.visible : ""}`}
      type="button"
      aria-label="Retour en haut de la page"
      aria-hidden={!isVisible}
      disabled={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
        <path d="M12 20V4M5 11l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
