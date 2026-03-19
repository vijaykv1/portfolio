"use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps children in a div that fades + slides up when it enters the viewport.
 * Uses IntersectionObserver so the animation only triggers once, on scroll-in.
 *
 * @param delay  - ms to wait after the element enters the viewport (for stagger)
 * @param className - forwarded to the wrapper div (e.g. "flex", "grid-cols-2")
 */
export default function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set transition after first paint so the initial opacity:0 doesn't animate in
    el.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.06 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(18px)" }}
    >
      {children}
    </div>
  );
}
