import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Stars, Sparkles } from "@react-three/drei";
import * as THREE from 'three';
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  const earthRef = useRef();

  return (
    <group>
      {/* Add a subtle glow around the Earth */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a67bff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7d4bf0" />

      <mesh>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshBasicMaterial
          color="#a67bff"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <primitive
        ref={earthRef}
        object={earth.scene}
        scale={2.5}
        position-y={0}
        rotation-y={0}
      />
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Add a starry background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        {/* Add floating particles around Earth */}
        <Sparkles
          count={100}
          scale={10}
          size={2}
          speed={0.4}
          color="#a67bff"
        />

        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;