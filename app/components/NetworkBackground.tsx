"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

// --- SINGLE NODE COMPONENT ---
function Node({ position, offset }: { position: [number, number, number], offset: number }) {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            const t = state.clock.getElapsedTime();
            // Original float logic: Math.sin(time + offset) * 0.5
            group.current.position.y = position[1] + Math.sin(t + offset) * 0.5;
        }
    });

    return (
        <group ref={group} position={position}>
            {/* Solid Inner Cylinder */}
            <mesh rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 6]} />
                <meshStandardMaterial color="#222222" roughness={0.6} metalness={0.1} />
            </mesh>
            {/* Wireframe Edge */}
            <lineSegments>
                <edgesGeometry args={[new THREE.CylinderGeometry(0.5, 0.5, 0.2, 6)]} />
                <lineBasicMaterial color="#555555" transparent opacity={0.4} />
            </lineSegments>
        </group>
    );
}

// --- PACKET COMPONENT ---
function Packet({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) {
    const mesh = useRef<THREE.Mesh>(null);
    const [progress, setProgress] = useState(0);
    const speed = useMemo(() => 0.005 + Math.random() * 0.008, []);

    useFrame(() => {
        if (mesh.current) {
            const newProgress = (progress + speed) % 1;
            setProgress(newProgress);
            mesh.current.position.lerpVectors(start, end, newProgress);

            // Reset packet height based on the floating nodes logic roughly
            // (Simplified: keeping packets straight for performance or calculate dynamic node y)
        }
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color="#0052cc" transparent />
        </mesh>
    );
}

// --- MAIN SCENE ---
function SceneContent() {
    const count = 35;
    const connectionDist = 7.5;

    // Generate Nodes Data
    const nodes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 35,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 15
                ),
                offset: Math.random() * Math.PI * 2,
            });
        }
        return temp;
    }, []);

    // Generate Edges & Packets
    const { edges, packets } = useMemo(() => {
        const _edges = [];
        const _packets = [];

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = nodes[i].position.distanceTo(nodes[j].position);
                if (dist < connectionDist) {
                    _edges.push({ start: nodes[i].position, end: nodes[j].position });
                    // 20% chance to spawn a packet on this edge
                    if (Math.random() > 0.8) {
                        _packets.push({ start: nodes[i].position, end: nodes[j].position });
                    }
                }
            }
        }
        return { edges: _edges, packets: _packets };
    }, [nodes]);

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 20, 10]} intensity={1} />
            <pointLight position={[0, -10, 0]} color="#0052cc" intensity={2} distance={50} />

            {/* Fog to match background */}
            <fog attach="fog" args={[0xdde1e7, 0.035]} />

            {nodes.map((node, i) => (
                <Node key={i} position={[node.position.x, node.position.y, node.position.z]} offset={node.offset} />
            ))}

            {edges.map((edge, i) => (
                <line key={`line-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[new Float32Array([...edge.start.toArray(), ...edge.end.toArray()]), 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#cccccc" transparent opacity={0.15} />
                </line>
            ))}

            {packets.map((p, i) => (
                <Packet key={`packet-${i}`} start={p.start} end={p.end} />
            ))}
        </>
    );
}

export default function NetworkBackground() {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 5, 15], fov: 70 }}>
                <SceneContent />
            </Canvas>
        </div>
    );
}