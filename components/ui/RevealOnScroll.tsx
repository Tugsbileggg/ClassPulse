"use client";

import { useEffect } from "react";

/**
 * `data-reveal` бүхий элементүүдийг scroll хийхэд зөөлөн гаргана.
 * Дэлгэцэн дээр аль хэдийн харагдаж буй элементэд хүрэхгүй, мөн
 * `prefers-reduced-motion` идэвхтэй үед огт ажиллахгүй.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const fold = window.innerHeight * 0.92;
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top < fold) return;
      element.classList.add("reveal-pending");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
