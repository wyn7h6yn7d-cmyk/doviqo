"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/** Deterministlik „juhus“ — render on puhas (ilma Math.random). */
function frac01(n: number) {
  return n - Math.floor(n);
}
function stableRnd(i: number, salt: number) {
  return frac01(Math.sin(i * 12.9898 + salt * 43.758) * 43758.5453123);
}

type Quality = "high" | "low";

function useQuality(): Quality {
  const [q, setQ] = useState<Quality>("high");
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setQ(mq.matches ? "low" : "high");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return q;
}

/** Lainelised läbipaistvad ribad — nähtav voog, mitte staatiline kera. */
function FlowRibbon({
  width,
  height,
  wSeg,
  hSeg,
  color,
  opacity,
  position,
  rotation,
  phase,
  speed,
}: {
  width: number;
  height: number;
  wSeg: number;
  hSeg: number;
  color: string;
  opacity: number;
  position: [number, number, number];
  rotation: [number, number, number];
  phase: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(
    () => new THREE.PlaneGeometry(width, height, wSeg, hSeg),
    [width, height, wSeg, hSeg],
  );

  const frameSkip = useRef(0);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime * speed + phase;
    const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const flow =
        Math.sin(x * 1.15 + t * 1.05) * 0.14 +
        Math.sin(x * 2.4 + y * 0.65 + t * 0.88) * 0.075 +
        Math.cos(x * 0.55 + t * 0.62) * 0.055 +
        Math.sin(y * 1.8 + t * 0.45) * 0.04;
      pos.setZ(i, flow);
    }
    pos.needsUpdate = true;
    frameSkip.current += 1;
    if (frameSkip.current % 2 === 0) mesh.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geom} position={position} rotation={rotation}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        metalness={0.04}
        roughness={0.48}
        side={THREE.DoubleSide}
        emissive="#f8fafc"
        emissiveIntensity={0.025}
      />
    </mesh>
  );
}

/** Pehmed osakesed — aeglane ujuv liikumine, mitte sära. */
function SoftParticles({
  count,
  spread,
  color,
  size,
}: {
  count: number;
  spread: number;
  color: string;
  size: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, basePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (stableRnd(i, 1) - 0.5) * spread;
      positions[i * 3 + 1] = (stableRnd(i, 2) - 0.5) * spread * 0.55;
      positions[i * 3 + 2] = (stableRnd(i, 3) - 0.5) * 2.8 - 0.4;
    }
    const base = new Float32Array(positions);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: g, basePositions: base };
  }, [count, spread]);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    const b = basePositions;
    if (!pts || !b) return;
    const t = clock.elapsedTime;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const bx = b[ix];
      const by = b[ix + 1];
      const bz = b[ix + 2];
      arr[ix] = bx + Math.sin(t * 0.35 + i * 0.09) * 0.045;
      arr[ix + 1] = by + Math.cos(t * 0.28 + i * 0.07) * 0.04;
      arr[ix + 2] = bz + Math.sin(t * 0.22 + i * 0.11) * 0.035;
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
        opacity={0.22}
        depthWrite={false}
      />
    </points>
  );
}

/** Liikuv atmosfääriline valgus — sügavus ja „hingamine“. */
function DriftingLights() {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (a.current) {
      a.current.position.set(
        Math.sin(t * 0.38) * 2.8,
        Math.cos(t * 0.31) * 1.4,
        2.2 + Math.sin(t * 0.22) * 0.35,
      );
      a.current.intensity = 0.52 + Math.sin(t * 0.45) * 0.08;
    }
    if (b.current) {
      b.current.position.set(
        Math.cos(t * 0.33 + 1.2) * 2.2,
        Math.sin(t * 0.27 + 0.8) * 1.1,
        -1.4 + Math.cos(t * 0.19) * 0.5,
      );
      b.current.intensity = 0.38 + Math.cos(t * 0.4) * 0.08;
    }
  });

  return (
    <>
      <pointLight ref={a} color="#e0e7ff" distance={14} decay={2} />
      <pointLight ref={b} color="#eef2ff" distance={12} decay={2} />
    </>
  );
}

function Scene({ quality }: { quality: Quality }) {
  const groupRef = useRef<THREE.Group>(null);
  const isLow = quality === "low";

  const ribbonSegs = isLow
    ? { w: 28, h: 8 }
    : { w: 44, h: 12 };
  const particleCount = isLow ? 90 : 220;
  const particleSize = isLow ? 0.028 : 0.022;

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.032;
    g.rotation.z += delta * 0.008;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.52} />
      <directionalLight
        position={[4.2, 5.5, 6]}
        intensity={0.62}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, -2, -4]}
        intensity={0.28}
        color="#e8ecff"
      />
      <DriftingLights />

      <FlowRibbon
        width={7.2}
        height={1.35}
        wSeg={ribbonSegs.w}
        hSeg={ribbonSegs.h}
        color="#c7d2fe"
        opacity={0.26}
        position={[0.15, 0.55, 0.1]}
        rotation={[0.35, 0.15, -0.22]}
        phase={0}
        speed={0.95}
      />
      <FlowRibbon
        width={6.8}
        height={1.15}
        wSeg={ribbonSegs.w}
        hSeg={ribbonSegs.h}
        color="#a5b4fc"
        opacity={0.2}
        position={[-0.2, -0.35, -0.25]}
        rotation={[-0.28, -0.2, 0.35]}
        phase={2.1}
        speed={0.78}
      />
      {!isLow ? (
        <FlowRibbon
          width={6.4}
          height={0.95}
          wSeg={ribbonSegs.w}
          hSeg={ribbonSegs.h}
          color="#ddd6fe"
          opacity={0.18}
          position={[0.1, 0.05, -0.55]}
          rotation={[0.12, 0.42, 0.18]}
          phase={4.3}
          speed={0.65}
        />
      ) : null}

      <SoftParticles
        count={particleCount}
        spread={7.5}
        color="#c7d2fe"
        size={particleSize}
      />
    </group>
  );
}

function SceneFallback() {
  return null;
}

/**
 * Elav, abstraktne hero taust: ribad + osakesed + kihiline valgus.
 * Mobiilis lihtsustatud (vähem segmente/osakesi, madalam DPR).
 */
export function HeroBackground3D() {
  const quality = useQuality();

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-[1] opacity-[0.48] sm:opacity-[0.58]"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={quality === "low" ? [1, 1] : [1, 1.65]}
        gl={{
          alpha: true,
          antialias: true,
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
