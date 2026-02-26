import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Floating particle field
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Alternating cyan and purple
      if (Math.random() > 0.5) {
        col[i * 3] = 0.0;
        col[i * 3 + 1] = 0.9;
        col[i * 3 + 2] = 1.0;
      } else {
        col[i * 3] = 0.66;
        col[i * 3 + 1] = 0.33;
        col[i * 3 + 2] = 0.97;
      }
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Rotating centerpiece - Torus Knot
function CenterShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={[1.4, 1.4, 1.4]}>
        <torusKnotGeometry args={[1, 0.3, 128, 16, 2, 3]} />
        <MeshDistortMaterial
          color="#00d4e8"
          emissive="#003d6e"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.1}
          distort={0.15}
          speed={2}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// Orbiting spheres
function OrbitingSpheres() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  const spheres = [
    { id: "s1", radius: 3.5, color: "#00f5ff", size: 0.12, angle: 0 },
    { id: "s2", radius: 3.5, color: "#a855f7", size: 0.12, angle: Math.PI * 2 / 3 },
    { id: "s3", radius: 3.5, color: "#00f5ff", size: 0.1, angle: Math.PI * 4 / 3 },
    { id: "s4", radius: 4.5, color: "#a855f7", size: 0.08, angle: Math.PI / 4 },
    { id: "s5", radius: 4.5, color: "#00d4e8", size: 0.08, angle: Math.PI * 3 / 4 },
  ];

  return (
    <group ref={groupRef}>
      {spheres.map((s) => (
        <Sphere
          key={s.id}
          args={[s.size, 16, 16]}
          position={[
            Math.cos(s.angle) * s.radius,
            Math.sin(s.angle * 0.5) * 0.8,
            Math.sin(s.angle) * s.radius,
          ]}
        >
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={2}
            metalness={0.5}
            roughness={0.1}
          />
        </Sphere>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00f5ff" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#a855f7" />
      <pointLight position={[0, 8, 0]} intensity={1} color="#ffffff" />

      <ParticleField />
      <CenterShape />
      <OrbitingSpheres />
    </Canvas>
  );
}
