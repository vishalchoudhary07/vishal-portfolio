// src/components/Hero3D.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function WireframeShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  // useFrame runs 60 times a second
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.25;

    const targetX = state.pointer.x * 2;
    const targetY = state.pointer.y * 2;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 2]} />
      <meshBasicMaterial 
        color="#10b981" 
        wireframe={true} 
        transparent 
        opacity={0.3} 
      />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <WireframeShape />
      </Canvas>
    </div>
  );
}