"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Float,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

/** Deterministic noise — stable across renders. */
function frac01(n: number) {
  return n - Math.floor(n);
}
function stableRnd(i: number, salt: number) {
  return frac01(Math.sin(i * 12.9898 + salt * 43.758) * 43758.5453123);
}

type Quality = "high" | "medium" | "low";

function useSceneQuality(): Quality {
  const [q, setQ] = useState<Quality>("high");
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 640px)");
    const tablet = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      if (narrow.matches) setQ("low");
      else if (tablet.matches) setQ("medium");
      else setQ("high");
    };
    sync();
    narrow.addEventListener("change", sync);
    tablet.addEventListener("change", sync);
    return () => {
      narrow.removeEventListener("change", sync);
      tablet.removeEventListener("change", sync);
    };
  }, []);
  return q;
}

function getWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const c = document.createElement("canvas");
    const gl =
      c.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ??
      c.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    return !!gl;
  } catch {
    return false;
  }
}

/** Slow cinematic drift — parallax without “spinning”. */
function CinematicCamera({ quality }: { quality: Quality }) {
  const base = useRef(new THREE.Vector3(0.15, 0.04, 5.45));
  const look = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    const amp = quality === "low" ? 0.55 : quality === "medium" ? 0.75 : 1;
    camera.position.set(
      base.current.x + Math.sin(t * 0.11) * 0.38 * amp,
      base.current.y + Math.cos(t * 0.095) * 0.16 * amp,
      base.current.z + Math.sin(t * 0.062) * 0.22 * amp,
    );
    look.current.set(
      Math.sin(t * 0.05) * 0.06 * amp,
      Math.cos(t * 0.048) * 0.04 * amp,
      0,
    );
    camera.lookAt(look.current);
  });

  return null;
}

/**
 * Flowing ribbon — layered sine waves + luminous edge (meshPhysical).
 * Motion is intentionally visible: slow, smooth, premium.
 */
function FlowRibbon({
  width,
  height,
  wSeg,
  hSeg,
  color,
  emissive,
  opacity,
  position,
  rotation,
  phase,
  speed,
  waveScale = 1,
  normalEvery = 3,
}: {
  width: number;
  height: number;
  wSeg: number;
  hSeg: number;
  color: string;
  emissive: string;
  opacity: number;
  position: [number, number, number];
  rotation: [number, number, number];
  phase: number;
  speed: number;
  waveScale?: number;
  normalEvery?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(
    () => new THREE.PlaneGeometry(width, height, wSeg, hSeg),
    [width, height, wSeg, hSeg],
  );
  const frame = useRef(0);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime * speed + phase;
    const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const w = waveScale;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const flow =
        Math.sin(x * 1.15 + t * 1.22) * 0.34 * w +
        Math.sin(x * 2.4 + y * 0.65 + t * 0.98) * 0.14 * w +
        Math.cos(x * 0.48 + t * 0.68) * 0.11 * w +
        Math.sin(y * 1.85 + t * 0.52) * 0.075 * w +
        Math.sin(x * 0.32 + y * 1.05 + t * 0.36) * 0.055 * w;
      pos.setZ(i, flow);
    }
    pos.needsUpdate = true;
    frame.current += 1;
    if (frame.current % normalEvery === 0) mesh.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geom} position={position} rotation={rotation}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={opacity}
        metalness={0.12}
        roughness={0.28}
        clearcoat={0.92}
        clearcoatRoughness={0.14}
        emissive={emissive}
        emissiveIntensity={0.72}
        side={THREE.DoubleSide}
        toneMapped
      />
    </mesh>
  );
}

function DepthVeil({
  z,
  color,
  opacity,
  scale = 1,
}: {
  z: number;
  color: string;
  opacity: number;
  scale?: number;
}) {
  return (
    <mesh position={[0.25, 0, z]} rotation={[0.08, -0.12, 0]} scale={scale}>
      <planeGeometry args={[16, 10, 1, 1]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FlowParticleField({
  count,
  spread,
  color,
  size,
  opacity,
  zSpread,
  driftSpeed,
}: {
  count: number;
  spread: number;
  color: string;
  size: number;
  opacity: number;
  zSpread: number;
  driftSpeed: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, basePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (stableRnd(i, 1) - 0.5) * spread;
      positions[i * 3 + 1] = (stableRnd(i, 2) - 0.5) * spread * 0.5;
      positions[i * 3 + 2] = (stableRnd(i, 3) - 0.5) * zSpread - 0.15;
    }
    const base = new Float32Array(positions);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: g, basePositions: base };
  }, [count, spread, zSpread]);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    const b = basePositions;
    if (!pts || !b) return;
    const t = clock.elapsedTime * driftSpeed;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const bx = b[ix];
      const by = b[ix + 1];
      const bz = b[ix + 2];
      const ph = i * 0.13;
      arr[ix] =
        bx +
        Math.sin(t * 1.05 + ph) * 0.14 +
        Math.sin(t * 0.32 + by * 0.38) * 0.075;
      arr[ix + 1] =
        by +
        Math.cos(t * 0.9 + ph) * 0.11 +
        Math.sin(t * 0.26 + bx * 0.28) * 0.065;
      arr[ix + 2] =
        bz + Math.sin(t * 0.58 + ph * 2) * 0.095 + Math.sin(t * 0.18) * 0.045;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DriftingLights() {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);
  const c = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (a.current) {
      a.current.position.set(
        Math.sin(t * 0.38) * 3.4,
        Math.cos(t * 0.31) * 1.75,
        2.6 + Math.sin(t * 0.22) * 0.5,
      );
      a.current.intensity = 1.05 + Math.sin(t * 0.48) * 0.14;
    }
    if (b.current) {
      b.current.position.set(
        Math.cos(t * 0.34 + 1.05) * 2.85,
        Math.sin(t * 0.27 + 0.65) * 1.35,
        -1.35 + Math.cos(t * 0.2) * 0.6,
      );
      b.current.intensity = 0.82 + Math.cos(t * 0.41) * 0.12;
    }
    if (c.current) {
      c.current.position.set(
        Math.sin(t * 0.2 + 2) * 2.1,
        Math.sin(t * 0.16) * 0.95,
        0.65,
      );
      c.current.intensity = 0.48 + Math.sin(t * 0.55) * 0.1;
    }
  });

  return (
    <>
      <pointLight ref={a} color="#ddd6fe" distance={18} decay={2} />
      <pointLight ref={b} color="#67e8f9" distance={16} decay={2} />
      <pointLight ref={c} color="#a78bfa" distance={12} decay={2} />
    </>
  );
}

function SceneContent({ quality }: { quality: Quality }) {
  const groupRef = useRef<THREE.Group>(null);
  const isLow = quality === "low";
  const isMedium = quality === "medium";

  const ribbonSegs = isLow
    ? { w: 26, h: 8 }
    : isMedium
      ? { w: 38, h: 11 }
      : { w: 52, h: 14 };

  const particlePrimary = isLow ? 90 : isMedium ? 170 : 300;
  const particleSecondary = isLow ? 45 : isMedium ? 85 : 150;
  const particleSize = isLow ? 0.038 : isMedium ? 0.032 : 0.026;

  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g) return;
    const t = clock.elapsedTime;
    // Gentle oscillation — momentum without continuous “spin”.
    g.rotation.y = Math.sin(t * 0.1) * 0.14;
    g.rotation.x = Math.sin(t * 0.065) * 0.05;
    g.rotation.z = Math.cos(t * 0.055) * 0.04;
    g.position.x = 0.5 + Math.sin(t * 0.088) * 0.1 * (isLow ? 0.5 : 1);
    g.position.y = Math.cos(t * 0.078) * 0.06 * (isLow ? 0.5 : 1);
  });

  const sparkCount = isLow ? 0 : isMedium ? 42 : 72;

  return (
    <>
      <CinematicCamera quality={quality} />

      <fogExp2 attach="fog" args={["#0a0c14", isLow ? 0.038 : 0.032]} />

      <ambientLight intensity={isLow ? 0.22 : 0.3} />
      <directionalLight
        position={[5, 7, 8]}
        intensity={isLow ? 0.42 : 0.58}
        color="#e9d5ff"
      />
      <directionalLight
        position={[-6, -3, -5]}
        intensity={0.34}
        color="#5eead4"
      />
      <DriftingLights />

      {!isLow ? (
        <DepthVeil z={-3.6} color="#1e1b4b" opacity={0.1} scale={1.05} />
      ) : null}
      <DepthVeil z={-4.8} color="#0f172a" opacity={0.065} />

      <group ref={groupRef}>
        <Float
          speed={1.2}
          rotationIntensity={0.09}
          floatIntensity={0.38}
          floatingRange={[-0.22, 0.22]}
        >
          <group>
            <FlowRibbon
              width={8.2}
              height={1.55}
              wSeg={ribbonSegs.w}
              hSeg={ribbonSegs.h}
              color="#6d28d9"
              emissive="#c4b5fd"
              opacity={isLow ? 0.58 : 0.64}
              position={[0.25, 0.62, 0.2]}
              rotation={[0.4, 0.14, -0.22]}
              phase={0}
              speed={0.95}
              waveScale={1.12}
              normalEvery={3}
            />
            <FlowRibbon
              width={7.8}
              height={1.35}
              wSeg={ribbonSegs.w}
              hSeg={ribbonSegs.h}
              color="#0e7490"
              emissive="#22d3ee"
              opacity={isLow ? 0.48 : 0.55}
              position={[-0.28, -0.42, -0.15]}
              rotation={[-0.35, -0.2, 0.42]}
              phase={2.15}
              speed={0.82}
              waveScale={1.05}
              normalEvery={3}
            />
            {!isLow ? (
              <FlowRibbon
                width={7}
                height={1.1}
                wSeg={ribbonSegs.w}
                hSeg={ribbonSegs.h}
                color="#8b5cf6"
                emissive="#ddd6fe"
                opacity={0.42}
                position={[0.02, 0.05, -0.55]}
                rotation={[0.18, 0.5, 0.18]}
                phase={4.4}
                speed={0.68}
                waveScale={0.98}
                normalEvery={4}
              />
            ) : null}
            {!isLow && !isMedium ? (
              <FlowRibbon
                width={6.2}
                height={0.92}
                wSeg={Math.max(28, ribbonSegs.w - 6)}
                hSeg={ribbonSegs.h}
                color="#6366f1"
                emissive="#a5b4fc"
                opacity={0.36}
                position={[-0.08, 0.78, -0.38]}
                rotation={[0.55, -0.22, 0.12]}
                phase={1.05}
                speed={0.58}
                waveScale={0.92}
                normalEvery={4}
              />
            ) : null}
          </group>
        </Float>

        <FlowParticleField
          count={particlePrimary}
          spread={8.8}
          color="#ddd6fe"
          size={particleSize}
          opacity={isLow ? 0.45 : 0.58}
          zSpread={3.6}
          driftSpeed={0.92}
        />
        <FlowParticleField
          count={particleSecondary}
          spread={6.8}
          color="#a5f3fc"
          size={particleSize * 1.4}
          opacity={isLow ? 0.28 : 0.38}
          zSpread={2.4}
          driftSpeed={0.78}
        />

        {sparkCount > 0 ? (
          <Sparkles
            count={sparkCount}
            scale={9}
            size={2.4}
            speed={0.25}
            opacity={isMedium ? 0.45 : 0.55}
            color="#c4b5fd"
          />
        ) : null}
        {!isLow ? (
          <Sparkles
            count={isMedium ? 28 : 48}
            scale={7}
            size={1.8}
            speed={0.2}
            opacity={0.35}
            color="#67e8f9"
          />
        ) : null}
      </group>
    </>
  );
}

function SceneFallback() {
  return null;
}

/** CSS-only fallback when WebGL is unavailable — matches reduced-motion hero treatment. */
function StaticHeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-[1]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(115%_80%_at_78%_8%,rgb(var(--accent)/0.26),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_65%_at_8%_42%,rgb(var(--accent-cyan)/0.14),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(75%_50%_at_50%_100%,rgba(15,23,42,0.4),transparent_60%)]" />
    </div>
  );
}

function SceneRoot({ quality }: { quality: Quality }) {
  const dpr: [number, number] =
    quality === "low" ? [1, 1] : quality === "medium" ? [1, 1.4] : [1, 1.85];

  return (
    <Canvas
      camera={{ position: [0.15, 0.04, 5.45], fov: 38 }}
      dpr={dpr}
      gl={{
        alpha: true,
        antialias: quality !== "low",
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <AdaptiveDpr />
      <Suspense fallback={<SceneFallback />}>
        <SceneContent quality={quality} />
      </Suspense>
    </Canvas>
  );
}

/**
 * Premium hero 3D: flowing ribbons, particle field, sparkles, drifting lights,
 * cinematic camera. Quality tiers + CSS fallback. Parent should omit when
 * `prefers-reduced-motion`.
 */
export function HeroBackground3D() {
  const quality = useSceneQuality();
  const webglOk = useMemo(() => getWebGLSupport(), []);

  if (!webglOk) {
    return <StaticHeroBackdrop />;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-[1] opacity-[0.88] sm:opacity-[0.93] lg:opacity-[0.97]"
      aria-hidden
    >
      <SceneRoot quality={quality} />
    </div>
  );
}
