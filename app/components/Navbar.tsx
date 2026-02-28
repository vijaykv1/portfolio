"use client";

/**
 * Navbar component for the portfolio website.
 */

import Link from "next/link";

const NavigationItems = [
  ["About", "/"],
  ["Experience", "/Experience"],
  ["Projects", "/Projects"],
  ["Skills", "/Skills"],
  ["Ask Me!", "/Ask-Me"],
  ["Contact", "/Contact"],
];

const Navbar = () => {
  return (
    <div className="navbar">
      {NavigationItems.map(([name, href]) => (
        <Link
          key={name}
          href={href}
          className="flex-row items gap-3  px-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
