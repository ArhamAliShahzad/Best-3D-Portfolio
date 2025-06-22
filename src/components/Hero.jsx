import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Particle system for background
const ParticleSystem = () => {
  const particles = useRef();
  const count = 500;

  useFrame((state) => {
    if (!particles.current) return;

    const positions = particles.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += Math.sin(time + i) * 0.01;
      positions[i3 + 1] += Math.cos(time + i * 0.5) * 0.01;
      positions[i3 + 2] += Math.sin(time * 0.5 + i) * 0.01;
    }

    particles.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Position
    positions[i3] = (Math.random() - 0.5) * 50;
    positions[i3 + 1] = (Math.random() - 0.5) * 50;
    positions[i3 + 2] = (Math.random() - 0.5) * 50;

    // Color
    colors[i3] = Math.random() * 0.5 + 0.5; // R
    colors[i3 + 1] = Math.random() * 0.2 + 0.3; // G
    colors[i3 + 2] = Math.random() * 0.5 + 0.5; // B
  }

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.1}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};

// Enhanced 3D Computer Model
const Computers = ({ isMobile }) => {
  const { scene } = useGLTF('/desktop_pc/scene.gltf');
  const groupRef = useRef();

  // Add subtle rotation animation
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.geometry) {
          // Fix position NaN values
          const positions = child.geometry.attributes.position?.array;
          if (positions) {
            let needsUpdate = false;
            for (let i = 0; i < positions.length; i++) {
              if (isNaN(positions[i])) {
                positions[i] = 0;
                needsUpdate = true;
              }
            }
            if (needsUpdate) {
              child.geometry.attributes.position.needsUpdate = true;
              child.geometry.computeBoundingSphere();
            }
          }

          // Fix material issues without recreating
          if (child.material && child.material.isMeshStandardMaterial) {
            // Preserve existing properties
            child.material.emissive = new THREE.Color(0x3a1c71).multiplyScalar(0.1);
            child.material.emissiveIntensity = 0.5;
            child.material.roughness = 0.2;
            child.material.metalness = 0.8;

            // Clean up any non-standard properties
            if (child.material._listeners) {
              delete child.material._listeners;
            }
          }
        }
      });
    }
  }, [scene]);

  return (
    <group>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <pointLight
        intensity={1.5}
        position={[0, 1, 0]}
        color="#915eff"
        distance={10}
        decay={2}
      />
      <spotLight
        position={[-10, 15, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
        color="#b19cd9"
      />
      <spotLight
        position={[10, 15, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
        color="#b19cd9"
      />
      {scene && (
        <primitive
          ref={groupRef}
          object={scene}
          scale={isMobile ? 0.6 : 0.8}
          position={isMobile ? [0, -2.5, -1.5] : [0, -3, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      )}
      <ContactShadows
        position={[0, -4, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4}
        color="#5d2b9c"
      />
      <Environment preset="city" />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

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
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <color attach="background" args={['#0d0c1d']} />
        <ParticleSystem />
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            mouseButtons={{
              LEFT: null,         // Disable left button
              MIDDLE: null,       // Disable middle button
              RIGHT: THREE.MOUSE.ROTATE // Use right button for rotation
            }}
            touches={{
              ONE: null,          // Disable one-finger touch
              TWO: THREE.TOUCH.DOLLY_ROTATE // Two fingers for rotate
            }}
          />
          <Computers isMobile={isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Interaction Hint */}
      {!isMobile && showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-5 right-5 bg-black/50 text-white text-xs p-2 rounded-lg backdrop-blur-sm border border-[#915eff]"
        >
          Right-click + Drag to Rotate
        </motion.div>
      )}
    </div>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: -(e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className='w-full relative h-screen mx-auto overflow-hidden'>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1440] to-[#0d0c1d] -z-10" />

      {/* Computers Canvas */}
      <div className='absolute inset-0 top-0 w-full h-full opacity-90'>
        <ComputersCanvas />
      </div>

      {/* Content */}
      <div
        className={`absolute inset-0 top-[120px] mx-auto flex flex-row items-start gap-5 max-w-7xl px-6 md:px-8`}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff] animate-pulse' />
          <div className='w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915eff] to-[#0d0c1d]' />
        </div>

        <motion.div
          className='max-w-2xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className='text-white font-black text-[40px] sm:text-[50px] lg:text-[60px] xl:text-[70px] leading-tight'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hi, I'm <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#915eff] to-[#ff6bff]'>Arham</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className='text-[#dfd9ff] font-medium text-[16px] sm:text-[18px] lg:text-[20px] mt-2 max-w-2xl'>
              A passionate <span className='text-[#ff6bff]'>Frontend Developer</span> and continuous learner crafting immersive web experiences.
            </p>

            {/* <div className="mt-6 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-[#915eff] to-[#6a11cb] rounded-lg font-bold text-white shadow-lg shadow-[#915eff]/30"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-transparent border-2 border-[#915eff] rounded-lg font-bold text-white shadow-lg shadow-[#915eff]/20"
              >
                Contact Me
              </motion.button>
            </div> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Futuristic Scroll Indicator */}
      <div className='absolute bottom-8 md:bottom-10 w-full flex flex-col items-center justify-center gap-3 z-10'>
        {/* Glowing text */}
        <motion.div
          className="text-[#915eff] text-sm font-medium tracking-wider"
          animate={{
            opacity: [0.6, 1, 0.6],
            textShadow: [
              "0 0 5px rgba(145, 94, 255, 0.3)",
              "0 0 15px rgba(145, 94, 255, 0.8)",
              "0 0 5px rgba(145, 94, 255, 0.3)"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut"
          }}
        >
          {/* EXPLORE PORTFOLIO */}
        </motion.div>

        {/* Main scroll indicator */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToAbout}
          className='cursor-pointer relative'
          aria-label="Scroll to about section"
        >
          {/* Glowing outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            style={{
              boxShadow: "0 0 20px 5px rgba(145, 94, 255, 0.5)",
              background: "radial-gradient(circle, rgba(145,94,255,0.3) 0%, rgba(145,94,255,0) 70%)"
            }}
          />

          {/* Inner container */}
          <div className='w-14 h-14 rounded-full border-2 border-[#915eff] flex justify-center items-center bg-[#0d0c1d]/50 backdrop-blur-sm relative overflow-hidden'>
            {/* Animated scanning effect */}
            <motion.div
              className="absolute w-full h-1 bg-[#915eff]"
              animate={{
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: 'loop',
                ease: "easeInOut"
              }}
              style={{
                boxShadow: "0 0 10px 2px rgba(145, 94, 255, 0.7)"
              }}
            />

            {/* Holographic orb */}
            <motion.div
              className="w-3 h-3 rounded-full absolute"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
              }}
              style={{
                background: "radial-gradient(circle, #fff 0%, #915eff 100%)",
                boxShadow: "0 0 15px 5px rgba(145, 94, 255, 0.7)"
              }}
            />

            {/* Arrow icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#915eff] absolute"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Hint text */}
        {/* <motion.div
          className="text-[#dfd9ff] text-xs mt-2 opacity-80"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        >
          (Right-click + drag to rotate 3D model)
        </motion.div> */}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-[#915eff] filter blur-[100px] opacity-20" />
      <div className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-[#915eff] filter blur-[100px] opacity-20" />

      {/* Floating UI elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-8 h-8 rounded-full border-2 border-[#915eff]"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-[#915eff] to-[#6a11cb] rounded-full opacity-70"></div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-20 w-6 h-6 rounded-full border border-[#ff6bff]"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="w-full h-full bg-[#ff6bff] rounded-full opacity-50"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-32 w-10 h-10 rounded-lg border border-[#6a11cb] rotate-45"
        animate={{
          rotate: [45, 90, 45],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-full h-full bg-[#6a11cb] rounded-lg opacity-30"></div>
      </motion.div>
    </section>
  )
}

export default Hero;