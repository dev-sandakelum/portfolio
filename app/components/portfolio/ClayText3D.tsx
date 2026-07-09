"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Text3D, Center, Float } from "@react-three/drei";

const FONT = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

function ClayLine({
  text,
  color,
  y,
}: {
  text: string;
  color: string;
  y: number;
}) {
  return (
    <Float speed={1.2} floatIntensity={0.08} rotationIntensity={0}>
      <Center position={[0, y, 0]}>
        <Text3D
          font={FONT}
          size={0.72}
          height={0.18}
          curveSegments={10}
          bevelEnabled
          bevelThickness={0.025}
          bevelSize={0.015}
          bevelSegments={5}
        >
          {text}
          <meshPhysicalMaterial
            color={color}
            roughness={0.7}
            metalness={0}
            clearcoat={0.4}
            clearcoatRoughness={0.2}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} color="#e8e0ff" />
      <directionalLight position={[-3, 5, 4]} intensity={3} color="#fff4e8" />
      <directionalLight position={[4, 2, 3]} intensity={1.2} color="#d4c8ff" />
      <directionalLight position={[0, -2, -3]} intensity={0.6} color="#9c6ade" />
    </>
  );
}

export default function ClayText3D() {
  return (
    <div style={{ width: "100%", height: "190px" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 136 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Lights />
        <Suspense fallback={null}>
          <ClayLine text="Hasitha" color="#ece8ff" y={0.55} />
          <ClayLine text="Sandakelum" color="#b899f0" y={-0.52} />
        </Suspense>
      </Canvas>
    </div>
  );
}
