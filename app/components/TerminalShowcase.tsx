"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ASCII Art for welcome message
const WELCOME_ASCII = ` ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗
 ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝
 ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗
 ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║
 ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║
 ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝`;

// Typing animation component
function TypingText({ text, speed = 2 }: { text: string; speed?: number }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isComplete) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                // Type multiple characters at once for faster effect
                const charsToAdd = Math.min(speed, text.length - index);
                setDisplayedText(text.substring(0, index + charsToAdd));
                index += charsToAdd;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, 10);

        return () => clearInterval(interval);
    }, [text, speed, isComplete]);

    return (
        <pre className="text-blue-400 text-xs leading-tight mb-2">
            {displayedText}
            {!isComplete && <span className="animate-pulse">▋</span>}
        </pre>
    );
}

// Project data as "files"
const projects: Record<string, {
    name: string;
    desc: string;
    longDesc: string;
    stack: string[];
    link: string;
    color: string;
}> = {
    "retlister": {
        name: "RetLister",
        desc: "Win32 Legacy Bridge",
        longDesc: "Bridged modern Axum backends with legacy Windows XP hardware. Engineered a custom TCP-to-HTTPS Proxy in Rust (embedded in Tauri) to enable secure communication for C-based Win32 clients.",
        stack: ["Rust", "Tauri", "Win32 API"],
        link: "https://github.com/ernestoCruz05/RetLister",
        color: "#0052cc",
    },
    "rustyroom": {
        name: "RustyRoom",
        desc: "Async TCP Chat Server",
        longDesc: "A high-concurrency TCP chat server built in Rust. Manages raw sockets, asynchronous I/O (Tokio), and custom packet framing to handle thousands of concurrent connections with minimal memory footprint.",
        stack: ["Rust", "Tokio", "WebSockets"],
        link: "https://github.com/ernestoCruz05/RustyRoom",
        color: "#d60045",
    },
    "librenms": {
        name: "LibreNMS",
        desc: "Network Observability Stack",
        longDesc: "Deployed a full network monitoring solution using LibreNMS on Docker. Configured SNMP polling, alerting pipelines, and custom dashboards for infrastructure visibility.",
        stack: ["Docker", "Alpine", "SNMP", "MySQL"],
        link: "#",
        color: "#00a3ff",
    },
    "unix-ipc": {
        name: "Unix IPC Bus",
        desc: "Low-level Message Queue",
        longDesc: "Implemented inter-process communication using Unix domain sockets, named pipes, and message queues. Designed for high-throughput, low-latency data exchange between system processes.",
        stack: ["C", "Syscalls", "POSIX IPC"],
        link: "https://github.com/ernestoCruz05/unix-topic-chat",
        color: "#22c55e",
    },
    "packet-sniffer": {
        name: "Packet Sniffer",
        desc: "Raw Socket Analyzer",
        longDesc: "Built a network packet analyzer using raw sockets in Python. Captures and decodes Ethernet frames, IP headers, TCP/UDP segments for traffic inspection and debugging.",
        stack: ["Python", "TCP/IP", "Raw Sockets"],
        link: "#",
        color: "#8b5cf6",
    },
    "homelab": {
        name: "Home Lab",
        desc: "Proxmox Cluster",
        longDesc: "Self-hosted virtualization cluster running Proxmox VE with ZFS storage, high-availability configuration, and automated VM provisioning via Ansible.",
        stack: ["Proxmox", "ZFS", "Ansible", "HA"],
        link: "#",
        color: "#f59e0b",
    },
};

type OutputLine = {
    type: "command" | "output" | "error" | "project" | "help" | "ascii" | "tree" | "history" | "skills" | "cowsay";
    content: string;
    projectKey?: string;
};

export default function TerminalShowcase() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<OutputLine[]>([
        { type: "ascii", content: "welcome" },
        { type: "output", content: "Type 'help' for available commands." },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentPath] = useState("~/projects");
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const focusInput = () => inputRef.current?.focus();

    const executeCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        const args = trimmed.split(/\s+/);
        const command = args[0];

        const newHistory: OutputLine[] = [
            ...history,
            { type: "command", content: `${currentPath} $ ${cmd}` },
        ];

        if (!command) {
            setHistory(newHistory);
            return;
        }

        switch (command) {
            case "help":
                newHistory.push({
                    type: "help",
                    content: `
Available commands:
  ls              List all projects
  tree            Show project structure
  cat <name>      View project details
  history         Career timeline
  skills          Technical skills breakdown
  whoami          About me
  neofetch        System info
  contact         Contact information
  github          Open GitHub profile
  linkedin        Open LinkedIn profile
  cowsay <msg>    moo
  clear           Clear terminal
                    `.trim(),
                });
                break;

            case "ls":
                newHistory.push({
                    type: "output",
                    content: Object.keys(projects)
                        .map((key) => ` ${key}`)
                        .join("\n"),
                });
                break;

            case "cat":
                const projectKey = args[1];
                if (!projectKey) {
                    newHistory.push({
                        type: "error",
                        content: "Usage: cat <project-name>",
                    });
                } else if (projects[projectKey]) {
                    newHistory.push({
                        type: "project",
                        content: projectKey,
                        projectKey: projectKey,
                    });
                } else {
                    newHistory.push({
                        type: "error",
                        content: `cat: ${projectKey}: No such file or directory`,
                    });
                }
                break;

            case "clear":
                setHistory([]);
                return;

            case "whoami":
                newHistory.push({
                    type: "output",
                    content: `ernesto_cruz
Systems & Network Engineer
Focus: Low-level Systems (Rust/C), Network Protocols, Hardened Infrastructure`,
                });
                break;

            case "neofetch":
                newHistory.push({
                    type: "ascii",
                    content: "neofetch",
                });
                break;

            case "pwd":
                newHistory.push({
                    type: "output",
                    content: "/home/ernesto/projects",
                });
                break;

            case "cd":
                newHistory.push({
                    type: "error",
                    content: "Nice try, but you're stuck here ",
                });
                break;

            case "sudo":
                newHistory.push({
                    type: "error",
                    content: "ernesto is not in the sudoers file. This incident will be reported.",
                });
                break;

            case "rm":
                newHistory.push({
                    type: "error",
                    content: "Permission denied: these projects are read-only ",
                });
                break;

            case "tree":
                newHistory.push({
                    type: "tree",
                    content: "tree",
                });
                break;

            case "history":
                newHistory.push({
                    type: "history",
                    content: "history",
                });
                break;

            case "skills":
                newHistory.push({
                    type: "skills",
                    content: "skills",
                });
                break;

            case "contact":
                newHistory.push({
                    type: "output",
                    content: ` Email:    contact@faky.dev
 GitHub:   github.com/ernestoCruz05
 LinkedIn: linkedin.com/in/ernesto-cruz-a59866381

Type 'github' or 'linkedin' to open directly.`,
                });
                break;

            case "github":
                window.open("https://github.com/ernestoCruz05", "_blank");
                newHistory.push({
                    type: "output",
                    content: "Opening GitHub profile...",
                });
                break;

            case "linkedin":
                window.open("https://www.linkedin.com/in/ernesto-cruz-a59866381/", "_blank");
                newHistory.push({
                    type: "output",
                    content: "Opening LinkedIn profile...",
                });
                break;

            case "cowsay":
                const message = args.slice(1).join(" ") || "Moo! Hire Ernesto!";
                newHistory.push({
                    type: "cowsay",
                    content: message,
                });
                break;

            case "man":
                if (args[1] === "ernesto") {
                    newHistory.push({
                        type: "help",
                        content: `ERNESTO(1)                   User Commands                   ERNESTO(1)

NAME
       ernesto - Systems & Network Engineer

SYNOPSIS
       ernesto [--hire] [--contact] [--projects]

DESCRIPTION
       A passionate engineer specializing in low-level systems,
       network protocols, and infrastructure automation.
       
       Known for building reliable systems in unreliable networks.

OPTIONS
       --hire     Initiate recruitment process
       --rust     Enable high-performance mode
       --coffee   Required for optimal operation

BUGS
       None known. Only features.

AUTHOR
       Written by Ernesto Cruz.

SEE ALSO
       github(1), linkedin(1), projects(1)`,
                    });
                } else {
                    newHistory.push({
                        type: "error",
                        content: `No manual entry for ${args[1] || ""}. Try 'man ernesto'.`,
                    });
                }
                break;

            case "date":
                newHistory.push({
                    type: "output",
                    content: new Date().toString(),
                });
                break;

            case "echo":
                newHistory.push({
                    type: "output",
                    content: args.slice(1).join(" "),
                });
                break;

            case "ping":
                newHistory.push({
                    type: "output",
                    content: `PING recruiter.company.com: 64 bytes: icmp_seq=0 ttl=64 time=0.042ms
--- recruiter.company.com ping statistics ---
1 packets transmitted, 1 received, 0% packet loss
Connection established! Ready to collaborate. `,
                });
                break;

            default:
                newHistory.push({
                    type: "error",
                    content: `command not found: ${command}. Type 'help' for available commands.`,
                });
        }

        setHistory(newHistory);
        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            // Auto-complete project names
            const args = input.trim().split(/\s+/);
            if (args[0] === "cat" && args.length === 2) {
                const partial = args[1].toLowerCase();
                const match = Object.keys(projects).find((k) => k.startsWith(partial));
                if (match) {
                    setInput(`cat ${match}`);
                }
            }
        }
    };

    return (
        <div
            className="w-full max-w-6xl h-[calc(100vh-8rem)] mx-auto bg-[#0a0f1a] rounded-lg border border-blue-900/30 shadow-2xl overflow-hidden font-mono text-sm flex flex-col"
            onClick={focusInput}
        >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1629] border-b border-blue-900/30">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27ca40]"></div>
                </div>
                <span className="text-blue-300/60 text-xs ml-4">ernesto@portfolio: ~/projects</span>
            </div>

            {/* Terminal Body */}
            <div
                ref={terminalRef}
                className="p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700"
            >
                <AnimatePresence>
                    {history.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                            className="mb-2"
                        >
                            {line.type === "command" && (
                                <div className="text-gray-300">
                                    <span className="text-blue-400">❯</span> {line.content.replace(`${currentPath} $ `, "")}
                                </div>
                            )}
                            {line.type === "output" && (
                                <div className="text-blue-200/70 whitespace-pre-wrap pl-2">{line.content}</div>
                            )}
                            {line.type === "error" && (
                                <div className="text-red-400 pl-2">{line.content}</div>
                            )}
                            {line.type === "help" && (
                                <div className="text-blue-300 whitespace-pre-wrap pl-2">{line.content}</div>
                            )}
                            {line.type === "ascii" && line.content === "welcome" && (
                                <TypingText text={WELCOME_ASCII} speed={8} />
                            )}
                            {line.type === "ascii" && line.content === "neofetch" && (
                                <div className="flex gap-6 text-xs">
                                    <pre className="text-blue-400 leading-tight">
                                        {`                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`}
                                    </pre>
                                    <div className="text-blue-100/80 leading-relaxed">
                                        <span className="text-blue-400 font-bold">ernesto</span>@<span className="text-blue-400 font-bold">portfolio</span><br />
                                        ─────────────────<br />
                                        <span className="text-blue-400">OS:</span> Arch Linux x86_64<br />
                                        <span className="text-blue-400">Host:</span> Systems Engineer<br />
                                        <span className="text-blue-400">Kernel:</span> Rust, C, Python<br />
                                        <span className="text-blue-400">Uptime:</span> 5+ years<br />
                                        <span className="text-blue-400">Shell:</span> zsh 5.9<br />
                                        <span className="text-blue-400">DE:</span> VS Code + Neovim<br />
                                        <span className="text-blue-400">Terminal:</span> Alacritty<br />
                                        <span className="text-blue-400">CPU:</span> Problem Solver<br />
                                        <span className="text-blue-400">Memory:</span> Caffeinated<br />
                                    </div>
                                </div>
                            )}
                            {line.type === "tree" && (
                                <pre className="text-blue-200/70 pl-2 text-xs">
                                    {`~/projects
├──  systems/
│   ├── retlister      Win32 Legacy Bridge
│   └── rustyroom      Async TCP Chat Server
│
├──  networking/
│   ├── librenms       Network Observability Stack
│   └── packet-sniffer Raw Socket Analyzer
│
└──   infrastructure/
    ├── unix-ipc       Low-level Message Queue
    └── homelab        Proxmox Cluster

6 projects, 3 categories`}
                                </pre>
                            )}
                            {line.type === "history" && (
                                <div className="pl-2 text-xs">
                                    <div className="text-blue-300 mb-2"> Timeline</div>
                                    <div className="border-l-2 border-blue-800/50 pl-4 space-y-3">
                                        <div>
                                            <span className="text-blue-400">2023 - Present</span>
                                            <div className="text-blue-100/80"> Engenharia Informática @ ISEC</div>
                                            <div className="text-blue-200/50">Computer Engineering degree, focus on systems and networks</div>
                                        </div>
                                        <div>
                                            <span className="text-blue-400">2020 - 2023</span>
                                            <div className="text-blue-100/80"> Self-taught Programming</div>
                                            <div className="text-blue-200/50">Learned Rust, C, Python. Built home lab infrastructure and personal projects</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {line.type === "skills" && (
                                <div className="pl-2 text-xs space-y-2">
                                    <div className="text-blue-300 mb-2"> Technical Skills</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <div className="text-blue-400 mb-1">Languages</div>
                                            <SkillBar name="Rust" level={85} />
                                            <SkillBar name="C / C++" level={75} />
                                            <SkillBar name="Python" level={80} />
                                            <SkillBar name="Bash" level={90} />
                                        </div>
                                        <div>
                                            <div className="text-blue-400 mb-1">Infrastructure</div>
                                            <SkillBar name="Linux" level={95} />
                                            <SkillBar name="Docker" level={85} />
                                            <SkillBar name="Networking" level={90} />
                                            <SkillBar name="Ansible" level={75} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {line.type === "cowsay" && (
                                <pre className="text-blue-200/70 pl-2 text-xs">
                                    {` ${"_".repeat(line.content.length + 2)}
< ${line.content} >
 ${"-".repeat(line.content.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
                                </pre>
                            )}
                            {line.type === "project" && line.projectKey && (
                                <ProjectCard project={projects[line.projectKey]} />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Input Line */}
                <div className="flex items-center text-gray-300 mt-2">
                    <span className="text-blue-400 mr-2">❯</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none caret-blue-400"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <span className="animate-pulse text-blue-400">▋</span>
                </div>
            </div>

            {/* Hint Bar */}
            <div className="px-4 py-2 bg-[#0f1629] border-t border-blue-900/30 text-xs text-blue-300/50">
                <span className="text-blue-300/70">Hint:</span> Try{" "}
                <code className="bg-blue-900/20 px-1 rounded text-blue-300">ls</code> to list projects,{" "}
                <code className="bg-blue-900/20 px-1 rounded text-blue-300">cat retlister</code> to view details
            </div>
        </div>
    );
}

// Project Card Component
function ProjectCard({ project }: { project: typeof projects[string] }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f1629] border border-blue-900/30 rounded-lg p-4 my-2 ml-2"
        >
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3
                        className="text-lg font-bold"
                        style={{ color: project.color }}
                    >
                        {project.name}
                    </h3>
                    <p className="text-blue-200/50 text-xs">{project.desc}</p>
                </div>
                <span
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: project.color }}
                ></span>
            </div>

            <p className="text-blue-100/70 text-sm mb-4 leading-relaxed">
                {project.longDesc}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-blue-900/20 text-blue-200 border border-blue-800/30"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {project.link !== "#" ? (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                </a>
            ) : (
                <span className="text-blue-300/50 text-sm"> Internal Project</span>
            )}
        </motion.div>
    );
}

// Skill Bar Component
function SkillBar({ name, level }: { name: string; level: number }) {
    return (
        <div className="flex items-center gap-2 mb-1">
            <span className="text-blue-100/70 w-20">{name}</span>
            <div className="flex-1 h-2 bg-blue-900/30 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
            <span className="text-blue-300/50 text-[10px] w-8">{level}%</span>
        </div>
    );
}
