import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MobileNav from "./components/MobileNav";

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
        {/* FIX: z-50 ensures it stays on top of the 3D canvas and other content.
           backdrop-blur-md requires the background to be partially transparent (bg-white/80).
        */}
        <header className="fixed top-0 left-0 w-full px-4 md:px-12 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md z-50 border-b border-gray-200/50">
          <Link href="/" className="font-mono font-bold text-lg md:text-xl text-gray-900 tracking-tighter hover:text-blue-700 transition-colors">
            ./faky<span className="text-blue-700">_dev</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">Home</Link>
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">Blog</Link>
            <Link href="/#contact" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">Uplink</Link>
            <Link href="/projects" className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">
              Deployments
            </Link>
          </nav>
          
          {/* Desktop CV Button */}
          <div className="hidden md:block">
            <a
              href="/assets/CV_Faky.pdf"
              target="_blank"
              className="px-4 py-2 border border-blue-700 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-700 hover:text-white transition-all duration-300"
            >
              Download CV ⇩
            </a>
          </div>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </header>
        {children}
      </body>
    </html>
  );
}