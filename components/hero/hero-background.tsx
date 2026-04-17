"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

/** Muted palette — cool neutrals, no neon / no “crypto green”. */
const BG = "#09090b";
const FOG_COLOR = "#09090b";

function SoftGlow({
  position,
  color,
  scale = 3,
  opacity = 0.05,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  opacity?: number;
}) {
  const material = useMemo(
    () =>
      new THREE.SpriteMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color, opacity],
  );

  return (
    <sprite position={position} scale={[scale, scale, 1]} material={material} />
  );
}

/** Very slow additive drift — suggests depth, not sparkle. */
function GentleParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = (i: number, salt: number) => {
      const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453123;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rnd(i, 1) - 0.5) * 7;
      pos[i * 3 + 1] = (rnd(i, 2) - 0.5) * 4.2;
      pos[i * 3 + 2] = (rnd(i, 3) - 0.5) * 3.5 - 0.8;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.011;
    ref.current.rotation.x = t * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#9aa6c8"
        transparent
        opacity={0.14}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function VignettePlane() {
  return (
    <mesh position={[0, 0, -3.4]}>
      <planeGeometry args={[14, 9]} />
      <meshBasicMaterial
        transparent
        opacity={0.82}
        color={BG}
        blending={THREE.MultiplyBlending}
      />
    </mesh>
  );
}

/** Single continuous ribbon — glassy, unhurried. Torus removed for a cleaner silhouette. */
function FlowRibbon({
  z,
  tint,
  rotation,
  segments,
  speed,
  tubeRadius,
}: {
  z: number;
  tint: string;
  rotation: [number, number, number];
  segments: number;
  speed: number;
  tubeRadius: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const pts = [
      new THREE.Vector3(-2.35, -0.35, 0),
      new THREE.Vector3(-1.2, 0.75, 0),
      new THREE.Vector3(0.05, -0.08, 0),
      new THREE.Vector3(1.15, 0.58, 0),
      new THREE.Vector3(2.35, -0.2, 0),
    ];
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.55);
  }, []);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, segments, tubeRadius, 8, false),
    [curve, segments, tubeRadius],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = rotation[1] + t * speed;
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.07) * 0.015;
    ref.current.rotation.z = rotation[2] + Math.cos(t * 0.06) * 0.012;
  });

  return (
    <Float
      speed={0.35}
      rotationIntensity={0.04}
      floatingRange={[-0.06, 0.06]}
      floatIntensity={0.1}
    >
      <mesh ref={ref} geometry={geometry} position={[0, 0, z]}>
        <MeshTransmissionMaterial
          color={tint}
          roughness={0.32}
          thickness={0.48}
          transmission={0.58}
          ior={1.33}
          chromaticAberration={0}
          anisotropy={0.04}
          distortion={0.018}
          distortionScale={0.06}
          temporalDistortion={0.02}
          transparent
        />
      </mesh>
    </Float>
  );
}

/** Large translucent lens — depth layer, barely there. */
function GlassForm({ z }: { z: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = t * 0.022;
  });

  return (
    <mesh ref={ref} position={[0.35, -0.15, z]} scale={[1.35, 1.35, 1.35]}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshTransmissionMaterial
        color="#b8c4e8"
        roughness={0.45}
        thickness={0.35}
        transmission={0.45}
        ior={1.28}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const px = state.pointer.x;
    const py = state.pointer.y;
    const smooth = 0.018;
    pointer.current.x += (px - pointer.current.x) * smooth;
    pointer.current.y += (py - pointer.current.y) * smooth;

    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = pointer.current.x * 0.055 + t * 0.006;
    groupRef.current.rotation.x =
      -pointer.current.y * 0.038 + Math.sin(t * 0.055) * 0.008;
    groupRef.current.position.x = pointer.current.x * 0.07;
    groupRef.current.position.y = pointer.current.y * 0.035;
  });

  return <group ref={groupRef}>{children}</group>;
}

function SceneFull({ particleCount }: { particleCount: number }) {
  return (
    <ParallaxRig>
      <GentleParticles count={particleCount} />

      <SoftGlow
        position={[-1.55, 0.55, -1.75]}
        color="#8b9bd4"
        scale={4.6}
        opacity={0.045}
      />
      <SoftGlow
        position={[1.65, -0.2, -1.65]}
        color="#6d8a9e"
        scale={3.8}
        opacity={0.038}
      />
      <SoftGlow position={[0, 0.1, -2.7]} color="#c4c9e0" scale={5.5} opacity={0.022} />

      <FlowRibbon
        z={-1.65}
        tint="#aeb8d8"
        rotation={[0.08, 0.14, -0.05]}
        segments={160}
        speed={0.014}
        tubeRadius={0.1}
      />

      <FlowRibbon
        z={-2.25}
        tint="#8ec9c0"
        rotation={[-0.04, -0.1, 0.05]}
        segments={140}
        speed={0.01}
        tubeRadius={0.085}
      />

      <GlassForm z={-2.55} />

      <VignettePlane />
    </ParallaxRig>
  );
}

function SceneLite() {
  return (
    <ParallaxRig>
      <SoftGlow position={[-1.35, 0.65, -1.45]} color="#8b9bd4" scale={3.9} opacity={0.042} />
      <SoftGlow position={[1.25, -0.15, -1.25]} color="#6d8a9e" scale={3.3} opacity={0.035} />

      <FlowRibbon
        z={-1.55}
        tint="#aeb8d8"
        rotation={[0.1, 0.16, -0.06]}
        segments={110}
        speed={0.012}
        tubeRadius={0.095}
      />

      <VignettePlane />
    </ParallaxRig>
  );
}

/** Static, low-luminance — readable hero text; no motion. */
function ReducedMotionBackdrop() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse 100% 70% at 50% -15%, rgba(95, 110, 150, 0.09), transparent 58%),
          radial-gradient(ellipse 80% 55% at 85% 25%, rgba(70, 110, 120, 0.06), transparent 55%),
          radial-gradient(ellipse 70% 50% at 12% 40%, rgba(120, 125, 165, 0.05), transparent 50%),
          radial-gradient(ellipse 90% 65% at 50% 100%, rgba(255, 255, 255, 0.03), transparent 62%),
          ${BG}
        `,
      }}
    />
  );
}

export function HeroBackground() {
  const reduce = useReducedMotion() ?? false;
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsSmall(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (reduce) {
    return <ReducedMotionBackdrop />;
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        className="pointer-events-none"
        dpr={isSmall ? [1, 1.2] : [1, 1.35]}
        camera={{ position: [0, 0, 4.35], fov: 40 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <AdaptiveDpr pixelated />
        <color attach="background" args={[BG]} />
        <fog attach="fog" args={[FOG_COLOR, 3.2, 9.5]} />

        <ambientLight intensity={0.22} />
        <directionalLight position={[2.5, 3.5, 2]} intensity={0.38} color="#c8d2f0" />
        <directionalLight position={[-3.5, -1.5, 2.5]} intensity={0.22} color="#9eb8b4" />
        <directionalLight position={[0, -2.5, 2]} intensity={0.14} color="#e8eaf2" />

        {isSmall ? (
          <SceneLite />
        ) : (
          <SceneFull particleCount={260} />
        )}
      </Canvas>
    </div>
  );
}
