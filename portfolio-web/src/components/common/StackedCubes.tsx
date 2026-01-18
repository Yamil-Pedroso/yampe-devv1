import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Types ---------- */

type CubeData = {
  id: number;
  label: string;
  color: string;
};

/* ---------- Data ---------- */

const cubesData: CubeData[] = [
  { id: 1, label: "Developer", color: "#facc15" },
  { id: 2, label: "Artist", color: "#ffffff" },
  { id: 3, label: "Thinker", color: "#1f2937" },
];

const STACK_INTERVAL = 15000;

/**
 * Posiciones 3D más separadas
 * orden = fondo → frente
 */
const positions = [
  new THREE.Vector3(1.8, -1.2, -2.8),
  new THREE.Vector3(-1.2, 0.8, -0.8),
  new THREE.Vector3(0, 0, 1.6), // front
];

/* ---------- Cube ---------- */

const Cube = ({
  targetPosition,
  label,
  color,
  isTop,
  isAnimating,
  onSelect,
}: {
  targetPosition: THREE.Vector3;
  label: string;
  color: string;
  isTop: boolean;
  isAnimating: boolean;
  onSelect: () => void;
}) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!ref.current) return;

    // movimiento MUY smooth
    ref.current.position.lerp(targetPosition, 0.05);

    // rotación suave constante
    ref.current.rotation.y += isTop ? 0.003 : 0.001;
    ref.current.rotation.x += 0.0008;
  });

  useEffect(() => {
    if (isTop && isAnimating && ref.current) {
      ref.current.rotation.y += Math.PI / 3;
      ref.current.rotation.x += Math.PI / 10;
    }
  }, [isAnimating, isTop]);

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        if (isTop && !isAnimating) onSelect();
      }}
      scale={isTop ? 1.25 : 0.95}
    >
      {/* Cubo con bordes redondeados */}
      <RoundedBox
        ref={ref}
        args={[1.4, 1.4, 1.4]}
        radius={0.12}
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={color === "#ffffff" ? 0.7 : 0.25}
          transparent={color === "#ffffff"}
          opacity={color === "#ffffff" ? 0.65 : 1}
        />
      </RoundedBox>

      {/* Texto interno */}
      <Text
        position={[0, 0, 0.75]}
        fontSize={0.28}
        color={color === "#ffffff" ? "#111" : "#fff"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

/* ---------- Scene ---------- */

const CubeStackScene = () => {
  const [cubes, setCubes] = useState(cubesData);
  const [isAnimating, setIsAnimating] = useState(false);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      triggerSwap();
    }, STACK_INTERVAL);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cubes]);

  const triggerSwap = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCubes((prev) => {
        const last = prev[prev.length - 1];
        return [last, ...prev.slice(0, -1)];
      });
      setIsAnimating(false);
    }, 1400);
  };

  return (
    <>
      {cubes.map((cube, index) => {
        const isTop = index === cubes.length - 1;

        return (
          <Cube
            key={cube.id}
            targetPosition={positions[index]}
            label={cube.label}
            color={cube.color}
            isTop={isTop}
            isAnimating={isAnimating}
            onSelect={triggerSwap}
          />
        );
      })}
    </>
  );
};

/* ---------- Main ---------- */

const StackedCubes = () => {
  return (
    <div className="w-full h-[600px]">
      <Canvas shadows camera={{ position: [0, 2.5, 7], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 6, 6]} intensity={1} castShadow />
        <pointLight position={[-4, -2, 4]} intensity={0.4} />

        <CubeStackScene />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default StackedCubes;
