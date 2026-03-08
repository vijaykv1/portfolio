const skillGroups = [
  {
    category: "Languages",
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
  { name: "AWS Solutions Architect — Associate", year: "2025" },
  { name: "AWS Developer — Associate", year: "2025" },
  { name: "Professional Scrum Product Owner I & II (PSPO)", year: "2024" },
  { name: "ISTQB Certified Tester — Foundation Level", year: "2020" },
];

const languages = [
  { lang: "English", level: "Fluent" },
  { lang: "German", level: "Professional" },
  { lang: "Hindi", level: "Native" },
  { lang: "Malayalam", level: "Native" },
  { lang: "Tamil", level: "Native" },
];

export default function SkillsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2 py-4">Skills</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-10">
        Technologies, tools, and practices I work with.
      </p>

      {/* Skill groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
              {group.category}
            </h2>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Certifications</h2>
      <div className="flex flex-col gap-3 mb-16">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3"
          >
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{cert.name}</span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
              {cert.year}
            </span>
          </div>
        ))}
      </div>

      {/* Languages */}
      <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Languages</h2>
      <div className="flex flex-wrap gap-3">
        {languages.map((l) => (
          <div
            key={l.lang}
            className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-2"
          >
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{l.lang}</span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{l.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
