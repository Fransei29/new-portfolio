'use client'

import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/Scroll';

const projects = [
  {
    title: 'Vestiré',
    description: `E-commerce platform offering a wide selection of clothing with intuitive navigation and a seamless checkout process. I designed and developed the complete user flow, from start to finalizing purchases. Built using Express, React, Axios, and PostgreSQL. `,
    link2: 'https://github.com/Fransei29/vestire_front.git',
    link3: 'https://vestire-front-s196.vercel.app/',
    previewImage: '/img/vestire2.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/vestire_front.git',
      'cd vestire_front',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: 'Task Manager',
    description: `An efficient app for managing tasks with functionalities like creating, editing, deleting, and user authentication. Its user-friendly interface supports seamless task and session handling. Built using React, Next.js, Axios, and PostgreSQL.`,
    link2: 'https://github.com/Fransei29/task-manager.git',
    link3: 'https://task-manager-b-git-main-francos-projects-94304a5e.vercel.app/',
    previewImage: '/img/task.png',
    logs: [
      "git init",
      "git clone https://github.com/Fransei29/task-manager.git",
      "cd task-manager",
      "npm install",
      "README file for environment variables configuration.",
      "npm run dev"
    ]
  },
  {
    title: 'Flipper',
    description: `A Twitter-inspired app supporting functionalities like tweeting, following, and live updates. Real-time interactions are powered by WebSockets, ensuring responsiveness and high user engagement. Built with Redis, Node.js, Express, Redis and Tailwind CSS`,
    link2: 'https://github.com/Fransei29/clonetwitter.git',
    link3: 'https://clonetwitter-zy47-git-main-francos-projects-94304a5e.vercel.app/',
    previewImage: '/img/flipper.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/clonetwitter.git',
      'cd clonetwitter',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: 'Dynamic Blog',
    description: `A responsive blog application that fetches posts from an RSS feed (TechCrunch) and user-generated content from Airtable. Features include dynamic routing, user blog management, and a clean, responsive design. Built using Next.js, Tailwind CSS, and Parser.`,
    link2: 'https://github.com/Fransei29/next-blogs-post/blob/main/app/page.js',
    link3: 'https://next-blogs-post-ahua.vercel.app/',
    previewImage: '/img/next.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/next-blogs-post.git',
      'cd next-blogs-post',
      'npm install',
      'npm run dev'
    ]
  },
  {
    title: 'Trip Planner',
    description: `Application designed to simplify trip planning with itinerary management and other travel tools. Its effective navigation and smooth design enhance the user experience significantly. Built with Express, React, Axios, and MongoDB.`,
    link2: 'https://github.com/Fransei29/tripplanner.git',
    link3: 'https://trip-planner-c.vercel.app/',
    previewImage: '/img/trip.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/tripplanner.git',
      'cd tripplanner',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: 'Holistic Portal',
    description: `Informative website showcasing alternative therapies, offering descriptions, client testimonials, and booking options. It focuses on user interaction and professional presentation. Built using HTML, CSS, and Sass.`,
    link2: 'https://github.com/Fransei29/AmnerisWeb.git',
    link3: 'https://amneris-web.vercel.app/',
    previewImage: '/img/holis.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/AmnerisWeb.git',
      'cd AmnerisWeb',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: "First Portfolio",
    description: `A polished portfolio website that highlights my initial projects, skills, and design style. I carefully crafted the structure and aesthetics, ensuring it was visually attractive and simple to navigate for any visitor. Built using HTML and CSS.`,
    link2: 'https://github.com/Fransei29/Portfolio.git',
    link3:'https://portfolio-gamma-green-78.vercel.app/',
    previewImage: '/img/port.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/Portfolio.git',
      'cd Portfolio',
      'go live'
    ]
  },

  {
    title: "Content Management",
    description: `A robust website for creating, managing, and displaying posts with various content types. It provides tools for users to efficiently handle and organize their digital content. Built using Express, Sequelize, PostgreSQL, and GraphQL`,
    link2: 'https://github.com/Fransei29/graphql_front.git',
    previewImage: '/img/gra.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/graphql_front.git',
      'cd graphql_front',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: 'Greengrocery',
    description: `Online store specializing in fresh groceries with a shopping cart and an optimized shopping experience. It incorporates testing with Jest, ensuring smooth functionality and higher conversion rates for users. Built using React.`,
    link2: 'https://github.com/Fransei29/Verdufront.git',
    link3: 'https://verdufront-zbzb.vercel.app/',
    previewImage: '/img/verdu.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/Verdufront.git',
      'cd Verdufront',
      'npm install',
      'npm run start'
    ]
  },
];


export default function Projects() {
   const elementsRef = useScrollAnimation();

  return (
    <div className='titlepro'>
      <div ref={(el) => (elementsRef.current[0] = el)} className="fade-in-right">
      <div className="tit2">
        <p className="tit-project">Welcome to <span style={{ color: "rgb(236, 3, 119)" }}>Projects Section</span></p>
        <p className="tit-project1">
          Explore a selection of my projects, where I bring ideas to life through code, design, and creativity.
        </p>
        <p className="tit-project2">
          Feel free to dive in!
        </p>
      </div>
      </div>
      <div className='projects1'>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }} // Inicio opaco y desplazado hacia abajo
            animate={{ opacity: 1, y: 0 }} // Al final, totalmente visible y en posición original
            transition={{ duration: 0.5, delay: index * 0.4 }} // Ajusta la duración y el retraso para que aparezcan una tras otra
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
