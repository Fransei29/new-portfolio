"use client";

import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './/tutorials.css';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '../../hooks/Scroll';

const projects = [
  {
    id: '1',
    title: 'Discover Node',
    isTutorial: true,
    description: 'Learn the fundamentals of Node.js by building a simple server that handles HTTP requests. This tutorial will guide you through creating RESTful APIs, managing routing, and handling data with Express.js. You will also learn how to connect to databases and implement basic CRUD operations.',
    icon: '/icons/node2.png',
    link1: 'https://nodejs.org/docs/latest/api/',
    link2: 'https://github.com/Fransei29/NodeJS/blob/main/hello.js',
    link3: 'https://verdufront-zbzb.vercel.app/', 
    previewImage: '/img/verdu2.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/NodeJS.git',
      'cd NodeJS',
      'npm install',
      'node hello.js'
    ]
  },
  {
    id: '2',
    title: 'Discover TypeScript',
    isTutorial: true,
    description: 'Enhance your JavaScript skills with TypeScript. This tutorial covers how to set up TypeScript in a project, use its powerful type-checking features, and integrate it with popular frameworks like React. You will build a small application to see how TypeScript can improve code quality and reduce bugs.',
    icon: '/icons/type.png',
    link1: 'https://www.typescriptlang.org/docs/',
    link2: 'https://github.com/Fransei29/react-typescript/blob/main/src/App.tsx',
    link3: 'https://react-typescript-oqzgk3zxt-francos-projects-94304a5e.vercel.app/',
    previewImage: '/img/type.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/react-typescript.git',
      'cd react-typescript',
      'npm install',
      'npm run start'
    ]
  },
  {
    id: '3',
    title: 'Discover React',
    isTutorial: true,
    description: 'Dive into the core concepts of React by creating a dynamic, interactive web application. You will learn about components, hooks, state management, and lifecycle methods. This tutorial also demonstrates how to handle user input, manage form data, and make API requests to fetch and display data.',
    icon: '/icons/react.png',
    link1: 'https://react.dev/learn',
    link2: 'https://github.com/Fransei29/react-github-users.git',
    link3: 'https://react-github-users.vercel.app/',
    previewImage: '/img/gitreact.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/react-github-users.git',
      'cd react-github-users',
      'npm install',
      'npm run start'
    ]
  },
  {
    id: '4',
    title: 'Discover Redis',
    isTutorial: true,
    description: "Discover how to use Redis as an in-memory database to boost your app's performance. This tutorial explains the installation, setup, and basic commands for caching data, managing sessions, and handling real-time data. You'll also implement a caching mechanism in a Node.js app to optimize performance.",
    icon: '/icons/redis.png',
    link1: 'https://redis.io/docs/latest/',
    link2: 'https://github.com/Fransei29/Redis/blob/main/index.js',
    link3: 'https://vestire-front-s196.vercel.app/',
    previewImage: '/img/vestire.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/Redis.git',
      'cd Redis',
      'npm install',
      'node index.js'
    ]
  },
  {
    id: '5',
    title: 'Discover GraphQL',
    isTutorial: true,
    description: "Master GraphQL by building a server that can handle complex queries efficiently. You'll learn how to set up a GraphQL server, define schemas, and create resolvers. This tutorial also covers integrating GraphQL with a front-end framework like React to fetch and display data dynamically.",
    icon: '/icons/gra.png',
    link1: 'https://graphql.org/learn/',
    link2: 'https://github.com/Fransei29/graphql-app/blob/master/backend/index.js',
    previewImage: '/img/gra.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/graphql-app.git',
      'cd graphql-app',
      'npm install',
      'node backend/index.js'
    ]
  },
  {
    id: '6',
    title: 'Discover Next',
    isTutorial: true,
    description: "Explore server-side rendering and static site generation with Next.js. This tutorial teaches you to build a modern web application with optimized performance and SEO. Learn how to create dynamic routes, fetch data server-side, and deploy your application to platforms like Vercel.",
    icon: '/icons/next.png',
    link1: 'https://nextjs.org/docs',
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
    id: '7',
    title: 'Discover Airtable',
    isTutorial: true,
    description: "Learn how to use Airtable as a lightweight database and backend service for your applications. This tutorial shows you how to set up an Airtable base, manage data, and interact with it through APIs. You'll integrate Airtable with a JavaScript application to fetch and display data.",
    icon: '/icons/airtable.png',
    link1: 'https://support.airtable.com/docs/introduction-to-airtable-basics',
    link2: 'https://github.com/Fransei29/airtable/blob/master/app.js',
    previewImage: '/img/air.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/airtable.git',
      'cd airtable',
      'npm install',
      'node app.js'
    ]
  },
  {
    id: '8',
    title: 'Discover Axios',
    isTutorial: true,
    description: "Simplify HTTP requests with Axios. You'll learn how to handle HTTP requests and responses, manage errors, and make asynchronous operations easier. This tutorial will help you create a seamless data-fetching experience in your web applications.",
    icon: '/icons/axios.png',
    link1: 'https://axios-http.com/docs/intro',
    link2: 'https://github.com/Fransei29/axios/blob/master/index.js',
    previewImage: '/img/axios.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/axios.git',
      'cd axios',
      'npm install',
      'node index.js'
    ]
  },
  {
    id: '9',
    title: 'Discover Mongo',
    isTutorial: true,
    description: "Get started with MongoDB by building a CRUD application. This tutorial covers setting up a MongoDB database, connecting it with a Node.js backend, and performing operations like inserting, updating, deleting, and retrieving data.",
    icon: '/icons/mongo.png',
    link1: 'https://www.mongodb.com/docs/',
    link2: 'https://github.com/Fransei29/tripplanner/blob/master/index.js',
    link3: 'https://tripplanner-beryl.vercel.app/',
    previewImage: '/img/trip.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/tripplanner.git',
      'cd tripplanner',
      'npm install',
      'node index.js'
    ]
  },
  {
    id: '10',
    title: 'Discover Sequelize',
    isTutorial: true,
    description: "Understand how to use Sequelize, an ORM for Node.js, to manage your relational databases effectively. This tutorial guides you through setting up Sequelize, defining models, and creating associations. You'll build a simple API that interacts with a PostgreSQL database.",
    icon: '/icons/Sequelize.png',
    link1: 'https://sequelize.org/docs/v6/getting-started/',
    link2: 'https://github.com/Fransei29/SEQUELIZE/blob/main/index.js',
    previewImage: '/img/vestire.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/SEQUELIZE.git',
      'cd SEQUELIZE',
      'npm install',
      'node index.js'
    ]
  },
  {
    id: '11',
    title: 'Discover REST',
    isTutorial: true,
    description: "Learn how to design and implement RESTful APIs using Node.js and Express.js. This tutorial walks you through creating routes, handling HTTP methods, and managing CRUD operations. By the end, you'll have a functional API that can handle various client requests.",
    icon: '/icons/rest.png',
    link1: 'https://www.ibm.com/docs/en/intelligent-promising?topic=reference-rest-api-documentation',
    link2: 'https://github.com/Fransei29/rest/blob/main/app.js',
    previewImage: '/img/rest.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/rest.git',
      'cd rest',
      'npm install',
      'node app.js'
    ]
  },
  {
    id: '12',
    title: 'Discover HTML',
    isTutorial: true,
    description: "Build a solid foundation in web development with this tutorial on HTML and CSS. You'll learn how to create structured web pages, style them with CSS, and make them responsive. By the end, you'll have a portfolio-ready webpage that looks great on any device.",
    icon: '/icons/html.png',
    link1: 'https://www.w3schools.com/html/html_intro.asp',
    link2: 'https://github.com/Fransei29/Portfolio/blob/main/index.html',
    link3:'https://portfolio-gamma-green-78.vercel.app/',
    previewImage: '/img/port2.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/Portfolio.git',
      'cd Portfolio',
      'go live'
    ]
  },
  {
    id: '13',
    title: 'Discover CSS',
    isTutorial: true,
    description: 'An introductory tutorial focused on the fundamentals of CSS for styling web pages. It demonstrates how to effectively use CSS to create visually appealing, well-structured websites.',
    icon: '/icons/css.png',
    link1: 'https://www.w3schools.com/css/css_intro.asp',
    link2: 'https://github.com/Fransei29/Portfolio/blob/main/style.css',
    link3:'https://portfolio-gamma-green-78.vercel.app/',
    previewImage: '/img/port3.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/Portfolio.git',
      'cd Portfolio',
      'go live'
    ]
  },
  {
    id: '14',
    title: 'Discover Express',
    isTutorial: true,
    description: "Deepen your understanding of backend development with Express.js. This tutorial covers middleware, routing, and error handling in Express. You'll build a web server that can handle multiple requests and serve dynamic content efficiently.",
    icon: '/icons/ex.png',
    link1: 'https://expressjs.com/es/starter/installing.html',
    link2: 'https://github.com/Fransei29/NodeJS/blob/main/index.js',
    link3: 'https://verdufront-zbzb.vercel.app/',
    previewImage: '/img/verdu.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/NodeJS.git',
      'cd NodeJS',
      'npm install',
      'node hello.js'
    ]
  }
];


export default function Projects() {
  const ref = useRef(null);
  const elementsRef = useScrollAnimation();
  const isInView = useInView(ref, { once: true });

  return (
    <>
    
    <div className='tutorial-page'>
    <div ref={(el) => (elementsRef.current[0] = el)} className="fade-in-left">
      <nav className="tech-nav">
        <a href="#discoverhtml">HTML</a>
        <a href="#discovercss">CSS</a>
        <a href="#discovertypescript">TypeScript</a>
        <a href="#discovernode">Node.js</a>
        <a href="#discoverexpress">Express</a>
        <a href="#discoverrest">Rest</a>
        <a href="#discovergraphql">GraphQL</a>
        <a href="#discoveraxios">Axios</a>
        <a href="#discoverreact">React</a>
        <a href="#discovernext">Next</a>
        <a href="#discovermongo">MongoDB</a>
        <a href="#discoversequelize">Sequelize</a>
        <a href="#discoverredis">Redis</a>  
        <a href="#discoverairtable">Airtable</a>   
      </nav>
      </div>
      <div ref={(el) => (elementsRef.current[1] = el)} className="fade-in-right">
    <div className="title-container">     {/* Contenedor para el título y el círculo */}
      <div className="tit3">
        <p className="tit-tutorial">Welcome to Tutorials Section</p>
        <p className="tit-tutorial1">Dive into a collection of hands-on tutorials that will guide you through various technologies and tools</p>
        <p className="tit-tutorial2">Explore and learn at your own pace</p>
      </div>
    </div>
    </div>
    <div className="projects-grid" ref={ref}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}         // Aparecer desde abajo con opacidad 0
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.5, delay: index * 0.4 }}   // Delay para escalonar las animaciones
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}