"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Float } from "@react-three/drei";
import * as THREE from "three";

/** Deterministic noise — stable across renders (no Math.random). */
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

/** Flowing ribbon — vertex wave reads as continuous momentum (flow → clarity). */
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
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(
    () => new THREE.PlaneGeometry(width, height, wSeg, hSeg),
    [width, height, wSeg, hSeg],
  );
  const normFrame = useRef(0);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime * speed + phase;
    const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const w = waveScale;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Layered sine waves: fast ripple + slow swell (visible “alive” motion).
      const flow =
        Math.sin(x * 1.2 + t * 1.35) * 0.22 * w +
        Math.sin(x * 2.55 + y * 0.7 + t * 1.05) * 0.1 * w +
        Math.cos(x * 0.52 + t * 0.72) * 0.07 * w +
        Math.sin(y * 1.95 + t * 0.55) * 0.055 * w +
        Math.sin(x * 0.35 + y * 1.1 + t * 0.38) * 0.04 * w;
      pos.setZ(i, flow);
    }
    pos.needsUpdate = true;
    normFrame.current += 1;
    if (normFrame.current % 2 === 0) mesh.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geom} position={position} rotation={rotation}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        metalness={0.06}
        roughness={0.38}
        side={THREE.DoubleSide}
        emissive={emissive}
        emissiveIntensity={0.42}
        toneMapped
      />
    </mesh>
  );
}

/** Soft depth haze — large translucent plane, barely visible, adds cinematic layers. */
function DepthVeil({
  z,
  color,
  opacity,
}: {
  z: number;
  color: string;
  opacity: number;
}) {
  return (
    <mesh position={[0.35, 0, z]} rotation={[0.1, -0.15, 0]}>
      <planeGeometry args={[14, 9, 1, 1]} />
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

/** Particle field — slow drift + gentle swirl (flow, not noise spam). */
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
      positions[i * 3 + 1] = (stableRnd(i, 2) - 0.5) * spread * 0.52;
      positions[i * 3 + 2] = (stableRnd(i, 3) - 0.5) * zSpread - 0.2;
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
      const ph = i * 0.11;
      arr[ix] =
        bx +
        Math.sin(t * 1.1 + ph) * 0.11 +
        Math.sin(t * 0.35 + by * 0.4) * 0.06;
      arr[ix + 1] =
        by +
        Math.cos(t * 0.95 + ph) * 0.09 +
        Math.sin(t * 0.28 + bx * 0.3) * 0.05;
      arr[ix + 2] =
        bz + Math.sin(t * 0.65 + ph * 2) * 0.08 + Math.sin(t * 0.2) * 0.04;
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
        Math.sin(t * 0.42) * 3.1,
        Math.cos(t * 0.33) * 1.6,
        2.4 + Math.sin(t * 0.25) * 0.45,
      );
      a.current.intensity = 0.85 + Math.sin(t * 0.5) * 0.12;
    }
    if (b.current) {
      b.current.position.set(
        Math.cos(t * 0.36 + 1.1) * 2.6,
        Math.sin(t * 0.29 + 0.7) * 1.2,
        -1.2 + Math.cos(t * 0.21) * 0.55,
      );
      b.current.intensity = 0.65 + Math.cos(t * 0.44) * 0.1;
    }
    if (c.current) {
      c.current.position.set(
        Math.sin(t * 0.22 + 2) * 1.8,
        Math.sin(t * 0.18) * 0.9,
        0.5,
      );
      c.current.intensity = 0.35 + Math.sin(t * 0.6) * 0.08;
    }
  });

  return (
    <>
      <pointLight ref={a} color="#c4b5fd" distance={16} decay={2} />
      <pointLight ref={b} color="#22d3ee" distance={14} decay={2} />
      <pointLight ref={c} color="#8b5cf6" distance={10} decay={2} />
    </>
  );
}

function Scene({ quality }: { quality: Quality }) {
  const groupRef = useRef<THREE.Group>(null);
  const isLow = quality === "low";
  const isMedium = quality === "medium";

  const ribbonSegs = isLow
    ? { w: 22, h: 6 }
    : isMedium
      ? { w: 34, h: 9 }
      : { w: 48, h: 13 };

  const particlePrimary = isLow ? 70 : isMedium ? 140 : 260;
  const particleSecondary = isLow ? 35 : isMedium ? 70 : 120;
  const particleSize = isLow ? 0.034 : isMedium ? 0.028 : 0.022;

  useFrame(({ clock }, delta) => {
    const g = groupRef.current;
    if (!g) return;
    // Steady forward momentum: slow yaw + tiny roll (readable, not dizzying).
    g.rotation.y += delta * 0.052;
    g.rotation.z += delta * 0.011;
    g.rotation.x += delta * 0.004;
    // Subtle group sway (avoids mutating the camera; same parallax feel).
    const t = clock.elapsedTime;
    const sway = !isLow;
    g.position.x = 0.55 + (sway ? Math.sin(t * 0.1) * 0.12 : 0);
    g.position.y = 0.02 + (sway ? Math.cos(t * 0.085) * 0.07 : 0);
    g.position.z = sway ? Math.sin(t * 0.06) * 0.06 : 0;
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#05060a", isLow ? 0.045 : 0.038]} />

      <ambientLight intensity={isLow ? 0.18 : 0.24} />
      <directionalLight
        position={[4.5, 6, 7]}
        intensity={isLow ? 0.35 : 0.5}
        color="#ddd6fe"
      />
      <directionalLight
        position={[-5.5, -2.5, -4]}
        intensity={0.28}
        color="#5eead4"
      />
      <DriftingLights />

      {/* Depth layers — abstract, not decorative blobs */}
      {!isLow ? (
        <DepthVeil z={-3.2} color="#1e1b4b" opacity={0.07} />
      ) : null}
      <DepthVeil z={-4.4} color="#0f172a" opacity={0.05} />

      <group ref={groupRef}>
        <Float
          speed={1.8}
          rotationIntensity={0.14}
          floatIntensity={0.45}
          floatingRange={[-0.18, 0.18]}
        >
          <group>
            <FlowRibbon
              width={7.6}
              height={1.45}
              wSeg={ribbonSegs.w}
              hSeg={ribbonSegs.h}
              color="#7c3aed"
              emissive="#a78bfa"
              opacity={isLow ? 0.48 : 0.52}
              position={[0.2, 0.58, 0.15]}
              rotation={[0.38, 0.12, -0.2]}
              phase={0}
              speed={1.05}
              waveScale={1.05}
            />
            <FlowRibbon
              width={7.2}
              height={1.25}
              wSeg={ribbonSegs.w}
              hSeg={ribbonSegs.h}
              color="#0891b2"
              emissive="#22d3ee"
              opacity={isLow ? 0.38 : 0.44}
              position={[-0.25, -0.38, -0.2]}
              rotation={[-0.32, -0.18, 0.38]}
              phase={2.2}
              speed={0.88}
              waveScale={1}
            />
            {!isLow ? (
              <FlowRibbon
                width={6.6}
                height={1}
                wSeg={ribbonSegs.w}
                hSeg={ribbonSegs.h}
                color="#a78bfa"
                emissive="#c4b5fd"
                opacity={0.36}
                position={[0.05, 0.02, -0.62]}
                rotation={[0.15, 0.48, 0.15]}
                phase={4.5}
                speed={0.72}
                waveScale={0.92}
              />
            ) : null}
            {!isLow && !isMedium ? (
              <FlowRibbon
                width={5.8}
                height={0.85}
                wSeg={Math.max(24, ribbonSegs.w - 8)}
                hSeg={ribbonSegs.h}
                color="#6366f1"
                emissive="#818cf8"
                opacity={0.28}
                position={[-0.1, 0.72, -0.35]}
                rotation={[0.52, -0.2, 0.1]}
                phase={1.1}
                speed={0.62}
                waveScale={0.88}
              />
            ) : null}
          </group>
        </Float>

        <FlowParticleField
          count={particlePrimary}
          spread={8.2}
          color="#c4b5fd"
          size={particleSize}
          opacity={isLow ? 0.38 : 0.48}
          zSpread={3.4}
          driftSpeed={1}
        />
        <FlowParticleField
          count={particleSecondary}
          spread={6.5}
          color="#67e8f9"
          size={particleSize * 1.35}
          opacity={isLow ? 0.22 : 0.3}
          zSpread={2.2}
          driftSpeed={0.85}
        />
      </group>
    </>
  );
}

function SceneFallback() {
  return null;
}

/**
 * Hero 3D: flowing ribbons + translucent depth veils + drifting lights + particle field.
 * Mobile: fewer ribbons / particles / no extra camera sway. Reduced motion: not mounted from parent.
 */
export function HeroBackground3D() {
  const quality = useSceneQuality();

  const dpr: [number, number] =
    quality === "low" ? [1, 1] : quality === "medium" ? [1, 1.35] : [1, 1.75];

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-[1] opacity-[0.72] sm:opacity-[0.86] lg:opacity-[0.9]"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5.35], fov: 40 }}
        dpr={dpr}
        gl={{
          alpha: true,
          antialias: quality !== "low",
          powerPreference: "high-performance",
          stencil: false,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <AdaptiveDpr />
        <Suspense fallback={<SceneFallback />}>
          <Scene quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  );
}
