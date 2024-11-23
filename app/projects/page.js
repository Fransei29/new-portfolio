'use client'

import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Vestiré',
    description: `A fashion E-Commerce website offering a wide range of clothing and accessories. 
      Built with Express, React, Axios and PostgreSQL. The site provides an intuitive interface for browsing products, 
      a smooth checkout process, and product reviews to aid decision-making. 
      I designed and developed the entire user flow from product selection to checkout, 
      ensuring a seamless shopping experience.`,
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
    description: `This is a efficient web application designed and created to help users manage their tasks, 
      featuring task creation, editing, deletion, and secure user authentication. 
      Built with React, Next, Axios and PostgreSQL, it includes a user-friendly interface 
      for managing tasks and user sessions. I was responsible for implementing 
      authentication and creating the task management functionalities, resulting in a highly usable application.`,
    link2: 'https://github.com/Fransei29/task-manager.git',
    link3: 'https://task-manager-dade.onrender.com/',
    previewImage: '/img/task.png',
    logs: [
      "git init",
      "git clone https://github.com/Fransei29/task-manager.git",
      "cd task-manager",
      "npm install",
      "Follow the setup instructions in the README file for environment variables configuration.",
      "npm run dev"
    ]
  },
  {
    title: 'Flipper',
    description: `A Twitter clone with functionalities like tweeting, following, 
      and real-time updates. Built with Redis, Node, Express and Redis the application leverages 
      WebSockets for real-time communication. My contributions included developing 
      the core functionalities for posting tweets and following users, ensuring a responsive 
      and engaging experience.`,
    link2: 'https://github.com/Fransei29/clonetwitter.git',
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
    title: 'Holistic Wellness Portal',
    description: `A website dedicated to alternative therapies and holistic wellness services. 
      The site is built using Html, Css and Sass, providing information about various services 
      with a focus on user engagement. Features include service descriptions, 
      booking options, and client testimonials. My role involved developing the frontend, 
      enhancing user interaction, and ensuring a responsive design.`,
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
    title: "My First Portfolio",
    description: `A simple and elegant portfolio website built using HTML and CSS, showcasing 
      my initial projects and skills. This project highlights my design capabilities and 
      serves as an online resume. I designed the layout and structure, ensuring it was visually appealing 
      and easy to navigate.`,
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
    title: 'Trip Planner',
    description: `An app designed to help users plan their trips with ease, 
      offering various travel-related services. Built using Express, React, Axios and MongoDB, this application 
      features a trip itinerary planner and destination suggestions. 
      My role involved developing and ensuring a smooth user 
      experience through effective design and navigation.`,
    link2: 'https://github.com/Fransei29/tripplanner.git',
    link3: 'https://tripplanner-beryl.vercel.app/',
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
    title: "Post's place",
    description: `A website dedicated to creating, viewing, and managing posts, 
      with support for various content types. Built using Express, Sequelize, PostgreSQL and GraphQL, 
      this project allows users to create and manage their content efficiently. 
      I was responsible for the overall frontend design and implementation, focusing on user 
      experience and content management features.`,
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
    title: 'Greengrocery El Gringo',
    description: `An E-Commerce platform for fresh produce and groceries. 
      Built using React, it features a user-friendly shopping cart, a searchable product catalog, 
      and an admin panel for inventory management. My contribution included 
      implementing the shopping cart functionalities and optimizing user experience through Jest testing, 
      improving the conversion rate significantly.`,
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
  return (
    <div className='titlepro'>
      <div className="tit2">
        <p className="tit-project">Welcome to the Projects Section</p>
        <p className="tit-project1">Here you can find some of the projects I have worked on</p>
        <p className="tit-project2">Feel free to explore them</p>
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
