import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { testimonials } from '../constants';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
        setMousePosition({ x, y });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div className="relative perspective-1000 w-full h-[400px]">
      <motion.div
        ref={cardRef}
        variants={fadeIn("", "spring", index * 0.5, 0.75)}
        className="w-full h-full rounded-3xl overflow-hidden relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`
            : 'rotateY(0) rotateX(0)',
          transition: 'transform 0.1s ease-out'
        }}
        whileHover={{
          y: -20,
          boxShadow: '0 0 40px rgba(166, 123, 255, 0.7)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Holographic card base */}
        <div className="absolute inset-0 bg-[rgba(15,10,35,0.8)] backdrop-blur-lg border border-[rgba(166,123,255,0.2)] rounded-3xl"></div>

        {/* Holographic grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(166, 123, 255, 0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(166, 123, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        ></div>

        {/* Glowing border */}
        <div className="absolute inset-0 rounded-3xl border border-transparent"
          style={{
            boxShadow: 'inset 0 0 20px rgba(166, 123, 255, 0.5), 0 0 30px rgba(166, 123, 255, 0.4)'
          }}>
        </div>

        {/* Floating particles */}
        {isHovered && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#a67bff]"
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  scale: 0
                }}
                animate={{
                  x: Math.random() * 300 - 150,
                  y: Math.random() * 300 - 150,
                  scale: [0, 1, 0],
                  opacity: [0, 0.7, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  top: `${50}%`,
                  left: `${50}%`,
                  filter: 'blur(4px)'
                }}
              />
            ))}
          </>
        )}

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          <p className='text-[#a67bff] font-black text-[64px] absolute top-2 left-6 opacity-70'>
            "
          </p>

          <div className='mt-12 flex-grow'>
            <p className='text-white tracking-wider text-[18px] leading-relaxed'>
              {testimonial}
            </p>
          </div>

          <div className='mt-6 flex justify-between items-center gap-1'>
            <div className='flex-1 flex flex-col'>
              <p className='text-white font-medium text-[18px]'>
                <span className='text-[#c5b0ff]'>
                  @
                </span> {name}
              </p>
              <p className='mt-1 text-[#c5b0ff] text-[14px]'>
                {designation} of {company}
              </p>
            </div>

            <div className="relative">
              <img
                src={image}
                alt={`feedback-by-${name}`}
                className='w-16 h-16 rounded-full object-cover border-2 border-[#a67bff]'
              />
              <div className="absolute -inset-2 rounded-full border-2 border-[#a67bff] opacity-70 animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Holographic reflection */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#a67bff] to-transparent opacity-10"></div>
      </motion.div>

      {/* Floating holographic effect */}
      <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border border-[#a67bff] opacity-30 pointer-events-none"></div>
    </div>
  );
};

const Feedbacks = () => {
  const particlesInit = useRef(null);

  useEffect(() => {
    particlesInit.current = async (engine) => {
      await loadFull(engine);
    };
  }, []);

  return (
    <div className='relative w-full overflow-hidden py-20' style={{
      background: 'radial-gradient(ellipse at center, #0c0a1d 0%, #050418 100%)'
    }}>
      {/* Animated particles background */}
      <Particles
        className='absolute inset-0 z-0'
        id="tsparticles"
        init={particlesInit.current}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: "#a67bff" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#a67bff",
              opacity: 0.1,
              width: 1
            }
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" }
            }
          }
        }}
      />

      {/* Floating holographic elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full bg-[#a67bff] opacity-10 blur-[100px]"
        animate={{
          y: [0, -40, 0],
          x: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#7d4bf0] opacity-10 blur-[120px]"
        animate={{
          y: [0, 50, 0],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={textVariant()}
          className="text-center mb-20"
        >
          <motion.p
            className={`${styles.sectionSubText} text-[#c5b0ff] tracking-wider`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Client & Colleague Feedback
          </motion.p>
          <motion.h2
            className={`${styles.sectionHeadText} text-white text-5xl md:text-6xl font-bold mt-4`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a67bff] to-[#7d4bf0]">
              Holographic
            </span> Testimonials
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-[#a67bff] to-[#7d4bf0] mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FeedbackCard
              key={testimonial.name}
              index={index}
              {...testimonial}
            />
          ))}
        </div>

        {/* Interactive floating holograms */}
        <div className="flex justify-center gap-6 mt-16">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-[#a67bff]"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5 + i,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        {/* Holographic signature */}
        <motion.div
          className="text-center mt-16 text-[#c5b0ff] text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          "Innovation meets excellence in every interaction"
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");