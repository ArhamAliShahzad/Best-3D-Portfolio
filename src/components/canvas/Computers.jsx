// ComputersCanvas.jsx
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const { scene } = useGLTF('/desktop_pc/scene.gltf');
  const groupRef = useRef();

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.geometry) {
          const positions = child.geometry.attributes.position?.array;
          if (positions) {
            for (let i = 0; i < positions.length; i++) {
              if (isNaN(positions[i])) {
                positions[i] = 0;
              }
            }
            child.geometry.attributes.position.needsUpdate = true;
            child.geometry.computeBoundingSphere();
          }
        }
      });
    }
  }, [scene]);

  return (
    <group>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} position={[0, 1, 0]} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      {scene && (
        <primitive
          ref={groupRef}
          object={scene}
          scale={isMobile ? 0.7 : 0.75}
          position={isMobile ? [0, -3, -2.2] : [0, -4, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      )}
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Auto-hide hint after 5 seconds
    const hintTimer = setTimeout(() => setShowHint(false), 5000);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      clearTimeout(hintTimer);
    };
  }, []);

  return (
    <div className="w-full h-screen relative">
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Interaction Hint */}
      {/* {!isMobile && showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-5 right-5 bg-black/50 text-white text-xs p-2 rounded-lg backdrop-blur-sm"
        >
         Hold-Right-click-to-Rotate
        </motion.div>
      )} */}
    </div>
  );
};

export default ComputersCanvas;