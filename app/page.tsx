"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the 3D background to prevent server-side rendering issues
const NetworkBackground = dynamic(
  () => import("./components/NetworkBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen relative font-sans">
      <NetworkBackground />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* --- HERO SECTION --- */}
        <section className="min-h-[85vh] flex flex-col justify-center max-w-4xl pt-32">
          <div>
            <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-blue-100 font-mono">
              Systems & Network Engineer
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight">
            Building reliable systems<br />
            in an unreliable net.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
            Systems & Network Engineer with a focus on{" "}
            <strong className="text-gray-900">Low-level Systems (Rust/C)</strong>,{" "}
            <strong className="text-gray-900">Network Protocols</strong>, and{" "}
            <strong className="text-gray-900">Hardened Infrastructure</strong>.
          </p>
        </section>

        {/* --- SKILLS SECTION --- */}
        <h2 className="text-2xl font-bold mb-10 border-b-2 border-gray-200 pb-2 inline-block">
          Technical Proficiency
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">

          {/* Card 1 */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 p-8 rounded-xl shadow-sm hover:-translate-y-1 hover:border-blue-600 transition-all duration-300">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Systems Engineering
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded">Rust</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">C / C++</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">Linux Hardening</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">OS Internals</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 p-8 rounded-xl shadow-sm hover:-translate-y-1 hover:border-blue-600 transition-all duration-300">
            <h3 className="text-lg font-bold mb-4">Infrastructure & DevOps</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded">Ansible</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">Docker</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">Proxmox PVE</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">Zabbix</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 p-8 rounded-xl shadow-sm hover:-translate-y-1 hover:border-blue-600 transition-all duration-300">
            <h3 className="text-lg font-bold mb-4">Network Analysis</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded">Wireshark</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">Cisco PT</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">OPNsense</span>
              <span className="text-xs font-mono bg-white/80 border border-gray-200 px-2 py-1 rounded text-gray-600">TCP/IP Stack</span>
            </div>
          </div>
        </div>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="mb-32">
          <h2 className="text-2xl font-bold mb-12 border-b-2 border-gray-200 pb-2 inline-block">
            Selected Deployments
          </h2>

          {/* Terminal Preview Card */}
          <Link href="/projects" className="group block">
            <div className="bg-[#0a0f1a] rounded-2xl border border-blue-900/30 overflow-hidden shadow-2xl hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/10">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1629] border-b border-blue-900/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]"></div>
                </div>
                <span className="text-blue-300/60 text-xs ml-4 font-mono">ernesto@portfolio: ~/projects</span>
              </div>

              {/* Terminal Body Preview */}
              <div className="p-6 font-mono text-sm">
                <div className="text-gray-300 mb-2">
                  <span className="text-blue-400">❯</span> ls
                </div>
                <div className="text-blue-200/70 mb-4 pl-2">
                  📁 retlister &nbsp; 📁 rustyroom &nbsp; 📁 librenms &nbsp; 📁 unix-ipc &nbsp; 📁 packet-sniffer &nbsp; 📁 homelab
                </div>
                <div className="text-gray-300 mb-2">
                  <span className="text-blue-400">❯</span> cat retlister
                </div>
                <div className="text-blue-200/70 pl-2 mb-4">
                  <span className="text-blue-400">RetLister</span> - Win32 Legacy Bridge<br />
                  <span className="text-blue-200/50">Bridged modern Axum backends with legacy Windows XP hardware...</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="text-blue-400">❯</span>
                  <span className="ml-2 animate-pulse text-blue-400">▋</span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="px-6 py-4 bg-[#0f1629] border-t border-blue-900/30 flex items-center justify-between">
                <span className="text-blue-300/50 text-sm">Interactive terminal with all my projects</span>
                <span className="text-blue-400 font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-2">
                  Access Terminal <span>→</span>
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="pb-32">
          <h2 className="text-2xl font-bold mb-10 border-b-2 border-gray-200 pb-2 inline-block">
            Contact Me
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white/60 backdrop-blur-md border border-white/40 p-10 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Send a Packet</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Have a project involving network automation, embedded systems, or security hardening?
              </p>
              <a href="mailto:contact@faky.dev" className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-700/20">
                Initiate Handshake →
              </a>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <a href="https://github.com/ernestoCruz05" target="_blank" className="group bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4 hover:border-blue-500 transition-all">
                <div className="bg-gray-100 p-3 rounded-full group-hover:bg-blue-50 transition-colors">
                  {/* Github Icon */}
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </div>
                <span className="font-bold text-lg text-gray-800">GitHub</span>
                <span className="ml-auto text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="https://www.linkedin.com/in/ernesto-cruz-a59866381/" target="_blank" className="group bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4 hover:border-blue-500 transition-all">
                <div className="bg-gray-100 p-3 rounded-full group-hover:bg-blue-50 transition-colors">
                  {/* LinkedIn Icon */}
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </div>
                <span className="font-bold text-lg text-gray-800">LinkedIn</span>
                <span className="ml-auto text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-gray-200 text-gray-500 text-sm flex justify-between items-center">
          <p>&copy; 2025 Faky. All rights reserved.</p>
          <p className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">Est. 2005</p>
        </footer>
      </div>
    </main>
  );
}