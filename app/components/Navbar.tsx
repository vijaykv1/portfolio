"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const NavigationItems = [
  ["About",      "/"          ],
  ["Experience", "/Experience"],
  ["Projects",   "/Projects"  ],
  ["Skills",     "/Skills"    ],
  ["Contact",    "/Contact"   ],
];

const Navbar = () => {
  const pathname          = usePathname();
  const [mounted,  setMounted]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const diff    = current - lastScrollY.current;
      if (diff > 4 && current > 80) { setHidden(true); setMenuOpen(false); }
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
    transition: "opacity 0.25s ease, transform 0.3s cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <>
      {/* ── Brand pill — fixed top-left, hidden below lg via globals.css ── */}
      <Link
          href="/"
          className={["navbar select-none", scrolled ? "navbar-scrolled" : ""].join(" ")}
          style={{
            position: "fixed",
            top:    "0.75rem",
            left:   "max(0.75rem, calc((100vw - 64rem) / 2))",
            margin: 0,
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

      {/* ── Desktop nav pill — centered, hidden below lg via globals.css ── */}
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

      {/* ── Mobile hamburger button — visible below lg ── */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        className="lg:hidden fixed top-3 right-4 z-[1001] flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur text-zinc-600 dark:text-zinc-300 transition-all hover:scale-105 active:scale-95"
        style={sharedMotion}
      >
        {menuOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* ── Mobile menu overlay ── */}
      {mounted && menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[1000] flex flex-col"
          onClick={() => setMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Menu panel — slides down from top */}
          <div
            className="relative z-10 mx-4 mt-16 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 backdrop-blur p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1">
              {NavigationItems.map(([name, href]) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={name}
                    href={href}
                    className={[
                      "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100",
                    ].join(" ")}
                  >
                    {name}
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
