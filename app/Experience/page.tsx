import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    company: "BMW Group",
    location: "Munich, Germany",
    role: "Test Architect / Solutions Architect",
    period: "Oct. 2022 — Present",
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
    details:
      "Specialised in Machine Learning, Digital and 3D Image Processing in Embedded Systems, TV and Video Processing, and the Design of Heterogeneous Systems.",
    thesis:
      "Industrial Thesis (with Continental AG): \"Adaptive Anti-Aliasing of Fisheye Images in Surround View Systems\"",
  },
  {
    institution: "Amrita School of Engineering",
    location: "Coimbatore, India",
    degree: "BTech. Electronics & Communication Engineering",
    period: "July 2007 — April 2011",
    details:
      "Specialised in Digital Signal Processing, Electronics, and Embedded Software Design & Development.",
    thesis:
      "Thesis: \"Bio-Inspired imprecise computation blocks for efficient VLSI implementation of facial recognition\"",
  },
];

export default function ExperiencePage() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Professional Experience */}
      <h1 className="text-3xl font-bold mb-2 py-4">Experience</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-10">
        13+ years across embedded systems, automotive, cloud QA, and AI-driven validation.
      </p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex flex-col gap-10">
          {experience.map((job, i) => (
            <div key={i} className="pl-10 relative">
              {/* Dot */}
              <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 ring-4 ring-background">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              </div>

              <div className="flex flex-col gap-1 mb-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {job.company}
                  </h2>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{job.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {job.role}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                    {job.period}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-1.5">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <h2 className="text-2xl font-bold mt-16 mb-8 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
        Education
      </h2>

      <div className="relative">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex flex-col gap-8">
          {education.map((edu, i) => (
            <div key={i} className="pl-10 relative">
              <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 ring-4 ring-background">
                <GraduationCap className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              </div>

              <div className="flex flex-col gap-1 mb-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {edu.institution}
                  </h3>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{edu.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {edu.degree}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                    {edu.period}
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{edu.details}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 italic">{edu.thesis}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
