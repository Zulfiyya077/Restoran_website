"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera, OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";

function DishModel() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.005;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef}>
                <cylinderGeometry args={[2, 2.2, 0.4, 32]} />
                <meshStandardMaterial color="#013220" roughness={0.1} metalness={0.8} />

                {/* Abstract floating food elements */}
                <mesh position={[0, 0.3, 0]}>
                    <torusGeometry args={[1.2, 0.2, 16, 100]} />
                    <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.2} />
                </mesh>

                <mesh position={[0.5, 0.5, 0.5]} rotation={[Math.PI / 4, 0, 0]}>
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshStandardMaterial color="#8B0000" />
                </mesh>

                <mesh position={[-0.5, 0.5, -0.5]} rotation={[0, Math.PI / 3, 0]}>
                    <octahedronGeometry args={[0.3]} />
                    <meshStandardMaterial color="#D4AF37" />
                </mesh>
            </mesh>
        </Float>
    );
}

export default function ThreeDish() {
    return (
        <div className="w-full h-[400px] cursor-grab active:cursor-grabbing">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Stage environment="city" intensity={0.6}>
                    <DishModel />
                </Stage>

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
