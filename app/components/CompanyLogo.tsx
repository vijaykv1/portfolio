"use client";

import { useState } from "react";

interface CompanyLogoProps {
  domain: string;
  initials: string;
  badgeBg: string;
}

export default function CompanyLogo({ domain, initials, badgeBg }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${badgeBg} shadow-md`}>
        <span className="text-white text-xs font-bold tracking-wide">{initials}</span>
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-md overflow-hidden border border-zinc-200 dark:border-zinc-700">
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={initials}
        width={44}
        height={44}
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
