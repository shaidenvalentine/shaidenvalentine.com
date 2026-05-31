"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Ambient volcanic atmosphere — drifting ember motes + a slow warm glow.
// Pure background; the portrait + glass live in the DOM above this canvas.

function Embers({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      speeds[i] = 0.4 + Math.random() * 1.2;
      sizes[i] = 0.5 + Math.random() * 1.6;
    }
    return { positions, speeds, sizes };
  }, [count]);

  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(201,168,116,0.9)");
    g.addColorStop(0.4, "rgba(160,110,60,0.5)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // gentle upward drift, wrapping
      arr[i * 3 + 1] += speeds[i] * 0.012;
      arr[i * 3] += Math.sin(t * 0.3 + i) * 0.0025;
      if (arr[i * 3 + 1] > 20) arr[i * 3 + 1] = -20;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    // subtle parallax toward pointer
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      state.pointer.x * 0.12,
      0.03
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -state.pointer.y * 0.08,
      0.03
    );
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.55}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.7}
      />
    </points>
  );
}

function Glow() {
  // A soft warm plane low in the frame — the volcanic underlight.
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.18 + Math.sin(t * 0.4) * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, -14, -6]}>
      <circleGeometry args={[22, 48]} />
      <meshBasicMaterial color="#3A2418" transparent opacity={0.2} />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 18], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Glow />
      <Embers />
    </Canvas>
  );
}
