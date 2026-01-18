import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

type CubeProps = {
  size: number;
  position: [number, number, number];
  speed: [number, number];
  color: string;
};

export const Cube = ({ size, position, speed, color }: CubeProps) => {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * speed[0];
    meshRef.current.rotation.y += delta * speed[1];
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[size, size, size]}
      radius={0.08} // 👈 radio mínimo (ideal)
      smoothness={6} // 👈 calidad sin costo alto
      position={position}
    >
      <meshStandardMaterial color={color} roughness={0.9} metalness={0} />
    </RoundedBox>
  );
};

const DualCubes = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        width: "220px",
        height: "100px",
        position: "absolute",
        top: "1rem",
        right: "-3rem",
        zIndex: 999,
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 4, 6]} intensity={1} />

      <Cube
        size={1.2}
        position={[-0.9, 0, -0.6]}
        speed={[0.25, 0.2]}
        color="#93c5fd"
      />

      <Cube
        size={0.6}
        position={[0.5, 0.6, -0.3]}
        speed={[0.45, 0.35]}
        color="#bfdbfe"
      />
    </Canvas>
  );
};

export default DualCubes;
