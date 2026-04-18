"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Float,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Värvid peavad käima kokku `app/globals.css` `:root`-iga (violett + tsüaan, sügav slate).
 */
const BRAND = {
  bgDeep: "#05060a",
  slate: "#0f172a",
  surfaceIndigo: "#1e1b4b",
  violet: "#8b5cf6",
  violetDeep: "#6d28d9",
  violetBright: "#a78bfa",
  violetGlow: "#c4b5fd",
  violetMist: "#ddd6fe",
  cyan: "#22d3ee",
  cyanBright: "#67e8f9",
  cyanMist: "#a5f3fc",
  cyanDeep: "#0891b2",
  indigo: "#6366f1",
  indigoGlow: "#a5b4fc",
} as const;

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

/** Silmale nähtav optiline parallax — kiirus säilib sujuv. */
function CinematicCamera({ quality }: { quality: Quality }) {
  const base = useRef(new THREE.Vector3(0.35, 0.08, 5.65));
  const look = useRef(new THREE.Vector3(0.15, 0, 0));
  const mul = quality === "low" ? 0.62 : quality === "medium" ? 0.85 : 1;

  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    camera.position.set(
      base.current.x + Math.sin(t * 0.22) * 0.58 * mul,
      base.current.y + Math.cos(t * 0.152) * 0.34 * mul,
      base.current.z + Math.sin(t * 0.112) * 0.44 * mul,
    );
    look.current.set(
      0.15 + Math.sin(t * 0.072) * 0.14 * mul,
      Math.cos(t * 0.062) * 0.08 * mul,
      Math.sin(t * 0.038) * 0.05 * mul,
    );
    camera.lookAt(look.current);
  });

  return null;
}

/**
 * Lainuv riba — suurem Z-amplituud ja selge lainetus (premium, mitte „hapu“).
 */
function FlowRibbon({
  width,
  height,
  wSeg,
  hSeg,
  color,
  emissive,
  emissiveIntensity,
  opacity,
  position,
  rotation,
  phase,
  speed,
  waveScale = 1,
  normalEvery = 2,
}: {
  width: number;
  height: number;
  wSeg: number;
  hSeg: number;
  color: string;
  emissive: string;
  emissiveIntensity?: number;
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
  const tick = useRef(0);
  const ei = emissiveIntensity ?? 0.95;

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
        Math.sin(x * 1.05 + t * 1.65) * 0.58 * w +
        Math.sin(x * 2.15 + y * 0.72 + t * 1.12) * 0.22 * w +
        Math.cos(x * 0.42 + t * 0.88) * 0.18 * w +
        Math.sin(y * 1.65 + t * 0.72) * 0.11 * w +
        Math.sin(x * 0.28 + y * 0.98 + t * 0.48) * 0.08 * w;
      pos.setZ(i, flow);
    }
    pos.needsUpdate = true;
    tick.current += 1;
    if (tick.current % normalEvery === 0) mesh.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geom} position={position} rotation={rotation}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={opacity}
        metalness={0.18}
        roughness={0.22}
        clearcoat={0.96}
        clearcoatRoughness={0.1}
        emissive={emissive}
        emissiveIntensity={ei}
        side={THREE.DoubleSide}
        toneMapped
      />
    </mesh>
  );
}

/** Pehme üleminek — ei ärita teksti, annab sügavust. */
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
    <mesh position={[0.4, 0, z]} rotation={[0.06, -0.1, 0]} scale={scale}>
      <planeGeometry args={[20, 12, 1, 1]} />
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
      const ph = i * 0.17;
      arr[ix] =
        bx +
        Math.sin(t * 1.35 + ph) * 0.26 +
        Math.sin(t * 0.42 + by * 0.35) * 0.12;
      arr[ix + 1] =
        by +
        Math.cos(t * 1.12 + ph) * 0.2 +
        Math.sin(t * 0.33 + bx * 0.3) * 0.1;
      arr[ix + 2] =
        bz + Math.sin(t * 0.72 + ph * 2) * 0.14 + Math.sin(t * 0.22) * 0.06;
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

function DriftingLights({ quality }: { quality: Quality }) {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);
  const c = useRef<THREE.PointLight>(null);
  const d = useRef<THREE.PointLight>(null);
  const boost = quality === "low" ? 0.75 : 1;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (a.current) {
      a.current.position.set(
        Math.sin(t * 0.42) * 4.2,
        Math.cos(t * 0.35) * 2.1,
        2.8 + Math.sin(t * 0.26) * 0.65,
      );
      a.current.intensity = (1.35 + Math.sin(t * 0.52) * 0.22) * boost;
    }
    if (b.current) {
      b.current.position.set(
        Math.cos(t * 0.38 + 1.1) * 3.5,
        Math.sin(t * 0.31 + 0.7) * 1.6,
        -1.5 + Math.cos(t * 0.24) * 0.75,
      );
      b.current.intensity = (1.05 + Math.cos(t * 0.44) * 0.18) * boost;
    }
    if (c.current) {
      c.current.position.set(
        Math.sin(t * 0.24 + 2) * 2.6,
        Math.sin(t * 0.19) * 1.15,
        0.85,
      );
      c.current.intensity = (0.62 + Math.sin(t * 0.58) * 0.14) * boost;
    }
    if (d.current) {
      d.current.position.set(
        Math.cos(t * 0.31) * 2.2,
        -1.4 + Math.sin(t * 0.27) * 0.9,
        -2.1,
      );
      d.current.intensity = (0.48 + Math.sin(t * 0.4) * 0.1) * boost;
    }
  });

  return (
    <>
      <pointLight ref={a} color={BRAND.violetMist} distance={22} decay={2} />
      <pointLight ref={b} color={BRAND.cyanBright} distance={18} decay={2} />
      <pointLight ref={c} color={BRAND.violetBright} distance={14} decay={2} />
      <pointLight ref={d} color={BRAND.indigoGlow} distance={16} decay={2} />
    </>
  );
}

/** Ø-kujulised helendavad ribad — selge pöörlemine ja sügavus. */
function LuminousTori({
  quality,
}: {
  quality: Quality;
}) {
  const g = useRef<THREE.Group>(null);
  const isLow = quality === "low";
  const radial = isLow ? 40 : 56;
  const tubular = isLow ? 96 : 128;

  useFrame(({ clock }) => {
    const gr = g.current;
    if (!gr) return;
    const t = clock.elapsedTime;
    const s = isLow ? 0.65 : 1;
    gr.rotation.y = t * 0.16 * s;
    gr.rotation.x = 0.25 + Math.sin(t * 0.12) * 0.08 * s;
    gr.rotation.z = Math.sin(t * 0.088) * 0.15 * s;
  });

  return (
    <group ref={g} position={[0.9, 0.15, -0.85]} rotation={[0.2, -0.35, 0.08]}>
      <mesh>
        <torusGeometry args={[2.85, 0.055, radial, tubular]} />
        <meshPhysicalMaterial
          color={BRAND.violetDeep}
          emissive={BRAND.violetGlow}
          emissiveIntensity={isLow ? 0.85 : 1.15}
          transparent
          opacity={isLow ? 0.42 : 0.55}
          metalness={0.35}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      {!isLow ? (
        <mesh rotation={[0.4, 0.9, 0.15]} position={[0.15, -0.2, -0.35]}>
          <torusGeometry args={[3.35, 0.04, 36, 96]} />
          <meshPhysicalMaterial
            color={BRAND.cyanDeep}
            emissive={BRAND.cyan}
            emissiveIntensity={0.95}
            transparent
            opacity={0.4}
            metalness={0.25}
            roughness={0.25}
            clearcoat={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ) : null}
    </group>
  );
}

/** Organilised sügavuse „pilved“ — MeshDistort annab elavat peegeldust. */
function DepthOrbs({ quality }: { quality: Quality }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const isLow = quality === "low";

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (a.current) {
      a.current.position.x = 2.1 + Math.sin(t * 0.18) * 0.15;
      a.current.position.y = -0.35 + Math.cos(t * 0.14) * 0.12;
    }
    if (b.current) {
      b.current.position.x = -1.2 + Math.cos(t * 0.15) * 0.1;
      b.current.position.z = -3.6 + Math.sin(t * 0.12) * 0.2;
    }
  });

  if (isLow) return null;

  return (
    <group>
      <mesh ref={a} position={[2.1, -0.35, -2.4]}>
        <icosahedronGeometry args={[1.05, 3]} />
        <MeshDistortMaterial
          color={BRAND.surfaceIndigo}
          emissive={BRAND.violet}
          emissiveIntensity={0.45}
          roughness={0.35}
          metalness={0.2}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
          speed={2.8}
          distort={0.38}
          radius={1.1}
        />
      </mesh>
      <mesh ref={b} position={[-1.2, 0.55, -3.8]}>
        <icosahedronGeometry args={[0.75, 2]} />
        <MeshDistortMaterial
          color="#134e4a"
          emissive={BRAND.cyanBright}
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.15}
          clearcoat={0.85}
          speed={2.2}
          distort={0.32}
          radius={0.85}
        />
      </mesh>
    </group>
  );
}

function SceneContent({ quality }: { quality: Quality }) {
  const flowGroupRef = useRef<THREE.Group>(null);
  const isLow = quality === "low";
  const isMedium = quality === "medium";

  const ribbonSegs = isLow
    ? { w: 28, h: 9 }
    : isMedium
      ? { w: 42, h: 12 }
      : { w: 56, h: 15 };

  const particlePrimary = isLow ? 110 : isMedium ? 200 : 340;
  const particleSecondary = isLow ? 55 : isMedium ? 100 : 180;
  const particleSize = isLow ? 0.048 : isMedium ? 0.04 : 0.034;

  const motion = isLow ? 0.68 : isMedium ? 0.88 : 1;

  useFrame(({ clock }) => {
    const g = flowGroupRef.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.14) * 0.22 * motion;
    g.rotation.x = Math.sin(t * 0.085) * 0.09 * motion;
    g.rotation.z = Math.cos(t * 0.07) * 0.06 * motion;
    g.position.x = 1.05 + Math.sin(t * 0.11) * 0.18 * motion;
    g.position.y = Math.cos(t * 0.095) * 0.1 * motion;
  });

  const sparkPrimary = isLow ? 55 : isMedium ? 85 : 120;
  const sparkSecondary = isLow ? 35 : isMedium ? 55 : 85;
  const fogDensity = isLow ? 0.024 : 0.014;

  return (
    <>
      <CinematicCamera quality={quality} />

      <fogExp2 attach="fog" args={[BRAND.bgDeep, fogDensity]} />

      <ambientLight intensity={isLow ? 0.26 : 0.34} />
      <directionalLight
        position={[6, 8, 9]}
        intensity={isLow ? 0.48 : 0.68}
        color={BRAND.violetGlow}
      />
      <directionalLight
        position={[-7, -4, -6]}
        intensity={0.42}
        color={BRAND.cyan}
      />
      <DriftingLights quality={quality} />

      <DepthVeil z={-5.2} color={BRAND.slate} opacity={0.055} />
      {!isLow ? (
        <DepthVeil
          z={-3.9}
          color={BRAND.surfaceIndigo}
          opacity={0.09}
          scale={1.08}
        />
      ) : null}

      <DepthOrbs quality={quality} />

      <group position={[0.85, 0, 0]}>
        <LuminousTori quality={quality} />
      </group>

      <group ref={flowGroupRef}>
        <Float
          speed={2.45}
          rotationIntensity={0.22}
          floatIntensity={0.62}
          floatingRange={[-0.38, 0.38]}
        >
          <group>
            <FlowRibbon
              width={9.2}
              height={1.75}
              wSeg={ribbonSegs.w}
              hSeg={ribbonSegs.h}
              color={BRAND.violetDeep}
              emissive={BRAND.violetGlow}
              emissiveIntensity={1.05}
              opacity={isLow ? 0.7 : 0.78}
              position={[0.35, 0.72, 0.35]}
              rotation={[0.42, 0.16, -0.24]}
              phase={0}
              speed={1.52}
              waveScale={1.28}
              normalEvery={2}
            />
            <FlowRibbon
              width={8.6}
              height={1.55}
              wSeg={ribbonSegs.w}
              hSeg={ribbonSegs.h}
              color="#0e7490"
              emissive={BRAND.cyan}
              emissiveIntensity={0.88}
              opacity={isLow ? 0.6 : 0.72}
              position={[-0.35, -0.48, -0.08]}
              rotation={[-0.38, -0.24, 0.45]}
              phase={2.2}
              speed={1.28}
              waveScale={1.18}
              normalEvery={2}
            />
            {!isLow ? (
              <FlowRibbon
                width={7.6}
                height={1.25}
                wSeg={ribbonSegs.w}
                hSeg={ribbonSegs.h}
                color={BRAND.violet}
                emissive={BRAND.violetMist}
                emissiveIntensity={0.78}
                opacity={0.56}
                position={[0.05, 0.08, -0.62]}
                rotation={[0.22, 0.55, 0.2]}
                phase={4.5}
                speed={1.1}
                waveScale={1.08}
                normalEvery={3}
              />
            ) : null}
            {!isLow && !isMedium ? (
              <FlowRibbon
                width={6.8}
                height={1}
                wSeg={Math.max(32, ribbonSegs.w - 6)}
                hSeg={ribbonSegs.h}
                color={BRAND.indigo}
                emissive={BRAND.indigoGlow}
                emissiveIntensity={0.72}
                opacity={0.42}
                position={[-0.12, 0.88, -0.42]}
                rotation={[0.58, -0.26, 0.14]}
                phase={1.1}
                speed={0.92}
                waveScale={1.02}
                normalEvery={3}
              />
            ) : null}
          </group>
        </Float>

        <FlowParticleField
          count={particlePrimary}
          spread={9.5}
          color={BRAND.violetMist}
          size={particleSize}
          opacity={isLow ? 0.52 : 0.68}
          zSpread={4}
          driftSpeed={1.55}
        />
        <FlowParticleField
          count={particleSecondary}
          spread={7.2}
          color={BRAND.cyanMist}
          size={particleSize * 1.35}
          opacity={isLow ? 0.34 : 0.46}
          zSpread={2.8}
          driftSpeed={1.28}
        />

        <Sparkles
          count={sparkPrimary}
          scale={11}
          size={3.2}
          speed={1.05}
          opacity={isMedium ? 0.58 : 0.72}
          color={BRAND.violetGlow}
        />
        {!isLow ? (
          <Sparkles
            count={sparkSecondary}
            scale={8.5}
            size={2.4}
            speed={0.92}
            opacity={0.5}
            color={BRAND.cyanBright}
          />
        ) : null}
      </group>
    </>
  );
}

function SceneFallback() {
  return null;
}

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
    quality === "low" ? [1, 1] : quality === "medium" ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      camera={{ position: [0.35, 0.08, 5.65], fov: 40 }}
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
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.14;
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
 * Premium hero 3D: nähtav lainetus, ribad, helendavad rõngad, osakesed, pehme valgus.
 * `prefers-reduced-motion`: staatiline taust — hero-section.
 */
export function HeroBackground3D() {
  const quality = useSceneQuality();
  const webglOk = useMemo(() => getWebGLSupport(), []);

  if (!webglOk) {
    return <StaticHeroBackdrop />;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-[1] opacity-100 sm:opacity-[0.98]"
      aria-hidden
    >
      <SceneRoot quality={quality} />
    </div>
  );
}
