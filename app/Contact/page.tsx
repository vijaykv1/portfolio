"use client";

import { useState } from "react";
import { Mail, MapPin, Coffee } from "lucide-react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

type FormState = "idle" | "loading" | "success" | "error";

function DecorativePanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950 via-zinc-900 to-indigo-950 p-10 flex flex-col justify-between min-h-[480px]">
      {/* Floating decorative circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-violet-500/10 blur-2xl" />
      <div className="absolute top-1/3 -left-8 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl" />
      <div className="absolute -bottom-8 right-1/4 w-40 h-40 rounded-full bg-violet-400/10 blur-2xl" />
      <div className="absolute top-1/2 right-8 w-4 h-4 rounded-full bg-violet-400/40" />
      <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-indigo-300/40" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-violet-300/30" />

      {/* Top content */}
      <div className="relative z-10">
        <p className="text-violet-300/80 text-xs font-semibold uppercase tracking-widest mb-3">
          Get in touch
        </p>
        <h2 className="text-3xl font-bold text-white leading-tight mb-4">
          Let&apos;s build something<br />great together.
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Whether it&apos;s a project, an opportunity, or just a hello — my inbox is always open.
        </p>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 flex flex-col gap-3 mt-10">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Mail className="w-4 h-4 text-violet-300" />
          </div>
          <span className="text-zinc-300 text-sm">varun.vijaykumar75@hotmail.com</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <MapPin className="w-4 h-4 text-violet-300" />
          </div>
          <span className="text-zinc-300 text-sm">Based in Munich, Germany</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Coffee className="w-4 h-4 text-violet-300" />
          </div>
          <span className="text-zinc-300 text-sm">Open to new opportunities</span>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setState(res.ok ? "success" : "error");
    if (res.ok) form.reset();
  }

  return (
    <div className="p-8">
      <h1
        className="text-3xl font-bold mb-6 py-4"
        style={{ animation: "fade-up 0.6s ease both 0.05s" }}
      >
        Contact
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <DecorativePanel />

        <div style={{ animation: "fade-up 0.6s ease both 0.28s" }}>
          {state === "success" ? (
            <div className="flex flex-col gap-2 py-10">
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Message sent!
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Your message…"
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
                />
              </div>

              {state === "error" && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="flex h-12 w-fit items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
