import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Varun Vijaykumar — Test Architect & Solutions Architect",
  description:
    "Portfolio of Varun Vijaykumar — Test Architect and Solutions Architect at BMW Group, Munich. 13+ years in embedded systems, automotive software, cloud QA, and AI-driven validation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="mx-auto max-w-5xl w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
