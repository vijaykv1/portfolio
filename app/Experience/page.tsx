import { Briefcase, GraduationCap, Sparkles, Mail } from "lucide-react";
import Link from "next/link";
import FadeUp from "../components/FadeUp";

/* ── Data ─────────────────────────────────────────────────── */
const FILTER_DEFAULT = "opacity-80 dark:brightness-0 dark:invert dark:opacity-50";

const experience = [
  {
    company: "BMW Group",
    location: "Munich, Germany",
    role: "Test Architect / Solutions Architect",
    period: "Oct. 2022 — Present",
    logoPath: "/logos/BMW_GRP.svg",
    logoFilter: FILTER_DEFAULT,
    // BMW_GRP.svg renders 212×150 (1.41:1): at h-16(64px) → width=90px; w-32 aligns left-edge with rest
    logoContainerClass: "w-32 h-16",
    bullets: [
      "Improved legacy test infrastructure for enhanced stability and scalability across high-demand projects.",
      "Designed and developed cloud-based applications to streamline testing across multiple automotive projects.",
      "Defined enterprise-level test strategies and QA roadmaps aligned with project and business goals.",
      "Built scalable, reusable automation frameworks and centralised test toolkits supporting ~100,000 tests/day.",
      "Developed a global cloud-based test reporting platform serving ~40,000 users across multiple sites.",
      "Led tool selection and CI/CD integration to support efficient automated testing.",
      "Developed AI-powered orchestration solutions to automate complex workflows and improve system efficiency and reliability.",
      "Created AI (NLP)-based testing tools to automate test creation and validation, increasing test coverage while reducing manual effort.",
      "Designed and implemented an AI-driven recommender system to automatically derive test cases from customer and technical requirements.",
      "Established QA best practices, KPIs, and quality governance processes.",
      "Collaborated closely with Development, DevOps, and Product teams to align testing with delivery pipelines.",
    ],
  },
  {
    company: "Continental AG",
    location: "Ulm, Germany",
    role: "Visualization Test Architect",
    period: "Sept. 2017 — Sept. 2022",
    logoPath: "/logos/continental.png",
    logoFilter: FILTER_DEFAULT,
    // Continental PNG is 1094×200 (5.47:1): cap width at 112px → renders 112×20px
    logoContainerClass: "w-28 h-9",
    bullets: [
      "Analysed requirements and designed test strategies for visualization features.",
      "Developed and maintained test automation pipelines integrated with CI frameworks for nightly builds and reporting.",
      "Integrated simulators (CARLA, CarMaker) into test frameworks for open-loop simulation-based testing.",
      "Created computer vision-based test algorithms to validate visualization outputs.",
      "Automated HIL test deployments and reporting through custom scripting.",
      "Designed and implemented image processing algorithms for shadow removal (See Through Bonnet) and software anti-aliasing using OpenGL.",
      "Maintained and enhanced a Qt-based simulation tool for camera view configuration.",
    ],
  },
  {
    company: "Technical University Chemnitz",
    location: "Chemnitz, Germany",
    role: "Research Assistant",
    period: "Apr. 2016 — Nov. 2016",
    logoPath: "/logos/tuc.png",
    logoFilter: FILTER_DEFAULT,
    // TUC PNG is 1024×668 (1.53:1 landscape): at h-20(80px) → width=122px fits in w-32(128px)
    logoContainerClass: "w-32 h-20",
    bullets: [
      "Integrated Microsoft Kinect v1 & v2 for skeletal tracking and human body stream extraction in the AssiSt rehabilitation project.",
      "Developed a secure networking toolbox (server/client, data encoding/decoding) for data transfer in the open-source XPCV computer vision platform.",
    ],
  },
  {
    company: "Pace Micro Technology Pvt. Ltd.",
    location: "Bengaluru, India",
    role: "Embedded Software Engineer",
    period: "May 2011 — Sept. 2014",
    logoPath: "/logos/pace.png",
    logoFilter: FILTER_DEFAULT,
    // Pace PNG is 444×224 (1.98:1): at h-10(40px) → width=79px; w-32 aligns left-edge with TUC
    logoContainerClass: "w-32 h-10",
    bullets: [
      "Contributed to SDK API development and managed release cycles.",
      "Designed and implemented a UI Test Harness Suite (TCTH) and an Electronic Program Guide (EPG) display system.",
      "Developed and maintained MoCA-based Home Content Sharing (HCS) features.",
      "Built test applications for PVR systems, including review buffer testing.",
      "Created Adobe Flash Lite apps for set-top boxes (e.g., weather widgets, on-screen keyboards).",
      "Developed device drivers for QWERTY keyboards in set-top boxes.",
      "Upgraded embedded modules for network-based logging and debugging.",
    ],
  },
];

const education = [
  {
    institution: "Technical University Chemnitz",
    location: "Chemnitz, Germany",
    degree: "MSc. Embedded Systems",
    period: "Oct. 2014 — Sept. 2017",
    logoPath: "/logos/tuc.png",
    logoFilter: FILTER_DEFAULT,
    // TUC PNG 1024×668 landscape: at h-20(80px) → width=122px fits in w-32(128px)
    logoContainerClass: "w-32 h-20",
    details:
      "Specialised in Machine Learning, Digital and 3D Image Processing in Embedded Systems, TV and Video Processing, and the Design of Heterogeneous Systems.",
    thesis:
      'Industrial Thesis (with Continental AG): "Adaptive Anti-Aliasing of Fisheye Images in Surround View Systems"',
  },
  {
    institution: "Amrita School of Engineering",
    location: "Coimbatore, India",
    degree: "BTech. Electronics & Communication Engineering",
    period: "July 2007 — April 2011",
    logoPath: "/logos/amrita.svg",
    logoFilter: FILTER_DEFAULT,
    // Amrita SVG viewBox 440.81×113.56 (3.88:1): at w-32(128px) → height=33px; h-9 gives room
    logoContainerClass: "w-32 h-9",
    details:
      "Specialised in Digital Signal Processing, Electronics, and Embedded Software Design & Development.",
    thesis:
      'Thesis: "Bio-Inspired imprecise computation blocks for efficient VLSI implementation of facial recognition"',
  },
];

/* ── Helpers ──────────────────────────────────────────────── */
function parseYears(period: string): { start: string; end: string } {
  const [startRaw, endRaw] = period.split("—").map((s) => s.trim());
  const start = startRaw.split(" ").pop() ?? "";
  const end =
    endRaw === "Present" ? "Present" : (endRaw.split(" ").pop() ?? "");
  return { start, end };
}

/* ── Timeline row ─────────────────────────────────────────── */
function TimelineRow({
  period,
  isLast,
  isPresent,
  isActive = false,
  activeConnector = false,
  delay = 0,
  children,
}: {
  period: string;
  isLast: boolean;
  isPresent: boolean;
  isActive?: boolean;
  activeConnector?: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  const { start, end } = parseYears(period);
  const dotGreen = isPresent || isActive;

  return (
    <FadeUp delay={delay} className="flex">
      {/* ── Year range column — both years cluster tightly at dot level ── */}
      <div className="w-14 sm:w-20 shrink-0 flex flex-col items-end pr-3 sm:pr-5 select-none">
        {/* Spacer pushes year labels to align with the dot (mt-0.5 matches dot mt-1) */}
        <div className="mt-0.5 flex flex-col items-end gap-0.5">
          {/* End year / "Now" */}
          <span
            className={`text-xs font-semibold tabular-nums leading-none ${
              dotGreen
                ? "text-green-500"
                : "text-zinc-600 dark:text-zinc-300"
            }`}
          >
            {isPresent ? "Now" : end}
          </span>

          {/* Separator dash */}
          {start !== end && (
            <span className="text-[9px] leading-none text-zinc-300 dark:text-zinc-700 select-none">
              ─
            </span>
          )}

          {/* Start year */}
          {start !== end && (
            <span className="text-[11px] tabular-nums leading-none text-zinc-400 dark:text-zinc-500">
              {start}
            </span>
          )}
        </div>
      </div>

      {/* ── Dot + vertical connector ── */}
      <div className="flex flex-col items-center w-6 shrink-0">
        <div
          className={`mt-1 h-3 w-3 rounded-full shrink-0 z-10 ring-2 ring-white dark:ring-zinc-950 ${
            dotGreen
              ? "bg-green-500"
              : "bg-zinc-400 dark:bg-zinc-600"
          }`}
        />
        {!isLast && (
          <div className={`w-px flex-1 mt-1 ${
            activeConnector
              ? "bg-green-400 dark:bg-green-600"
              : "bg-zinc-200 dark:bg-zinc-800"
          }`} />
        )}
      </div>

      {/* ── Content ── */}
      <div className="pl-5 pb-12 flex-1 min-w-0">{children}</div>
    </FadeUp>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function ExperiencePage() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <h1
        className="text-3xl font-bold mb-2 py-4 flex items-center gap-2"
        style={{ animation: "fade-up 0.6s ease both 0.05s" }}
      >
        <Briefcase className="w-7 h-7 text-zinc-500 dark:text-zinc-400" />
        Experience
      </h1>
      <p
        className="text-zinc-500 dark:text-zinc-400 text-sm mb-10"
        style={{ animation: "fade-up 0.6s ease both 0.15s" }}
      >
        13+ years across embedded systems, automotive, cloud QA, and AI-driven
        validation.
      </p>

      {/* ── Professional Experience ── */}
      <div className="flex flex-col">
        {experience.map((job, i) => {
          const isPresent = job.period.includes("Present");
          // Green connector line only from BMW (0) down to Continental (1).
          const activeConnector = i === 0;
          const isActive = false;
          return (
            <TimelineRow
              key={i}
              period={job.period}
              isLast={i === experience.length - 1}
              isPresent={isPresent}
              isActive={isActive}
              activeConnector={activeConnector}
              delay={i * 90}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-0.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {job.company}
                  </h2>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {job.location}
                  </span>
                </div>
                {job.logoPath && (
                  <div className={`hidden sm:flex shrink-0 items-center justify-center ${job.logoContainerClass ?? "w-20 h-11"}`}>
                    <img
                      src={job.logoPath}
                      alt={job.company}
                      className={`max-w-full max-h-full w-auto h-auto ${job.logoFilter ?? FILTER_DEFAULT}`}
                    />
                  </div>
                )}
              </div>

              {/* Role + period badge */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {job.role}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  {job.period}
                </span>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-1.5">
                {job.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    {b}
                  </li>
                ))}
              </ul>
            </TimelineRow>
          );
        })}
      </div>

      {/* ── Education ── */}
      <FadeUp>
        <h2 className="text-2xl font-bold mt-8 mb-8 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
          Education
        </h2>
      </FadeUp>

      <div className="flex flex-col">
        {education.map((edu, i) => (
          <TimelineRow
            key={i}
            period={edu.period}
            isLast={i === education.length - 1}
            isPresent={false}
            delay={i * 90}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-0.5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {edu.institution}
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {edu.location}
                </span>
              </div>
              {edu.logoPath && (
                <div className={`hidden sm:flex shrink-0 items-center justify-center ${edu.logoContainerClass ?? "w-20 h-11"}`}>
                  <img
                    src={edu.logoPath}
                    alt={edu.institution}
                    className={`max-w-full max-h-full w-auto h-auto ${edu.logoFilter ?? FILTER_DEFAULT}`}
                  />
                </div>
              )}
            </div>

            {/* Degree + period badge */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {edu.degree}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                {edu.period}
              </span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              {edu.details}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 italic">
              {edu.thesis}
            </p>
          </TimelineRow>
        ))}
      </div>

      {/* ── CTA footer ── */}
      <FadeUp delay={80}>
        <div className="mt-16 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Still have questions?</p>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              The CV only tells half the story.
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Ask Herald — my AI representative — anything about my work, decisions, or experience.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/Ask-Me"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:from-violet-500 hover:to-indigo-500 active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              Ask Me anything
            </Link>
            <Link
              href="/Contact"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:scale-105 hover:border-zinc-400 dark:hover:border-zinc-500 active:scale-95 whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </Link>
          </div>
        </div>
      </FadeUp>

    </div>
  );
}
