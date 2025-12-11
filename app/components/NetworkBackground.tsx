"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

// --- CAMERA RIG COMPONENT ---
// Moves the camera slightly based on mouse position for a 3D parallax effect
function CameraRig() {
    useFrame((state) => {
        const { camera, pointer } = state;
        // Smoothly interpolate camera position
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 2, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 2 + 2, 0.05);
        camera.lookAt(0, 0, 0);
    });
    return null;
}

// --- SINGLE NODE COMPONENT ---
function Node({ position, offset }: { position: [number, number, number], offset: number }) {
    const group = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.Mesh>(null);

    // Random blink speed for each node
    const blinkSpeed = useMemo(() => 2 + Math.random() * 5, []);

    useFrame((state) => {
        if (group.current) {
            const t = state.clock.getElapsedTime();
            // Floating animation
            group.current.position.y = position[1] + Math.sin(t + offset) * 0.5;

            // Blinking status light logic
            if (lightRef.current) {
                // Sine wave > 0.5 creates a "digital" blink effect (on/off)
                const intensity = Math.sin(t * blinkSpeed) > 0.5 ? 1 : 0.2;
                (lightRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
            }
        }
    });

    return (
        <group ref={group} position={position}>
            {/* Main Cylinder - Lighter Silver Color for better lighting */}
            <mesh rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 6]} />
                <meshStandardMaterial
                    color="#e5e5e5"
                    roughness={0.4}
                    metalness={0.5}
                    flatShading={true}
                />
            </mesh>

            {/* Status Light (Green dot on top) */}
            <mesh ref={lightRef} position={[0, 0.15, 0.3]} rotation={[0.5, 0, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#00ff41" transparent />
            </mesh>

            {/* Wireframe Edge */}
            <lineSegments>
                <edgesGeometry args={[new THREE.CylinderGeometry(0.5, 0.5, 0.2, 6)]} />
                <lineBasicMaterial color="#555555" transparent opacity={0.2} />
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
        }
    });

    return (
        <group>
            <Trail
                width={0.2}
                length={4}
                color={new THREE.Color("#0052cc")}
                attenuation={(t) => t * t} // Makes the tail fade out nicely
            >
                <mesh ref={mesh}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshBasicMaterial color="#4d94ff" toneMapped={false} />
                </mesh>
            </Trail>
        </group>
    );
}

// --- MAIN SCENE CONTENT ---
function SceneContent() {
    const count = 35;
    const connectionDist = 7.5;

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

    const { edges, packets } = useMemo(() => {
        const _edges = [];
        const _packets = [];

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = nodes[i].position.distanceTo(nodes[j].position);
                if (dist < connectionDist) {
                    _edges.push({ start: nodes[i].position, end: nodes[j].position });
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
            {/* Lighting Setup */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[0, -10, 0]} color="#0052cc" intensity={5} distance={20} />

            {/* Fog blends the distant nodes into the background color */}
            <fog attach="fog" args={[0xdde1e7, 5, 40]} />

            {/* Render Nodes */}
            {nodes.map((node, i) => (
                <Node key={i} position={[node.position.x, node.position.y, node.position.z]} offset={node.offset} />
            ))}

            {/* Render Connection Lines */}
            {edges.map((edge, i) => (
                <line key={`line-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            // Fix for TypeScript error: pass array and itemSize in args
                            args={[
                                new Float32Array([...edge.start.toArray(), ...edge.end.toArray()]),
                                3
                            ]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#cccccc" transparent opacity={0.2} />
                </line>
            ))}

            {/* Render Packets with Trails */}
            {packets.map((p, i) => (
                <Packet key={`packet-${i}`} start={p.start} end={p.end} />
            ))}
        </>
    );
}

export default function NetworkBackground() {
    return (
        <div className="canvas-container">
            {/* Enable alpha to let CSS background show through */}
            <Canvas camera={{ position: [0, 0, 18], fov: 60 }} gl={{ alpha: true }}>
                <CameraRig />
                <SceneContent />
            </Canvas>
        </div>
    );
}