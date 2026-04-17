"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

function SoftGlow({
  position,
  color,
  scale = 3.2,
  opacity = 0.16,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  opacity?: number;
}) {
  const material = useMemo(() => {
    return new THREE.SpriteMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color, opacity]);

  return (
    <sprite position={position} scale={[scale, scale, 1]} material={material} />
  );
}

function Ribbon({
  z,
  tint,
  rotation,
  segments = 220,
  speed = 0.12,
  radius = 1.55,
}: {
  z: number;
  tint: string;
  rotation: [number, number, number];
  segments?: number;
  speed?: number;
  radius?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const pts = [
      new THREE.Vector3(-2.2, -0.4, 0),
      new THREE.Vector3(-1.1, 0.8, 0),
      new THREE.Vector3(0.0, -0.1, 0),
      new THREE.Vector3(1.2, 0.65, 0),
      new THREE.Vector3(2.2, -0.25, 0),
    ];
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.6);
  }, []);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, segments, 0.12, 10, false);
  }, [curve, segments]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = rotation[1] + t * speed;
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.2) * 0.05;
    ref.current.rotation.z = rotation[2] + Math.cos(t * 0.18) * 0.04;
  });

  return (
    <Float speed={0.45} rotationIntensity={0.12} floatIntensity={0.32}>
      <mesh ref={ref} geometry={geometry} position={[0, 0, z]}>
        <MeshTransmissionMaterial
          color={tint}
          roughness={0.18}
          thickness={0.7}
          transmission={0.78}
          ior={1.35}
          chromaticAberration={0.02}
          anisotropy={0.15}
          distortion={0.08}
          distortionScale={0.18}
          temporalDistortion={0.09}
          transparent
        />
      </mesh>

      <mesh position={[0.1, -0.25, z - 0.7]} rotation={[0.2, 0.2, 0.1]}>
        <torusGeometry args={[radius, 0.035, 12, 80]} />
        <meshStandardMaterial
          color={tint}
          roughness={0.5}
          metalness={0.15}
          transparent
          opacity={0.09}
        />
      </mesh>
    </Float>
  );
}

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const px = state.pointer.x;
    const py = state.pointer.y;
    pointer.current.x += (px - pointer.current.x) * 0.04;
    pointer.current.y += (py - pointer.current.y) * 0.04;

    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = pointer.current.x * 0.18 + t * 0.03;
    groupRef.current.rotation.x =
      -pointer.current.y * 0.12 + Math.sin(t * 0.12) * 0.04;
    groupRef.current.position.x = pointer.current.x * 0.25;
    groupRef.current.position.y = pointer.current.y * 0.12;
  });

  return <group ref={groupRef}>{children}</group>;
}

function Scene() {
  // default segments are set at callsites
  return (
    <ParallaxRig>
      <SoftGlow
        position={[-1.5, 0.8, -1.4]}
        color="#a0aaff"
        scale={4.1}
        opacity={0.14}
      />
      <SoftGlow
        position={[1.6, -0.3, -1.2]}
        color="#78ffdc"
        scale={3.6}
        opacity={0.11}
      />
      <SoftGlow
        position={[0.0, 0.15, -2.2]}
        color="#ffffff"
        scale={5.2}
        opacity={0.06}
      />

      <Ribbon
        z={-2.0}
        tint="#cfd6ff"
        rotation={[0.2, 0.2, -0.1]}
        speed={0.07}
      />
      <Ribbon
        z={-1.2}
        tint="#ffffff"
        rotation={[-0.1, -0.25, 0.12]}
        speed={0.09}
        radius={1.35}
      />
      <Ribbon
        z={-0.55}
        tint="#8fffe3"
        rotation={[0.1, 0.35, 0.08]}
        speed={0.12}
        radius={1.6}
      />
    </ParallaxRig>
  );
}

export function HeroBackground3D() {
  const reduce = useReducedMotion();
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsSmall(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (reduce) {
    return (
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1100px 700px at 20% 10%, rgba(160,170,255,0.14), transparent 60%), radial-gradient(800px 520px at 78% 22%, rgba(120,255,220,0.10), transparent 62%), radial-gradient(900px 520px at 50% 95%, rgba(255,255,255,0.05), transparent 65%)",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        className="pointer-events-none"
        dpr={isSmall ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <AdaptiveDpr pixelated />
        <color attach="background" args={["#05070b"]} />
        <fog attach="fog" args={["#05070b", 2.4, 9]} />

        <ambientLight intensity={0.55} />
        <directionalLight
          position={[3, 4, 2]}
          intensity={1.0}
          color="#cfd6ff"
        />
        <directionalLight
          position={[-4, -2, 3]}
          intensity={0.6}
          color="#8fffe3"
        />

        {/* On small screens: keep it calmer + cheaper */}
        {isSmall ? (
          <ParallaxRig>
            <SoftGlow
              position={[-1.4, 0.7, -1.4]}
              color="#a0aaff"
              scale={3.8}
              opacity={0.12}
            />
            <SoftGlow
              position={[1.3, -0.2, -1.2]}
              color="#78ffdc"
              scale={3.3}
              opacity={0.09}
            />
            <Ribbon
              z={-1.6}
              tint="#cfd6ff"
              rotation={[0.2, 0.2, -0.1]}
              speed={0.06}
              segments={140}
            />
            <Ribbon
              z={-0.8}
              tint="#8fffe3"
              rotation={[0.1, 0.35, 0.08]}
              speed={0.09}
              radius={1.45}
              segments={140}
            />
          </ParallaxRig>
        ) : (
          <Scene />
        )}

        <Sparkles
          count={isSmall ? 18 : 34}
          size={isSmall ? 1.4 : 1.7}
          speed={isSmall ? 0.18 : 0.22}
          opacity={isSmall ? 0.12 : 0.16}
          scale={[8, 4.5, 6]}
          color="#cfd6ff"
          noise={isSmall ? 0.22 : 0.28}
        />
      </Canvas>
    </div>
  );
}

