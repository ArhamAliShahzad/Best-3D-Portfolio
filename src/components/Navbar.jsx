import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(false);
  const menuRef = useRef(null);
  const particlesInit = useRef(null);

  // Initialize particles
  useEffect(() => {
    const initParticles = async (engine) => {
      await loadFull(engine);
    };
    particlesInit.current = initParticles;
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggle]);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Navigation links data
  const navLinks = [
    { id: 'about', title: 'About' },
    { id: 'work', title: 'Work' },
    { id: 'contact', title: 'Contact' },
  ];

  const particlesOptions = {
    particles: {
      number: { value: 15, density: { enable: true, value_area: 800 } },
      color: { value: "#915eff" },
      shape: { type: "circle" },
      opacity: { value: 0.3, random: true },
      size: { value: 2, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" },
      }
    }
  };

  return (
    <motion.nav
      className={`w-full flex items-center py-4 px-6 fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d0c1d]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Particle background for navbar */}
      <div className="absolute inset-0 -z-10">
        <Particles
          id="tsparticles-nav"
          init={particlesInit.current}
          options={particlesOptions}
          className="h-full"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }}></div>

      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Enhanced Logo with Holographic Effect */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredLogo(true)}
          onHoverEnd={() => setHoveredLogo(false)}
        >
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
          >
            <div className="relative">
              {/* Holographic ring */}
              <motion.div
                className="absolute -inset-1 rounded-full"
                animate={{
                  boxShadow: hoveredLogo
                    ? ["0 0 0 0px rgba(145, 94, 255, 0.2)", "0 0 0 8px rgba(145, 94, 255, 0.1)", "0 0 0 0px rgba(145, 94, 255, 0)"]
                    : "0 0 0 0px rgba(145, 94, 255, 0)"
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />

              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#915eff] to-[#6d28d9] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#0d0c1d] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
              </div>
            </div>

            <p className="text-white text-xl font-bold cursor-pointer flex">
              Arham <span className="sm:block hidden">&nbsp;|&nbsp;<span className="text-[#915eff]">Dev</span></span>
            </p>
          </Link>
        </motion.div>

        {/* Desktop Navigation with Holographic Effects */}
        <ul className="list-none hidden sm:flex flex-row gap-8">
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(link.title);
                  scrollToSection(link.id);
                }}
                className={`relative px-4 py-2 ${active === link.title
                  ? 'text-white font-semibold'
                  : 'text-[#b4b2c5] hover:text-white'
                  } transition-colors duration-300`}
              >
                {link.title}
                {active === link.title && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#915eff]"
                    layoutId="activeIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Holographic glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg z-[-1]"
                  animate={{
                    opacity: active === link.title ? [0.3, 0.6, 0.3] : 0,
                    boxShadow: active === link.title ? `0 0 15px rgba(145, 94, 255, 0.5)` : "none"
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Enhanced Mobile Navigation with Holographic Design */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-lg bg-[#1a1440]/70 backdrop-blur-sm border border-[#915eff]/30"
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6">
              <motion.span
                className="absolute block w-full h-0.5 bg-[#915eff] rounded-full"
                animate={{
                  rotate: toggle ? 45 : 0,
                  top: toggle ? '50%' : '25%',
                  width: toggle ? '100%' : '100%'
                }}
              />
              <motion.span
                className="absolute block w-full h-0.5 bg-[#915eff] rounded-full"
                animate={{
                  opacity: toggle ? 0 : 1,
                  top: '50%',
                  width: toggle ? '0%' : '80%'
                }}
              />
              <motion.span
                className="absolute block w-full h-0.5 bg-[#915eff] rounded-full"
                animate={{
                  rotate: toggle ? -45 : 0,
                  top: toggle ? '50%' : '75%',
                  width: toggle ? '100%' : '60%'
                }}
              />
            </div>
          </motion.button>

          <AnimatePresence>
            {toggle && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setToggle(false)}
                />

                <motion.div
                  ref={menuRef}
                  className="fixed top-20 right-6 z-50 w-64 rounded-xl overflow-hidden border border-[#915eff]/50"
                  initial={{ x: 300, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: 300, opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 25 }}
                  style={{
                    background: 'linear-gradient(145deg, rgba(26, 20, 64, 0.9), rgba(13, 12, 29, 0.95))',
                    boxShadow: '0 10px 30px rgba(145, 94, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Holographic grid inside menu */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.05) 50%),
                                      linear-gradient(transparent 50%, rgba(255,255,255,0.05) 50%)`,
                    backgroundSize: '20px 20px',
                  }}></div>

                  <div className="relative z-10 p-6">
                    <ul className="list-none flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <motion.li
                          key={link.id}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                        >
                          <a
                            href={`#${link.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setActive(link.title);
                              setToggle(false);
                              scrollToSection(link.id);
                            }}
                            className={`flex items-center py-3 px-4 rounded-lg transition-all ${active === link.title
                              ? 'bg-[#915eff]/20 text-white shadow-[0_0_15px_rgba(145,94,255,0.3)]'
                              : 'text-[#b4b2c5] hover:bg-[#915eff]/10'
                              }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-[#915eff] mr-3 animate-pulse"></span>
                            {link.title}
                            {active === link.title && (
                              <motion.span
                                className="ml-auto w-2 h-2 rounded-full bg-[#915eff] animate-pulse"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              />
                            )}
                          </a>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      className="mt-6 pt-4 border-t border-[#915eff]/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-[#b4b2c5] text-sm text-center">
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
                          Available for new projects
                        </span>
                      </p>
                    </motion.div>
                  </div>

                  {/* Holographic projection effect */}
                  <motion.div
                    className="absolute -bottom-8 left-0 right-0 mx-auto w-3/4 h-16 rounded-lg z-0"
                    animate={{
                      opacity: [0.1, 0.2, 0.1],
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: "#915eff",
                      filter: "blur(20px)"
                    }}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-4 left-1/4 w-3 h-3 rounded-full bg-[#915eff]"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-6 right-1/3 w-2 h-2 rounded-full bg-[#ff6b6b]"
        animate={{
          y: [0, -8, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.nav>
  );
};

export default Navbar;