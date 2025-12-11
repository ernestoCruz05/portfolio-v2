"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, PerspectiveCamera, useCursor } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

const projects = [
    {
        title: "RetLister",
        desc: "Win32 Legacy Bridge",
        stack: ["Rust", "Tauri", "Win32"],
        color: "#0052cc",
        link: "https://github.com/ernestoCruz05/RetLister",
    },
    {
        title: "RustyRoom",
        desc: "Async TCP Server",
        stack: ["Rust", "Tokio", "WebSockets"],
        color: "#d60045",
        link: "https://github.com/ernestoCruz05/RustyRoom",
    },
    {
        title: "LibreNMS",
        desc: "Network Observability",
        stack: ["Docker", "Alpine", "SNMP"],
        color: "#00a3ff",
        link: "#",
    },
    {
        title: "Unix IPC Bus",
        desc: "Low-level Message Queue",
        stack: ["C", "Syscalls", "Pipes"],
        color: "#22c55e",
        link: "https://github.com/ernestoCruz05/unix-topic-chat",
    },
    {
        title: "Packet Sniffer",
        desc: "Raw Socket Analyzer",
        stack: ["Python", "TCP/IP", "Raw Sockets"],
        color: "#8b5cf6",
        link: "#",
    },
    {
        title: "Home Lab",
        desc: "Proxmox Cluster",
        stack: ["Virtualization", "ZFS", "HA"],
        color: "#f59e0b",
        link: "#",
    },
];

function ProjectCard({ project, index, total }: { project: typeof projects[number]; index: number; total: number }) {
    const mesh = useRef<THREE.Group>(null!);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    const x = (index % 3 - 1) * 3.5;
    const y = Math.floor(index / 3) * -2.5 + 1.5;

    useFrame((state) => {
        if (!mesh.current) return;

        // Smooth tilt effect towards mouse
        const { x: mouseX, y: mouseY } = state.pointer;

        const targetRotX = (mouseY * 0.5) + (hovered ? -0.2 : 0); // Look up/down
        const targetRotY = (mouseX * 0.5); // Look left/right

        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotX, 0.1);
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotY, 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <motion.group
                ref={mesh}
                position={[x, y, 0]}
                initial={{ scale: 0, z: -5 }}
                animate={{ scale: 1, z: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={() => window.open(project.link, "_blank")}
            >
                {/* Glass Panel Mesh */}
                <mesh>
                    <boxGeometry args={[3, 2, 0.1]} />
                    <meshPhysicalMaterial
                        color={hovered ? "#ffffff" : "#f0f0f0"}
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.5} // Glass effect
                        thickness={0.5}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Glowing Border */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3.05, 2.05, 0.08]} />
                    <meshBasicMaterial color={project.color} wireframe transparent opacity={0.3} />
                </mesh>

                {/* HTML Content Overlay */}
                <Html transform position={[0, 0, 0.06]} className="pointer-events-none">
                    <div className={`w-[280px] h-[180px] flex flex-col justify-center items-center text-center p-4 select-none transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-90'}`}>
                        <h3 className="text-2xl font-bold text-gray-900 font-sans tracking-tight mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-600 font-mono mb-4">{project.desc}</p>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {project.stack.map((tech: string) => (
                                <span key={tech} className="text-[10px] bg-gray-900/5 px-2 py-1 rounded border border-gray-900/10 font-mono text-gray-700">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Hover instruction */}
                        <div className={`mt-4 text-[10px] uppercase tracking-widest text-blue-600 font-bold transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                            :: Access Terminal ::
                        </div>
                    </div>
                </Html>
            </motion.group>
        </Float>
    );
}

// --- MAIN SCENE ---
export default function ProjectShowcase() {
    return (
        <div className="w-full h-[80vh] relative">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -5]} color="#0052cc" intensity={2} />

                {/* Background Fog to fade out distant objects */}
                <fog attach="fog" args={['#dde1e7', 5, 20]} />

                <group position={[0, 0.5, 0]}>
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} total={projects.length} />
                    ))}
                </group>
            </Canvas>
        </div>
    );
}