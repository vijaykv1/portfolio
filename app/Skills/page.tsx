import {
  SiPython, SiCplusplus, SiGnubash, SiAnsible,
  SiJenkins, SiCmake, SiBazel, SiGithubactions, SiDocker, SiKubernetes, SiGit,
  SiPulumi,
  SiOpengl, SiOpencv,
  SiSwagger, SiPostman, SiDiagramsdotnet,
  SiConfluence, SiJira, SiAtlassian,
  SiLinux, SiMacos,
} from "react-icons/si";
import FadeUp from "../components/FadeUp";

const skillIcons: Record<string, React.ReactElement> = {
  // Programming Languages
  Python: <SiPython />,
  "C++": <SiCplusplus />,
  "Shell Scripts": <SiGnubash />,
  Ansible: <SiAnsible />,
  // Build & CI
  Jenkins: <SiJenkins />,
  CMake: <SiCmake />,
  Bazel: <SiBazel />,
  "GitHub Actions": <SiGithubactions />,
  Docker: <SiDocker />,
  Kubernetes: <SiKubernetes />,
  Git: <SiGit />,
  // Cloud
  "IaC — Pulumi": <SiPulumi />,
  // Computer Vision & Graphics
  OpenGL: <SiOpengl />,
  OpenCV: <SiOpencv />,
  // Architecture & API Design
  Swagger: <SiSwagger />,
  Postman: <SiPostman />,
  DrawIO: <SiDiagramsdotnet />,
  // Agile & Collaboration
  Confluence: <SiConfluence />,
  Jira: <SiJira />,
  "Atlassian Suite": <SiAtlassian />,
  // Operating Systems
  Linux: <SiLinux />,
  macOS: <SiMacos />,
};

const skillGroups = [
  {
    category: "Programming Languages",
    skills: ["Python", "C++", "Shell Scripts", "Ansible"],
  },
  {
    category: "Build & CI",
    skills: ["Jenkins", "ZUUL", "CMake", "Bazel", "GitHub Actions", "Docker", "Kubernetes", "Git"],
  },
  {
    category: "Cloud",
    skills: ["AWS S3", "AWS SQS", "AWS SNS", "AWS EC2", "AWS Solutions Architect", "IaC — Pulumi"],
  },
  {
    category: "Computer Vision & Graphics",
    skills: ["OpenGL", "OpenCV"],
  },
  {
    category: "AI & NLP",
    skills: ["NLP Interfaces (Azure AI)", "Agentic Systems", "AI Orchestration"],
  },
  {
    category: "Architecture & API Design",
    skills: ["AWS Architecting Tools", "PlantUML", "Swagger", "Postman", "DrawIO"],
  },
  {
    category: "Requirements & QA",
    skills: ["Codebeamer", "ISTQB", "Test Strategy", "KPI Definition", "Quality Governance"],
  },
  {
    category: "Agile & Collaboration",
    skills: ["Scrum", "PSPO I & II", "Confluence", "Jira", "Atlassian Suite"],
  },
  {
    category: "Operating Systems",
    skills: ["Linux", "macOS", "Windows"],
  },
];

const certifications = [
  {
    name: "AWS Solutions Architect — Associate",
    year: "2025",
    icon: <img src="/logos/SA_associate.png" alt="AWS Solutions Architect" className="w-14 h-14 object-contain" />,
  },
  {
    name: "AWS Developer — Associate",
    year: "2025",
    icon: <img src="/logos/developer_associate.png" alt="AWS Developer" className="w-14 h-14 object-contain" />,
  },
  {
    name: "AWS Cloud Practitioner — Foundational",
    year: "2024",
    icon: <img src="/logos/foundational.png" alt="AWS Cloud Practitioner" className="w-14 h-14 object-contain" />,
  },
  {
    name: "Professional Scrum Product Owner II (PSPO II)",
    year: "2024",
    icon: <img src="/logos/pspo.png" alt="PSPO II" className="w-14 h-14 object-contain" />,
  },
  {
    name: "Professional Scrum Product Owner I (PSPO I)",
    year: "2024",
    icon: <img src="/logos/pspo_one.png" alt="PSPO I" className="w-14 h-14 object-contain" />,
  },
  {
    name: "ISTQB Certified Tester — Foundation Level",
    year: "2020",
    icon: <img src="/logos/istqb.png" alt="ISTQB" className="w-14 h-14 object-contain" />,
  },
];

const languages = [
  { lang: "English", level: "Fluent" },
  { lang: "German", level: "Intermediate" },
  { lang: "Hindi", level: "Native" },
  { lang: "Malayalam", level: "Native" },
];

export default function SkillsPage() {
  return (
    <div className="p-8 max-w-4xl">
      {/* ── Header ── */}
      <h1
        className="text-3xl font-bold mb-2 py-4"
        style={{ animation: "fade-up 0.6s ease both 0.05s" }}
      >
        Skills
      </h1>
      <p
        className="text-zinc-500 dark:text-zinc-400 text-sm mb-10"
        style={{ animation: "fade-up 0.6s ease both 0.15s" }}
      >
        Technologies, tools, and practices I work with.
      </p>

      {/* ── Skill groups ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {skillGroups.map((group, i) => (
          <FadeUp key={group.category} delay={i * 60}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
              {group.category}
            </h2>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  {skillIcons[skill] && (
                    <span className="text-base leading-none">{skillIcons[skill]}</span>
                  )}
                  {skill}
                </span>
              ))}
            </div>
          </FadeUp>
        ))}
      </div>

      {/* ── Certifications ── */}
      <FadeUp>
        <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Certifications</h2>
      </FadeUp>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-16">
        {certifications.map((cert, i) => (
          <FadeUp key={cert.name} delay={i * 60}>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 flex items-center justify-center">{cert.icon}</div>
              <div>
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 leading-snug">{cert.name}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{cert.year}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* ── Languages ── */}
      <FadeUp>
        <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Languages</h2>
      </FadeUp>
      <div className="flex flex-wrap gap-3">
        {languages.map((l, i) => (
          <FadeUp key={l.lang} delay={i * 60}>
            <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-2 transition-colors hover:border-zinc-300 dark:hover:border-zinc-600">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{l.lang}</span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">{l.level}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
