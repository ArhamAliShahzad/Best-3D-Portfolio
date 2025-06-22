import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaVolumeUp, FaPause, FaExpand, FaCompress, FaRobot, FaMicrophone } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { SectionWrapper } from '../hoc';

const Experience = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);
  const recognitionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "3D Portfolio Website",
      company: "Interactive Web Experience",
      date: "May 2024",
      points: [
        "Created an immersive 3D portfolio using Three.js and React with Vite",
        "Implemented interactive 3D models with physics-based animations",
        "Developed custom shaders and lighting effects for visual impact",
        "Optimized performance for smooth rendering across all devices",
        "Integrated responsive design with mobile-friendly interactions"
      ],
      tech: ["React", "Three.js", "Vite", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/ArhamAliShahzad/Best-3D-Portfolio",
      demo: "#",
      color: "#7e22ce"
    },
    {
      id: 2,
      title: "AI Code Reviewer",
      company: "Developer Tool Application",
      date: "Apr 2024",
      points: [
        "Built an AI-powered code review tool using Gemini API",
        "Created a system that analyzes and provides feedback on 10,000+ lines of code",
        "Implemented intelligent suggestions for bug detection and optimization",
        "Developed code diff visualization with before/after comparisons",
        "Integrated security vulnerability scanning for common code flaws"
      ],
      tech: ["React", "Gemini API", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/ArhamAliShahzad/Ai-Code-Reviewer-app-",
      demo: "#",
      color: "#10b981"
    },
    {
      id: 3,
      title: "Junaid Jamshed Clone",
      company: "E-commerce Website",
      date: "Mar 2024",
      points: [
        "Developed a complete e-commerce platform inspired by Junaid Jamshed",
        "Implemented product catalog with filtering and search functionality",
        "Created secure checkout process with payment gateway integration",
        "Designed responsive UI with mobile-first approach",
        "Integrated inventory management and order tracking system"
      ],
      tech: ["React", "Node.js", "MongoDB", "Express", "Axios"],
      github: "https://github.com/ArhamAliShahzad/J.-Clone-Using-React.js-",
      demo: "#",
      color: "#e11d48"
    }
  ];

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };


  // Handle text-to-speech
  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const project = projects[activeProject];
    const text = `${project.title} at ${project.company}. ${project.points.join(' ')}`;

    synthRef.current = window.speechSynthesis;
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.voice = synthRef.current.getVoices().find(voice => voice.name.includes('Google'));
    utteranceRef.current.pitch = 1.2;
    utteranceRef.current.rate = 1.1;
    utteranceRef.current.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utteranceRef.current);
    setIsSpeaking(true);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Exit fullscreen on ESC
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (synthRef.current && isSpeaking) {
        synthRef.current.cancel();
      }
    };
  }, [isSpeaking]);

  // Voice command recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setVoiceCommand(transcript);

        if (transcript.toLowerCase().includes('next')) {
          setActiveProject(prev => (prev < projects.length - 1 ? prev + 1 : 0));
        } else if (transcript.toLowerCase().includes('previous')) {
          setActiveProject(prev => (prev > 0 ? prev - 1 : projects.length - 1));
        } else if (transcript.toLowerCase().includes('stop')) {
          setIsListening(false);
          recognitionRef.current.stop();
        } else if (transcript.toLowerCase().includes('read')) {
          toggleSpeech();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleVoiceControl = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const particlesOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      color: { value: projects[activeProject].color },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: projects[activeProject].color,
        opacity: 0.2,
        width: 1
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  };

  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at bottom, #0c0a1d 0%, #050418 100%)',
        fontFamily: "'Rajdhani', sans-serif"
      }}
    >
      <Particles
        key={activeProject}
        id="tsparticles"
        init={particlesInit}  // ✅ correct: passing function directly
        options={particlesOptions}
      />


      {/* Holographic effect - Enhanced version */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"
          style={{ background: projects[activeProject].color }}
        ></div>
        <div
          className="absolute top-1/3 left-2/3 w-1/3 h-1/3 rounded-full mix-blend-screen filter blur-[140px] opacity-15 animate-pulse"
          style={{ background: projects[activeProject].color }}
        ></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, transparent 0%, rgba(${parseInt(projects[activeProject].color.slice(1, 3), 16)}, ${parseInt(projects[activeProject].color.slice(3, 5), 16)}, ${parseInt(projects[activeProject].color.slice(5, 7), 16)}, 0.1) 70%)`,
        }}></div>
      </div>

      {/* Floating holographic elements */}
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 rounded-full opacity-10 blur-[80px]"
        style={{ background: projects[activeProject].color }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-40 left-10 w-60 h-60 rounded-full opacity-10 blur-[100px]"
        style={{ background: projects[activeProject].color }}
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-[#a67bff] text-lg uppercase tracking-[4px] mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Interactive Project Timeline
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a67bff] to-[#7d4bf0]">Projects</span>
          </motion.h1>
          <motion.p
            className="text-[#b8b8d9] max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Explore my technical journey through interactive holographic cards. Each project features narration, 3D effects, and detailed information.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Project selector */}
          <div className="lg:w-1/4 flex lg:flex-col gap-4 overflow-x-auto pb-4 lg:overflow-visible custom-scrollbar">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                className={`min-w-[200px] lg:w-full text-left p-4 rounded-xl backdrop-blur-md border transition-all duration-300 ${activeProject === index
                  ? 'border-[#a67bff] shadow-[0_0_20px_rgba(166,123,255,0.4)]'
                  : 'border-[#2a2250] hover:border-[#7d4bf0]'
                  }`}
                style={{
                  background: 'rgba(30, 25, 65, 0.6)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
                onClick={() => setActiveProject(index)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * index + 0.8, duration: 0.5 }}
              >
                <h3 className="text-white font-bold text-lg">{project.title}</h3>
                <p className="text-[#a67bff] text-sm mt-1">{project.company}</p>
                <div className="flex gap-1 mt-3 flex-wrap">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: 'rgba(166, 123, 255, 0.1)',
                        color: '#c5b0ff'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Holographic project display */}
          <div className="lg:w-3/4 relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(30, 25, 65, 0.7), rgba(15, 12, 40, 0.9))',
                border: '1px solid rgba(166, 123, 255, 0.2)',
                boxShadow: `0 0 60px ${projects[activeProject].color}80`,
                backdropFilter: 'blur(10px)',
                minHeight: '500px',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              key={activeProject}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
            >

              {/* Holographic grid overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(${parseInt(projects[activeProject].color.slice(1, 3), 16)}, ${parseInt(projects[activeProject].color.slice(3, 5), 16)}, ${parseInt(projects[activeProject].color.slice(5, 7), 16)}, 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(${parseInt(projects[activeProject].color.slice(1, 3), 16)}, ${parseInt(projects[activeProject].color.slice(3, 5), 16)}, ${parseInt(projects[activeProject].color.slice(5, 7), 16)}, 0.1) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
              }}></div>

              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                boxShadow: `inset 0 0 20px ${projects[activeProject].color}30`,
              }}></div>

              <div className="relative z-10 p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h2
                      className="text-3xl md:text-4xl font-bold text-white mb-2"
                      variants={itemVariants}
                    >
                      {projects[activeProject].title}
                    </motion.h2>
                    <div className="flex gap-4 mb-6">
                      <motion.span
                        className="text-[#a67bff] font-medium"
                        variants={itemVariants}
                      >
                        {projects[activeProject].company}
                      </motion.span>
                      <motion.span
                        className="text-[#7d7daa]"
                        variants={itemVariants}
                      >
                        {projects[activeProject].date}
                      </motion.span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      className="p-3 rounded-full backdrop-blur-md border border-[#3f3c5a] hover:border-[#a67bff] hover:bg-[#a67bff] hover:bg-opacity-10 transition-colors"
                      onClick={toggleSpeech}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={isSpeaking ? "Pause narration" : "Start narration"}
                      variants={itemVariants}
                    >
                      {isSpeaking ? (
                        <FaPause className="text-[#a67bff]" />
                      ) : (
                        <FaVolumeUp className="text-[#a67bff]" />
                      )}
                    </motion.button>

                    <motion.button
                      className="p-3 rounded-full backdrop-blur-md border border-[#3f3c5a] hover:border-[#a67bff] hover:bg-[#a67bff] hover:bg-opacity-10 transition-colors"
                      onClick={toggleFullscreen}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={isFullscreen ? "Exit fullscreen" : "View in fullscreen"}
                      variants={itemVariants}
                    >
                      {isFullscreen ? (
                        <FaCompress className="text-[#a67bff]" />
                      ) : (
                        <FaExpand className="text-[#a67bff]" />
                      )}
                    </motion.button>

                    <motion.button
                      className={`p-3 rounded-full backdrop-blur-md border transition-colors ${isListening
                        ? 'border-[#ff6b6b] bg-[#ff6b6b] bg-opacity-10'
                        : 'border-[#3f3c5a] hover:border-[#a67bff] hover:bg-[#a67bff] hover:bg-opacity-10'}`}
                      onClick={toggleVoiceControl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={isListening ? "Stop voice control" : "Start voice control"}
                      variants={itemVariants}
                    >
                      <FaMicrophone className={isListening ? "text-[#ff6b6b]" : "text-[#a67bff]"} />
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <motion.h3
                      className="text-xl font-semibold text-white mb-4 border-b border-[#3f3c5a] pb-2"
                      variants={itemVariants}
                    >
                      Project Highlights
                    </motion.h3>
                    <ul className="space-y-3">
                      {projects[activeProject].points.map((point, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start text-[#dfd9ff]"
                          variants={itemVariants}
                        >
                          <span className="inline-block w-2 h-2 rounded-full bg-[#a67bff] mt-2 mr-3"></span>
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <motion.h3
                      className="text-xl font-semibold text-white mb-4 border-b border-[#3f3c5a] pb-2"
                      variants={itemVariants}
                    >
                      Technical Details
                    </motion.h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {projects[activeProject].tech.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-2 rounded-lg text-sm font-medium"
                          style={{
                            background: 'rgba(166, 123, 255, 0.1)',
                            color: '#c5b0ff',
                            border: '1px solid rgba(166, 123, 255, 0.2)'
                          }}
                          variants={itemVariants}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-8">
                      <motion.a
                        href={projects[activeProject].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all"
                        style={{
                          background: 'linear-gradient(145deg, rgba(30, 25, 65, 0.7), rgba(15, 12, 40, 0.9))',
                          border: '1px solid rgba(166, 123, 255, 0.3)',
                          color: '#dfd9ff'
                        }}
                        whileHover={{
                          background: 'linear-gradient(145deg, rgba(50, 40, 100, 0.8), rgba(30, 20, 70, 0.9))',
                          boxShadow: '0 0 20px rgba(166, 123, 255, 0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        variants={itemVariants}
                      >
                        <FaGithub className="text-[#a67bff]" />
                        View on GitHub
                      </motion.a>

                      <motion.a
                        href={projects[activeProject].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all"
                        style={{
                          background: 'linear-gradient(145deg, rgba(125, 75, 240, 0.2), rgba(166, 123, 255, 0.3))',
                          border: '1px solid rgba(166, 123, 255, 0.3)',
                          color: 'white'
                        }}
                        whileHover={{
                          background: 'linear-gradient(145deg, rgba(125, 75, 240, 0.3), rgba(166, 123, 255, 0.4))',
                          boxShadow: '0 0 20px rgba(166, 123, 255, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        variants={itemVariants}
                      >
                        <FaExternalLinkAlt className="text-white" />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Holographic reflection effect */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#a67bff] to-transparent opacity-10 pointer-events-none"></div>
            </motion.div>

            {/* Voice assistant indicator */}
            {(isSpeaking || isListening) && (
              <motion.div
                className="absolute -top-4 -right-4 bg-[#0c0a1d] rounded-full p-3 border border-[#a67bff] shadow-[0_0_20px_rgba(166,123,255,0.5)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <FaRobot className="text-2xl text-[#a67bff]" />
                {isListening && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-[#ff6b6b] animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-center gap-4 mt-10">
          <motion.button
            className="px-6 py-2 rounded-lg font-medium"
            style={{
              background: 'linear-gradient(145deg, rgba(30, 25, 65, 0.7), rgba(15, 12, 40, 0.9))',
              border: '1px solid rgba(166, 123, 255, 0.3)',
              color: '#dfd9ff'
            }}
            onClick={() => setActiveProject(prev => (prev > 0 ? prev - 1 : projects.length - 1))}
            whileHover={{
              background: 'linear-gradient(145deg, rgba(50, 40, 100, 0.8), rgba(30, 20, 70, 0.9))',
              boxShadow: '0 0 15px rgba(166, 123, 255, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>

          <motion.button
            className="px-6 py-2 rounded-lg font-medium"
            style={{
              background: 'linear-gradient(145deg, rgba(125, 75, 240, 0.2), rgba(166, 123, 255, 0.3))',
              border: '1px solid rgba(166, 123, 255, 0.3)',
              color: 'white'
            }}
            onClick={() => setActiveProject(prev => (prev < projects.length - 1 ? prev + 1 : 0))}
            whileHover={{
              background: 'linear-gradient(145deg, rgba(125, 75, 240, 0.3), rgba(166, 123, 255, 0.4))',
              boxShadow: '0 0 15px rgba(166, 123, 255, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </div>

        {/* Voice command status */}
        {isListening && (
          <motion.div
            className="mt-6 text-center text-[#a67bff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="mb-2">Listening for commands... Say "next", "previous", "read", or "stop"</p>
            {voiceCommand && (
              <div className="inline-block px-4 py-2 rounded-lg bg-[#2a2250]">
                <span className="text-white">Command detected:</span> {voiceCommand}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-[#7d7daa] text-sm">
        Holographic Interface • React.js • Framer Motion • Interactive Narration • Voice Control
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "");