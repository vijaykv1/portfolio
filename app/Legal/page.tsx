/**
 * Legal Page for the portfolio website.
 */
import { Scale, Copyright, Section, MailOpen } from "lucide-react";

export default function LegalPage() {
  const sections = [
    {
      title: "Contact Information",
      icon: MailOpen,
      content: "Name: Varun Vijaykumar\nEmail: example@example.com",
    },
    {
      title: "Liability of Content",
      icon: Section,
      content:
        "As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Para.1 TMG. According to §§ 8 to 10 TMG, however, we as a service provider are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information in accordance with general laws remain unaffected by this. However, liability in this respect is only possible from the time of knowledge of a concrete infringement. Upon becoming aware of such violations, we will remove this content immediately.",
    },
    {
      title: "Liability for Links",
      icon: Scale,
      content:
        "Our offer contains links to external third-party websites, the contents of which we have no influence on. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of the law. Upon becoming aware of legal violations, we will remove such links immediately.",
    },
    {
      title: "Copyright",
      icon: Copyright,
      content:
        "The content and works created by the site operators on these pages are subject to German copyright law. The duplication, processing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this page are only permitted for private, non-commercial use. Insofar as the content on this page was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, we ask for a corresponding note. Upon becoming aware of legal violations, we will remove such content immediately.",
    },
  ];

  return (
    <div className="legal-page p-8">
      <h1 className="text-3xl font-bold mb-6 py-4">Legal Information</h1>
      {sections.map((section, index) => (
        <div key={index} className="legal-section mb-4">
          <div className="flex items-center gap-2 mb-2">
            <section.icon className="w-5 h-5 text-black dark:text-white" />
            <h2 className="text-xl font-semibold">{section.title}</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  );
}
