import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
  Environment,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// ✅ Import actual images
import reactIcon from "../assets/tech/reactjs.png";
import jsIcon from "../assets/tech/javascript.png";
import threejsIcon from "../assets/tech/threejs.svg";
import nodejsIcon from "../assets/tech/nodejs.png";
import figmaIcon from "../assets/tech/figma.png"; // ✅ Corrected name
import htmlIcon from "../assets/tech/html.png";
import cssIcon from "../assets/tech/css.png";
import gitIcon from "../assets/tech/git.png";
import { SectionWrapper } from "../hoc";

// ✅ Data array
const technologies = [
  { name: "React", icon: reactIcon, position: [-6, 0, 0] },
  { name: "JavaScript", icon: jsIcon, position: [-4, 0, 0] },
  { name: "Three.js", icon: threejsIcon, position: [-2, 0, 0] },
  { name: "Node.js", icon: nodejsIcon, position: [0, 0, 0] },
  { name: "Figma", icon: figmaIcon, position: [2, 0, 0] }, // ✅ Fixed icon
  { name: "HTML5", icon: htmlIcon, position: [4, 0, 0] },
  { name: "CSS3", icon: cssIcon, position: [6, 0, 0] },
  { name: "Git", icon: gitIcon, position: [8, 0, 0] },
];

// ✅ Ball mesh
const Ball = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={position} scale={1.8} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial
          color="#0d0c1d"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={0.5}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

// ✅ Canvas with all Balls
const TechCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", (e) =>
      setIsMobile(e.matches)
    );
    return () => {
      mediaQuery.removeEventListener("change", () => { });
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 15], fov: 50 }}
      className="cursor-pointer"
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[10, 10, 5]} castShadow />
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={isMobile ? 1 : 2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={null}>
        {technologies.map((tech, index) => (
          <Ball key={index} imgUrl={tech.icon} position={tech.position} />
        ))}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

// ✅ Main Tech Section
const Tech = () => {
  return (
    <div className="w-full">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[#915eff] text-lg uppercase tracking-[4px] mb-3">
          My Technical Expertise
        </p>
        <h2 className="text-white font-black text-4xl sm:text-5xl">
          Tech <span className="text-[#915eff]">Stack</span>
        </h2>
      </motion.div>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="h-[500px] w-full relative z-10">
          <TechCanvas />
        </div>

        {/* Labels under canvas */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="text-[#dfd9ff] text-center font-medium w-24"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper (Tech, "");
