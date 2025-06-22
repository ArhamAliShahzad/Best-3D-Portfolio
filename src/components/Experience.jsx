import { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPlus, FaMinus } from "react-icons/fa";
import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import { experiences } from "../constants";
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn, staggerContainer } from '../utils/motion';

const ExperienceCard = ({ experience, isExpanded, toggleExpand }) => {
  const {
    date,
    iconBg,
    icon,
    company_name,
    title,
    points,
    tech,
    github_link,
    demo_link
  } = experience;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'linear-gradient(145deg, #1d1836, #2a2250)',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        borderRadius: '12px'
      }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={date}
      dateClassName="text-white"
      iconStyle={{
        background: iconBg,
        boxShadow: `0 0 0 4px ${iconBg}, 0 0 20px ${iconBg}80`
      }}
      icon={
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex justify-center items-center w-full h-full"
        >
          <img
            src={icon}
            alt={company_name}
            className="w-[65%] h-[65%] object-contain"
          />
        </motion.div>
      }
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {title}
            </h3>
            <p className="text-[#a67bff] text-base font-semibold mt-1">
              {company_name}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="text-white p-1 rounded-full bg-[#2d2d2d]"
          >
            {isExpanded ? <FaMinus size={12} /> : <FaPlus size={12} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={fadeIn('up', 'spring', 0.1, 0.5)}
              className="mt-4"
            >
              <ul className="list-disc ml-5 space-y-2">
                {points.map((point, index) => (
                  <motion.li
                    key={`point-${index}`}
                    variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
                    className="text-white-100 text-sm pl-1 tracking-wide"
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {tech.map((technology, index) => (
                  <motion.span
                    key={`tech-${index}`}
                    variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
                    whileHover={{ scale: 1.1, backgroundColor: '#7d4bf0' }}
                    className="bg-[#2d2d2d] text-white px-3 py-1 rounded-full text-xs cursor-default"
                  >
                    {technology}
                  </motion.span>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#2d2d2d] hover:bg-[#7d4bf0] text-white text-sm font-medium py-2 px-4 rounded-lg transition-all"
                >
                  <FaGithub className="text-base" /> GitHub
                </motion.a>
                {demo_link !== "#" && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#915eff] to-[#7d4bf0] text-white text-sm font-medium py-2 px-4 rounded-lg transition-all"
                  >
                    <FaExternalLinkAlt className="text-sm" /> Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Extract all unique technologies
  const allTech = [...new Set(experiences.flatMap(exp => exp.tech))];

  // Filter experiences based on selected technology
  const filteredExperiences = filter === 'all'
    ? experiences
    : experiences.filter(exp => exp.tech.includes(filter));

  return (
    <>
      <motion.div
        className="flex flex-col items-center w-full"
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className={styles.sectionSubText}>
          Personal Projects & Development Journey
        </p>
        <h2 className={styles.sectionHeadText}>
          My <span className="text-[#a67bff]">Work</span>
        </h2>
      </motion.div>

      {/* Technology Filter */}
      {/* <motion.div
        className="flex flex-wrap justify-center gap-3 mt-8"
        variants={fadeIn('up', 'spring', 0.2, 1)}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all'
            ? 'bg-gradient-to-r from-[#915eff] to-[#7d4bf0] text-white shadow-lg shadow-[#915eff]/40'
            : 'bg-[#2d2d2d] text-[#dfd9ff] hover:bg-[#3d3d3d]'
            }`}
        >
          All Projects
        </motion.button>

        {allTech.map((tech, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(tech)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === tech
              ? 'bg-gradient-to-r from-[#915eff] to-[#7d4bf0] text-white shadow-lg shadow-[#915eff]/40'
              : 'bg-[#2d2d2d] text-[#dfd9ff] hover:bg-[#3d3d3d]'
              }`}
          >
            {tech}
          </motion.button>
        ))}
      </motion.div> */}

      <div className="mt-12">
        <VerticalTimeline
          lineColor="#3f3c5a"
          className="vertical-timeline-custom-line"
        >
          {filteredExperiences.map((experience, index) => (
            <ExperienceCard
              key={`project-${index}`}
              experience={experience}
              isExpanded={expandedCards[index] || false}
              toggleExpand={() => toggleExpand(index)}
            />
          ))}
        </VerticalTimeline>
      </div>

      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay: 0.3
        }}
      >
        <p className="text-[#dfd9ff] text-lg mb-6">
          Explore all my projects and contributions
        </p>
        <motion.a
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(145, 94, 255, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/ArhamAliShahzad"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#915eff] to-[#7d4bf0] rounded-lg text-white font-medium shadow-lg shadow-[#915eff]/30 hover:shadow-[#915eff]/50 transition-all duration-300"
        >
          <FaGithub className="mr-2 text-xl" />
          View GitHub Profile
        </motion.a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Experience, "work");