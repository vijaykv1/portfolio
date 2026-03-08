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
  const [scrolled, setScrolled] = useState(false); // past threshold → compact glass
  const [hidden,   setHidden]   = useState(false);  // scrolling down → hide
  const lastScrollY = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const diff    = current - lastScrollY.current;

      // Hide when scrolling down past 80px; reveal on any scroll up
      if (diff > 4 && current > 80) {
        setHidden(true);
      } else if (diff < -4) {
        setHidden(false);
      }

      // Compact glass style past 30px
      setScrolled(current > 30);

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "navbar",
        scrolled ? "navbar-scrolled" : "",
      ].join(" ")}
      style={{
        opacity:   !mounted || hidden ? 0 : 1,
        transform: !mounted
          ? "translateY(-12px)"
          : hidden
          ? "translateY(-120%)"
          : "translateY(0)",
      }}
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
  );
};

export default Navbar;
