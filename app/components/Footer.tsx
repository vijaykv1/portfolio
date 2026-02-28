/**
 * Footer component for the portfolio website.
 */
import Link from "next/link";

const portfolioOwnerName = "Varun Vijaykumar";

const Footer = () => {
  return (
    <div className="footer p-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
      <p>
        © {new Date().getFullYear()} {portfolioOwnerName}. All rights reserved.
      </p>
      <Link href="/Legal" className="text-zinc-600 dark:text-zinc-400 hover:underline">
        Legal Information
      </Link>
    </div>
  );
};

export default Footer;
