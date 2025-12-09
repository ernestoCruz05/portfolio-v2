import NetworkBackground from "./components/NetworkBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <NetworkBackground />

      <div className="container mx-auto px-4">
        {/* --- HERO SECTION --- */}
        <section className="min-h-[85vh] flex flex-col justify-center max-w-3xl pt-20">
          <div>
            <span className="status-pill">
              Systems & Network Engineer
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Building reliable systems<br />
            in an unreliable net.
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
            I bridge the gap between software and infrastructure. Specializing in{" "}
            <strong>Low-level Systems (Rust/C)</strong>,{" "}
            <strong>Network Protocols</strong>, and{" "}
            <strong>Hardened Infrastructure</strong>.
          </p>
        </section>

        {/* --- SKILLS SECTION (REBRANDED) --- */}
        <h2 className="text-2xl font-bold mb-8 border-b-2 border-gray-200 pb-2 inline-block">
          Technical Proficiency
        </h2>
        <div className="tech-grid mb-24">
          {/* Card 1: Systems (Priority) */}
          <div className="tech-card">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Systems Engineering
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="tag highlight">Rust</span>
              <span className="tag">C / C++</span>
              <span className="tag">Linux Hardening</span>
              <span className="tag">OS Internals</span>
              <span className="tag">IPC / Sockets</span>
            </div>
          </div>

          {/* Card 2: Infrastructure (The Bridge) */}
          <div className="tech-card">
            <h3 className="text-lg font-bold mb-4">Infrastructure & DevOps</h3>
            <div className="flex flex-wrap gap-2">
              <span className="tag highlight">Ansible</span>
              <span className="tag">Docker</span>
              <span className="tag">Proxmox PVE</span>
              <span className="tag">Zabbix</span>
              <span className="tag">Git</span>
            </div>
          </div>

          {/* Card 3: Networking (The Superpower) */}
          <div className="tech-card">
            <h3 className="text-lg font-bold mb-4">Network Analysis</h3>
            <div className="flex flex-wrap gap-2">
              <span className="tag highlight">Wireshark</span>
              <span className="tag">Cisco Packet Tracer</span>
              <span className="tag">OPNsense</span>
              <span className="tag">VRRP / VLANs</span>
              <span className="tag">TCP/IP Stack</span>
            </div>
          </div>
        </div>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="mb-24">
          <h2 className="text-2xl font-bold mb-12 border-b-2 border-gray-200 pb-2 inline-block">
            Selected Deployments
          </h2>

          {/* Project 1: RetLister */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12 flex flex-col md:flex-row hover:border-blue-500 transition-colors duration-300">
            <div className="p-10 md:w-1/2">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                Legacy Integration System
              </div>
              <h3 className="text-2xl font-bold mb-4">RetLister: Win32 Bridge</h3>
              <p className="text-gray-600 mb-6">
                Bridged modern Axum backends with legacy <strong>Windows XP</strong> hardware.
                Engineered a custom <strong>TCP-to-HTTPS Proxy</strong> in Rust (embedded in Tauri)
                to enable secure communication for C-based Win32 clients.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="tag">Rust (Axum)</span>
                <span className="tag">Tauri</span>
                <span className="tag">Win32 API</span>
                <span className="tag">TCP Proxy</span>
              </div>
              <a href="https://github.com/ernestoCruz05/RetLister" className="text-blue-700 font-bold border-b border-blue-700 pb-0.5 hover:text-blue-900">
                View Architecture &rarr;
              </a>
            </div>
            {/* Placeholder for your XP/Modern visual - can be added back as an Image later */}
            <div className="bg-gray-100 md:w-1/2 min-h-[300px] border-l border-gray-100"></div>
          </article>

          {/* Project 2: RustyRoom */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12 flex flex-col md:flex-row-reverse hover:border-blue-500 transition-colors duration-300">
            <div className="p-10 md:w-1/2">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                Low-Level Concurrency
              </div>
              <h3 className="text-2xl font-bold mb-4">RustyRoom: Async Server</h3>
              <p className="text-gray-600 mb-6">
                A high-concurrency TCP chat server built in <strong>Rust</strong>.
                Manages raw sockets, asynchronous I/O (Tokio), and custom packet framing
                to handle thousands of concurrent connections with minimal memory footprint.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="tag">Rust (Tokio)</span>
                <span className="tag">TCP Sockets</span>
                <span className="tag">Async I/O</span>
                <span className="tag">Protocol Design</span>
              </div>
              <a href="https://github.com/ernestoCruz05/RustyRoom" className="text-blue-700 font-bold border-b border-blue-700 pb-0.5 hover:text-blue-900">
                View Source &rarr;
              </a>
            </div>
            <div className="bg-[#1e1e1e] md:w-1/2 min-h-[300px] flex items-center justify-center border-r border-gray-100">
              {/* Simple code snippet visual */}
              <div className="font-mono text-xs text-gray-300 p-8">
                <span className="text-pink-400">async fn</span> handle_connection() &#123;<br />
                &nbsp;&nbsp;<span className="text-blue-400">while let</span> Some(msg) = socket.read() &#123;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;broker.broadcast(msg).<span className="text-yellow-300">await</span>;<br />
                &nbsp;&nbsp;&#125;<br />
                &#125;
              </div>
            </div>
          </article>

          {/* Project 3: LibreNMS (Added from CV) */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12 flex flex-col md:flex-row hover:border-blue-500 transition-colors duration-300">
            <div className="p-10 md:w-1/2">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                Network Observability
              </div>
              <h3 className="text-2xl font-bold mb-4">Network Monitoring Stack</h3>
              <p className="text-gray-600 mb-6">
                Deployed a full observability stack using <strong>LibreNMS</strong> on hardened <strong>Alpine Linux</strong> containers.
                Configured SNMP auto-discovery for Cisco devices, tuned polling intervals for performance,
                and mapped complex VLAN topologies.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="tag">Docker</span>
                <span className="tag">Alpine Linux</span>
                <span className="tag">SNMP</span>
                <span className="tag">Cisco IOS</span>
              </div>
            </div>
            <div className="bg-gray-100 md:w-1/2 min-h-[300px] border-l border-gray-100 flex items-center justify-center text-gray-400 font-mono">
              [ Topology Map Placeholder ]
            </div>
          </article>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="pb-24">
          <h2 className="text-2xl font-bold mb-8 border-b-2 border-gray-200 pb-2 inline-block">
            Contact Me
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="tech-card flex-1">
              <h3 className="text-xl font-bold mb-2">Send a Packet</h3>
              <p className="text-gray-600 mb-6">
                Interested in low-level systems programming or network automation?
              </p>
              <a href="mailto:contact@faky.dev" className="inline-block bg-blue-700 text-white px-6 py-3 rounded font-bold hover:bg-blue-800 transition-colors">
                Initiate Handshake &rarr;
              </a>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {/* Social Links would go here, preserved from your original code */}
              <a href="https://github.com/ernestoCruz05" target="_blank" className="bg-white/50 p-4 rounded border border-gray-200 flex items-center gap-3 hover:bg-white transition-colors">
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/ernesto-cruz-a59866381/" target="_blank" className="bg-white/50 p-4 rounded border border-gray-200 flex items-center gap-3 hover:bg-white transition-colors">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-gray-200 text-gray-500 text-sm flex justify-between">
          <p>&copy; 2025 Faky. All rights reserved.</p>
          <p className="font-mono">Est. 2005</p>
        </footer>
      </div>
    </main>
  );
}