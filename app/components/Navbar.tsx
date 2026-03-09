"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NavigationItems = [
  ["About",      "/"          ],
  ["Experience", "/Experience"],
  ["Projects",   "/Projects"  ],
  ["Skills",     "/Skills"    ],
  ["Ask Me!",    "/Ask-Me"    ],
  ["Contact",    "/Contact"   ],
];

const Navbar = () => {
  const pathname          = usePathname();
  const [mounted,  setMounted]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const diff    = current - lastScrollY.current;
      if (diff > 4 && current > 80) setHidden(true);
      else if (diff < -4)           setHidden(false);
      setScrolled(current > 30);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sharedMotion = {
    opacity:   !mounted || hidden ? 0 : 1,
    transform: !mounted
      ? "translateY(-12px)"
      : hidden
      ? "translateY(-120%)"
      : "translateY(0)",
  };

  return (
    <>
      {/* ── Brand pill — fixed top-left ── */}
      <Link
        href="/"
        className={["navbar select-none", scrolled ? "navbar-scrolled" : ""].join(" ")}
        style={{
          position: "fixed",
          top:    "0.75rem",
          left:   "max(0.75rem, calc((100vw - 64rem) / 2))",
          margin: 0,
          display: "flex",
          alignItems: "baseline",
          fontWeight: 700,
          fontSize: "0.875rem",
          letterSpacing: "-0.01em",
          ...sharedMotion,
        }}
      >
        <span className="text-zinc-900 dark:text-zinc-100">V</span>
        <span
          className="text-zinc-900 dark:text-zinc-100"
          style={{
            display: "inline-block",
            maxWidth: scrolled ? "0px" : "44px",
            overflow: "hidden",
            opacity: scrolled ? 0 : 1,
            transition: "max-width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            whiteSpace: "nowrap",
          }}
        >
          arun&nbsp;
        </span>
        <span className="text-zinc-900 dark:text-zinc-100">V</span>
        <span
          className="text-zinc-900 dark:text-zinc-100"
          style={{
            display: "inline-block",
            maxWidth: scrolled ? "0px" : "82px",
            overflow: "hidden",
            opacity: scrolled ? 0 : 1,
            transition:
              "max-width 0.35s cubic-bezier(0.4,0,0.2,1) 0.04s, opacity 0.25s ease 0.04s",
            whiteSpace: "nowrap",
          }}
        >
          ijaykumar
        </span>
      </Link>

      {/* ── Nav pill — centered ── */}
      <nav
        className={["navbar", scrolled ? "navbar-scrolled" : ""].join(" ")}
        style={sharedMotion}
      >
        {NavigationItems.map(([name, href]) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={[
                "relative rounded-full text-sm font-medium",
                "transition-all duration-200 ease-in-out",
                scrolled ? "px-3 py-1" : "px-3.5 py-1.5",
                isActive
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-white/60 dark:hover:bg-zinc-800/60 hover:scale-[1.04]",
              ].join(" ")}
            >
              {name}
              {isActive && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-zinc-400 dark:bg-zinc-500 opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
