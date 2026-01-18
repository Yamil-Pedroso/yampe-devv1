import { Canvas } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

/* ---------- CONFIG ---------- */

const CUBE_SIZE = 2;
const TILE_SIZE = 0.38;
const GAP = 0.06;
const FACE_OFFSET = CUBE_SIZE / 2 + 0.01;

type FaceProps = {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
};

/* ---------- FACE (4 TILES) ---------- */

function Face({ color, position, rotation }: FaceProps) {
  return (
    <group position={position} rotation={rotation}>
      {[0, 1, 2, 3].map((i) => {
        const x =
          (i % 2) * (TILE_SIZE + GAP) - (TILE_SIZE + GAP) / 2 + TILE_SIZE / 2;

        const y =
          Math.floor(i / 2) * (TILE_SIZE + GAP) -
          (TILE_SIZE + GAP) / 2 +
          TILE_SIZE / 2;

        return (
          <mesh key={i} position={[x, y, 0.001]}>
            <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
            <meshStandardMaterial
              color={color}
              roughness={0.75}
              metalness={0}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---------- GLASS CUBE ---------- */

function GlassCube() {
  const meshRef = useRef<Mesh>(null!);

  return (
    <RoundedBox
      ref={meshRef}
      args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]}
      radius={0.12}
      smoothness={8}
    >
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.6}
        roughness={0.15}
        ior={1.45}
        transparent
        opacity={1}
      />
    </RoundedBox>
  );
}

/* ---------- MODEL ---------- */

function ColorCubeModel() {
  return (
    <group>
      <GlassCube />

      <Face
        color="#ef4444"
        position={[0, 0, FACE_OFFSET]}
        rotation={[0, 0, 0]}
      />
      <Face
        color="#3b82f6"
        position={[0, 0, -FACE_OFFSET]}
        rotation={[0, Math.PI, 0]}
      />
      <Face
        color="#22c55e"
        position={[FACE_OFFSET, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Face
        color="#eab308"
        position={[-FACE_OFFSET, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Face
        color="#a855f7"
        position={[0, FACE_OFFSET, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Face
        color="#06b6d4"
        position={[0, -FACE_OFFSET, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

/* ---------- MAIN COMPONENT ---------- */

export default function ColorCube() {
  return (
    <Canvas
      camera={{ position: [3.5, 3.5, 3.5], fov: 45 }}
      style={{
        width: "500px",
        height: "400px",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      <ColorCubeModel />

      <OrbitControls
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.8}
      />
    </Canvas>
  );
}
