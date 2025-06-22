import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  color,
  piano,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "3D Portfolio Website",
    company_name: "Interactive Web Experience",
    icon: starbucks,
    iconBg: "#7e22ce",
    date: "May 2024",
    points: [
      "Created an immersive 3D portfolio using Three.js and React with Vite",
      "Implemented interactive 3D models with physics-based animations",
      "Developed custom shaders and lighting effects for visual impact",
      "Optimized performance for smooth rendering across all devices",
      "Integrated responsive design with mobile-friendly interactions"
    ],
    github_link: "https://github.com/ArhamAliShahzad/3d-portfolio",
    demo_link: "#",
    tech: ["React", "Three.js", "Vite", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "AI Code Reviewer",
    company_name: "Developer Tool Application",
    icon: tesla,
    iconBg: "#10b981",
    date: "Apr 2024",
    points: [
      "Built an AI-powered code review tool using Gemini API",
      "Created a system that analyzes and provides feedback on 10,000+ lines of code",
      "Implemented intelligent suggestions for bug detection and optimization",
      "Developed code diff visualization with before/after comparisons",
      "Integrated security vulnerability scanning for common code flaws"
    ],
    github_link: "https://github.com/ArhamAliShahzad/Ai-Code-Reviewer-app-",
    demo_link: "#",
    tech: ["React", "Gemini API", "Node.js", "MongoDB", "Express"]
  },
  {
    title: "Junaid Jamshed Clone",
    company_name: "E-commerce Website",
    icon: shopify,
    iconBg: "#e11d48",
    date: "Mar 2024",
    points: [
      "Developed a complete e-commerce platform inspired by Junaid Jamshed",
      "Implemented product catalog with filtering and search functionality",
      "Created secure checkout process with payment gateway integration",
      "Designed responsive UI with mobile-first approach",
      "Integrated inventory management and order tracking system"
    ],
    github_link: "https://github.com/ArhamAliShahzad/J.-Clone-Using-React.js-",
    demo_link: "#",
    tech: ["React", "Node.js", "MongoDB", "Express", "Axios"]
  },
  {
    title: "Modern Portfolio Website",
    company_name: "Personal Branding",
    icon: meta,
    iconBg: "#0ea5e9",
    date: "March 2025",
    points: [
      "Designed and developed a clean, modern portfolio website",
      "Implemented responsive layout with Tailwind CSS framework",
      "Created interactive sections with smooth animations",
      "Optimized for performance with lazy loading and image optimization",
      "Integrated contact form with email notifications"
    ],
    github_link: "https://github.com/ArhamAliShahzad/Portfolio-project",
    demo_link: "#",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Responsive"]
  },
  {
    title: "Color Palette Generator",
    company_name: "Design Tool Application",
    icon: color,
    iconBg: "#8b5cf6",
    date: "May 2024",
    points: [
      "Developed a dynamic color palette generator with real-time preview",
      "Implemented algorithm for generating complementary color schemes",
      "Created color contrast checker for accessibility compliance",
      "Added palette export functionality in multiple formats (CSS, SCSS, PNG)",
      "Built color history with localStorage persistence"
    ],
    github_link: "https://github.com/ArhamAliShahzad/Color-generate-app",
    demo_link: "#",
    tech: ["JavaScript", "HTML5", "CSS3", "LocalStorage"]
  },
  {
    title: "Interactive Piano App",
    company_name: "Music Web Application",
    icon: piano,
    iconBg: "#f59e0b",
    date: "March 2025",
    points: [
      "Created a browser-based piano with 88-key virtual keyboard",
      "Implemented recording and playback functionality with timing precision",
      "Added multiple instrument sounds and audio effects",
      "Designed responsive layout with touch support for mobile devices",
      "Built MIDI-like functionality for music composition"
    ],
    github_link: "https://github.com/ArhamAliShahzad/Piano-Project",
    demo_link: "#",
    tech: ["JavaScript", "HTML5", "CSS3", "Click Events"]
  }
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
