import { FolderGit2, ExternalLink, Github } from "lucide-react";
import FadeUp from "../components/FadeUp";

/* ── Data ─────────────────────────────────────────────────────────────────
 *  To add a new project, copy one of the objects below and fill it in.
 *  All fields except `link` and `repo` are required.
 *  `tags` – tech / tools used (shown as small chips)
 *  `link` – optional public URL
 *  `repo` – optional GitHub URL
 * ─────────────────────────────────────────────────────────────────────── */
const projects: Project[] = [
  {
    title: "Herald",
    description:
      "An AI-powered personal representative chatbot that answers questions about professional background, skills, and experience. Supports both a basic prompt mode and a RAG-based mode using vector embeddings and ChromaDB for semantic retrieval over a LinkedIn CV.",
    tags: ["Python", "OpenAI Agents", "RAG", "ChromaDB", "Gradio", "GitHub Actions"],
    repo: "https://github.com/vijaykv1/herald",
  },
];

/* ── Types ─────────────────────────────────────────────────── */
type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

/* ── Project card ──────────────────────────────────────────── */
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="group relative flex flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
            {project.title}
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                aria-label="Live link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function ProjectsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1
        className="text-3xl font-bold mb-2 py-4 flex items-center gap-2"
        style={{ animation: "fade-up 0.6s ease both 0.05s" }}
      >
        <FolderGit2 className="w-7 h-7 text-zinc-500 dark:text-zinc-400" />
        Projects
      </h1>
      <p
        className="text-zinc-500 dark:text-zinc-400 text-sm mb-10"
        style={{ animation: "fade-up 0.6s ease both 0.15s" }}
      >
        Things I&apos;ve built.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={i * 60} />
        ))}
      </div>
    </div>
  );
}
