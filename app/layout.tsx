import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Faky | Systems & Network Engineer",
  description: "Specializing in Low-level Systems, OS Internals, and High-Performance Infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className={inter.className}>
        <header className="fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center bg-white/85 backdrop-blur-md z-50 border-b border-black/5">
          <div className="font-mono font-bold text-xl text-gray-900">
            ./faky<span style={{ color: "#0052cc" }}>_dev</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#projects" className="text-gray-600 hover:text-blue-700 font-medium">Deployments</Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-700 font-medium">Uplink</Link>
          </nav>
          <div>
            <a
              href="/assets/CV_Faky.pdf"
              target="_blank"
              className="px-4 py-2 border border-blue-700 text-blue-700 rounded text-sm font-bold hover:bg-blue-700 hover:text-white transition-colors"
            >
              Download CV ⇩
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}