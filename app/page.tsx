"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, ChevronRight } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────── */
const roles = [
  "Test Architect",
  "Solutions Architect",
  "AI Systems Engineer",
  "Quality Engineering Lead",
];

const skills = [
  "Python", "C++", "AWS", "AI / NLP", "OpenCV", "Docker",
  "Kubernetes", "Jenkins", "Test Architecture", "CI/CD", "Pulumi",
  "ZUUL", "OpenGL", "Bazel", "Scrum", "Computer Vision", "Embedded Systems",
  "Automotive Software", "GitHub Actions", "Ansible",
];

/* ── Page ─────────────────────────────────────────────────── */
export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleClass, setRoleClass] = useState("role-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleClass("role-out");
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length);
        setRoleClass("role-in");
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const doubled = [...skills, ...skills];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 150% center; }
          100% { background-position: -50% center; }
        }
        .name-shimmer {
          background: linear-gradient(
            105deg,
            #3f3f46 0%,
            #3f3f46 30%,
            #ffffff 46%,
            #f4f4f5 54%,
            #3f3f46 70%,
            #3f3f46 100%
          );
          background-size: 300% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* ── Background orbs ─────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="orb-1 absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
        />
        <div
          className="orb-2 absolute -bottom-60 -left-40 h-[700px] w-[700px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
        />
        <div
          className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative px-8 pt-16 pb-10 max-w-4xl">

        {/* Location */}
        <div className="fade-up-1 mb-8 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur px-3 py-1 text-xs text-zinc-500 dark:text-zinc-400">
          <MapPin size={11} />
          Munich, Germany · Open to global opportunities
        </div>

        {/* Greeting */}
        <p className="fade-up-2 text-sm font-medium text-zinc-400 dark:text-zinc-500 mb-2 tracking-wide">
          Hi, I&apos;m
        </p>

        {/* Name with shimmer */}
        <h1 className="fade-up-2 name-shimmer text-6xl font-bold tracking-tight mb-4 leading-tight">
          Varun Vijaykumar
        </h1>

        {/* Cycling role */}
        <div className="fade-up-3 mb-6 flex items-center gap-3">
          <span className="text-zinc-400 dark:text-zinc-500 text-lg">—</span>
          <span
            key={roleIdx}
            className={`${roleClass} text-lg font-medium text-zinc-600 dark:text-zinc-300`}
          >
            {roles[roleIdx]}
          </span>
        </div>

        {/* Bio */}
        <p className="fade-up-4 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 mb-10">
          I build the systems that keep software honest — test infrastructure,
          AI validation pipelines, and cloud platforms running at scale across
          BMW Group globally.
        </p>

        {/* CTAs */}
        <div className="fade-up-5 flex flex-wrap items-center gap-3">
          <Link
            href="/Experience"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-100 dark:text-zinc-900 transition-all hover:scale-105 hover:bg-zinc-700 dark:hover:bg-white active:scale-95"
          >
            View Experience
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/Contact"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/40 dark:bg-zinc-900/40 backdrop-blur px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:scale-105 hover:border-zinc-400 dark:hover:border-zinc-500 active:scale-95"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* ── Skills marquee ──────────────────────────────── */}
      <section className="relative py-8 overflow-hidden">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

        <div className="flex whitespace-nowrap">
          <div className="animate-marquee inline-flex gap-0">
            {doubled.map((skill, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-5">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {skill}
                </span>
                <span className="text-zinc-200 dark:text-zinc-700">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────── */}
      <div className="mx-8 max-w-4xl border-t border-zinc-100 dark:border-zinc-800/60 my-2" />

      {/* ── Quick nav ───────────────────────────────────── */}
      <section className="relative px-8 py-8 max-w-4xl">
        <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {[
            { href: "/Experience", label: "Experience", sub: "BMW Group · Continental AG · and more" },
            { href: "/Skills",     label: "Skills",     sub: "AWS · AI/NLP · Computer Vision · Test Architecture" },
            { href: "/Contact",    label: "Contact",    sub: "Let's build something together" },
          ].map(({ href, label, sub }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between py-4 transition-colors hover:opacity-70"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{sub}</p>
              </div>
              <ChevronRight
                size={16}
                className="text-zinc-300 dark:text-zinc-600 transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
