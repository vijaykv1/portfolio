/**
 * Footer component for the portfolio website.
 *
 * ── Update the three constants below with your real URLs ──
 */
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const GITHUB_URL   = "https://github.com/YOUR_USERNAME";     // ← update
const LINKEDIN_URL = "https://linkedin.com/in/YOUR_PROFILE"; // ← update
const EMAIL        = "your@email.com";                       // ← update

const socials = [
  { icon: Github,   href: GITHUB_URL,       label: "GitHub"   },
  { icon: Linkedin, href: LINKEDIN_URL,      label: "LinkedIn" },
  { icon: Mail,     href: `mailto:${EMAIL}`, label: "Email"    },
];

const Footer = () => {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800/60 mt-16">
      <div className="mx-auto max-w-4xl px-8 py-6 flex items-center justify-between gap-4">

        {/* Copyright + Legal */}
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} Varun Vijaykumar ·{" "}
          <Link
            href="/Legal"
            className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Legal
          </Link>
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 transition-all hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:scale-110 active:scale-95"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
