"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PlexusParticles({ count = 100 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            temp[i * 3] = (Math.random() - 0.5) * 10;
            temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
            temp[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return temp;
    }, [count]);

    const velocities = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            temp[i * 3] = (Math.random() - 0.5) * 0.01;
            temp[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            temp[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current || !linesRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const linePositions: number[] = [];
        const maxDistanceSq = 2.25; // 1.5 * 1.5

        for (let i = 0; i < count; i++) {
            positions[i * 3] += velocities[i * 3];
            positions[i * 3 + 1] += velocities[i * 3 + 1];
            positions[i * 3 + 2] += velocities[i * 3 + 2];

            // Boundary check
            if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
            if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
            if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

            // Lines - Simplified N^2 loop
            for (let j = i + 1; j < count; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < maxDistanceSq) {
                    linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                    linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
                }
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={particles}
                        itemSize={3}
                        args={[particles, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial color="#CBB26A" size={0.05} transparent opacity={0.6} />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#CBB26A" transparent opacity={0.15} />
            </lineSegments>
        </>
    );
}

export default function PlexusBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} frameloop="always">
                <PlexusParticles count={45} />
            </Canvas>
        </div>
    );
}
