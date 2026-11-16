import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as THREE from "three";

function Hills() {
  const mesh = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(40, 40, 80, 80);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const z = Math.sin(x * 0.35) * 0.6 + Math.cos(y * 0.3) * 0.7 + Math.sin((x + y) * 0.2) * 0.5;
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  useFrame(({ clock }) => {
    if (mesh.current) mesh.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.02;
  });
  return (
    <mesh ref={mesh} geometry={geo} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
      <meshStandardMaterial color="#3a5d3a" flatShading roughness={0.95} />
    </mesh>
  );
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime + position[0]) * 0.04;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.6, 6]} />
        <meshStandardMaterial color="#5b3a22" flatShading />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <coneGeometry args={[0.55, 1.2, 7]} />
        <meshStandardMaterial color="#264d2e" flatShading />
      </mesh>
      <mesh position={[0, 1.45, 0]} castShadow>
        <coneGeometry args={[0.4, 0.9, 7]} />
        <meshStandardMaterial color="#2f5c39" flatShading />
      </mesh>
    </group>
  );
}

function Barn() {
  return (
    <group position={[1.4, -1, -0.2]} rotation={[0, -0.4, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.9, 1]} />
        <meshStandardMaterial color="#b25132" flatShading />
      </mesh>
      <mesh position={[0, 0.7, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <coneGeometry args={[0.85, 0.6, 4]} />
        <meshStandardMaterial color="#2a1e18" flatShading />
      </mesh>
    </group>
  );
}

function Sun() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = 2.2 + Math.sin(clock.elapsedTime * 0.4) * 0.15;
      ref.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[-3.2, 2.2, -3]}>
      <sphereGeometry args={[0.9, 32, 32]} />
      <meshBasicMaterial color="#f4c869" />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i) + 0.003;
      p.setY(i, y > 4 ? 0 : y);
      p.setX(i, p.getX(i) + Math.sin(clock.elapsedTime + i) * 0.001);
    }
    p.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f4e2c4" size={0.04} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[-4, 6, 3]} intensity={1.4} castShadow color="#fff1d4" />
      <hemisphereLight args={["#cfe3c4", "#3a2a1a", 0.4]} />
      <Sun />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <Barn />
      </Float>
      <Tree position={[-2.4, -1.1, 0.8]} scale={1.1} />
      <Tree position={[-1.5, -1.1, -0.6]} scale={0.8} />
      <Tree position={[2.6, -1.1, 0.6]} scale={0.9} />
      <Tree position={[3.4, -1.1, -0.4]} scale={1.0} />
      <Tree position={[-3.6, -1.1, -1.2]} scale={1.2} />
      <Hills />
      <Particles />
      <ContactShadows position={[0, -1.55, 0]} opacity={0.45} blur={2.4} far={5} />
      <Environment preset="sunset" />
    </>
  );
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.15) * 0.6;
    state.camera.position.y = 0.6 + Math.sin(t * 0.2) * 0.15;
    state.camera.lookAt(0, -0.2, 0);
  });
  return null;
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <section className="relative min-h-screen overflow-hidden pt-16 grain">
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/ferme-cover.png"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-background/10" />
      </div>

      <div className="absolute inset-0 z-[1] opacity-20">{mounted && (
        <Canvas
          shadows
          dpr={[1, 1.6]}
          camera={{ position: [0, 0.6, 5.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<Html center><span className="text-xs text-muted-foreground">Chargement…</span></Html>}>
            <Scene />
            <CameraRig />
          </Suspense>
        </Canvas>
      )}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-background/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 lg:pt-32 pointer-events-none">
        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/70">
            <span className="h-px w-10 bg-accent" /> Saison 2025 · Lot vivant
          </span>
        </motion.div>
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-5xl sm:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-tight mt-6 text-balance max-w-5xl drop-shadow-[0_2px_20px_rgba(255,255,255,0.4)]"
        >
          L'Élevage de Demain,<br />
          <em className="text-accent not-italic font-medium">la Transparence</em> d'Aujourd'hui.
        </motion.h1>
        <motion.p
          initial={false} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 max-w-xl text-lg text-foreground/80 backdrop-blur-[2px]"
        >
          Des élevages en plein air, suivis en temps réel, et des produits fermiers en vente directe.
        </motion.p>
        <motion.div
          initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-4 pointer-events-auto"
        >
          <a href="#ferme" className="rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-foreground/90 transition shadow-lg">
            Visiter la ferme
          </a>
          <a href="#boutique" className="rounded-full border border-foreground/30 bg-background/40 backdrop-blur px-7 py-3.5 text-sm font-medium hover:bg-background/70 transition">
            Réserver ma part
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#ferme"
        initial={false} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/70 z-10"
      >
        Défiler
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
