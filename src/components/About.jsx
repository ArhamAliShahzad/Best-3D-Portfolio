import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc/SectionWrapper';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Frontend Development",
      icon: "https://cdn-icons-png.flaticon.com/512/1069/1069194.png",
      description: "Building responsive and interactive user interfaces with modern frameworks",
      color: "#915eff"
    },
    {
      title: "UI/UX Design",
      icon: "https://cdn-icons-png.flaticon.com/512/2779/2779775.png",
      description: "Creating intuitive user experiences with thoughtful design principles",
      color: "#ff6b6b"
    },
    {
      title: "React Development",
      icon: "https://cdn-icons-png.flaticon.com/512/1183/1183672.png",
      description: "Building scalable applications with React ecosystem",
      color: "#4ecdc4"
    },
    {
      title: "Performance Optimization",
      icon: "https://cdn-icons-png.flaticon.com/512/3522/3522665.png",
      description: "Optimizing web applications for speed and efficiency",
      color: "#ffbe0b"
    }
  ];

  const HolographicCard = ({ title, icon, description, color, index }) => {
    return (
      <motion.div
        className="relative w-full max-w-xs mx-auto h-64"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
      >
        <motion.div
          className="w-full h-full rounded-xl overflow-hidden relative"
          whileHover={{
            y: -10,
            boxShadow: `0 0 40px ${color}80, 0 10px 30px rgba(0,0,0,0.5)`
          }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            background: `linear-gradient(145deg, rgba(26, 20, 64, 0.8), rgba(13, 12, 29, 0.9))`,
            border: `1px solid ${color}50`,
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 50%, ${color}20 50%),
                              linear-gradient(transparent 50%, ${color}20 50%)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Card content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center">
            <div className="mb-4">
              <div
                className="p-4 rounded-full backdrop-blur-sm"
                style={{
                  background: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.1)`
                }}
              >
                <img
                  src={icon}
                  alt={title}
                  className="w-14 h-14 object-contain"
                  style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
                />
              </div>
            </div>

            <h3 className="text-white text-xl font-bold text-center mb-2">{title}</h3>

            <p className="text-[#b4b2c5] text-center text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };


  return (
    <div className="w-full py-20 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-60 h-60 rounded-full bg-[#915eff] filter blur-[100px] opacity-10 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#ff6b6b] filter blur-[120px] opacity-10 -z-10"></div>

      <div className="text-center relative z-10 mb-12">
        <motion.p
          className="text-[#915eff] text-lg uppercase tracking-wider font-medium mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Introduction
        </motion.p>
        <motion.h2
          className="text-white font-black text-4xl sm:text-5xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Professional <span className="text-[#915eff]">Overview</span>
        </motion.h2>

        <motion.div
          className="text-[#dfd9ff] text-lg text-center leading-relaxed px-[5%] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p>
            I'm a passionate frontend developer with expertise in JavaScript, React, and modern UI frameworks.
            With a keen eye for detail and a commitment to creating exceptional user experiences,
            I transform complex ideas into intuitive, responsive interfaces.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl px-4">
        {services.map((service, index) => (
          <HolographicCard
            key={service.title}
            title={service.title}
            icon={service.icon}
            description={service.description}
            color={service.color}
            index={index}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-[#915eff] flex items-center justify-center text-white font-bold text-sm shadow-lg"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        React
      </motion.div>
      <motion.div
        className="absolute top-1/4 right-10 w-16 h-16 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white font-bold text-sm shadow-lg"
        animate={{
          x: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        JS
      </motion.div>



      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
    </div>
  );
};

export default SectionWrapper(About, "about");
