"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import CircularProgress from '../../components/CircularProgress';
import axios from 'axios';

const projects = [
  {
    id: '1',
    title: 'Learn Node',
    isTutorial: true,
    description: 'Master the basics of Node.js with this comprehensive guide.',
    icon: '/icons/node2.png',
    link1: 'https://nodejs.org/docs/latest/api/',
    link2: 'https://github.com/Fransei29/NodeJS/blob/main/hello.js',
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
    title: 'Learn TypeScript',
    isTutorial: true,
    description: 'Learn TypeScript to enhance the safety and scalability of your React applications.',
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
    title: 'Learn React',
    isTutorial: true,
    description: 'Get started with React and build interactive UIs.',
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
    title: 'Learn Redis',
    isTutorial: true,
    description: 'Explore Redis, the in-memory data structure store.',
    icon: '/icons/redis.png',
    link1: 'https://redis.io/docs/latest/',
    link2: 'https://github.com/Fransei29/Redis/blob/main/index.js',
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
    title: 'Learn GraphQL',
    isTutorial: true,
    description: 'Learn GraphQL to query your APIs efficiently.',
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
    title: 'Learn Next',
    isTutorial: true,
    description: 'Discover the power of server-side rendering with Next.js.',
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
    title: 'Learn Airtable',
    isTutorial: true,
    description: 'Integrate Airtable into your projects seamlessly.',
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
    title: 'Learn Axios',
    isTutorial: true,
    description: 'Simplify HTTP requests with Axios.',
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
    title: 'Learn Mongo',
    isTutorial: true,
    description: 'Dive into MongoDB, the NoSQL database.',
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
    title: 'Learn Sequelize',
    isTutorial: true,
    description: 'Understand Sequelize for database ORM in Node.js.',
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
    title: 'Learn REST',
    isTutorial: true,
    description: 'Build RESTful APIs with ease.',
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
    title: 'Learn HTML',
    isTutorial: true,
    description: 'A comprehensive tutorial on building web pages using HTML.',
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
    title: 'Learn CSS',
    isTutorial: true,
    description: 'Small tutorial on styling web pages using CSS.',
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
    title: 'Learn Express',
    isTutorial: true,
    description: 'Here you will see how to create your first Server using Express.',
    icon: '/icons/ex.png',
    link1: 'https://expressjs.com/es/starter/installing.html',
    link2: 'https://github.com/Fransei29/NodeJS/blob/main/index.js',
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
  const { data: session } = useSession(); // Asegúrate de que la sesión está disponible
  const [progress, setProgress] = useState(0); // Estado para almacenar el progreso en porcentaje
  const [completedTutorials, setCompletedTutorials] = useState({}); // Estado para almacenar los tutoriales completados
  

  // Función para calcular el progreso basado en los tutoriales completados
  const calculateProgress = () => {
    const totalTutorials = projects.length;
    const completedCount = projects.filter(project => completedTutorials[project.id]).length;
    return (completedCount / totalTutorials) * 100;
  };

  // Efecto para actualizar el progreso cuando cambia el estado de los tutoriales completados
  useEffect(() => {
    setProgress(calculateProgress());
  }, [completedTutorials]);


   // Función para marcar un tutorial como completado
   const handleComplete = async (tutorialId) => {
    if (!session) {
      console.error('No hay sesión disponible');
      return;
    }

    try {
      const response = await axios.post('/api/progress', {
        userId: session.user.id,           // Suponiendo que tienes la sesión del usuario
        tutorialId: tutorialId,            // ID del tutorial que se está completando
        completed: true,                   // Marca como completado
      });


      // Actualiza el estado de los tutoriales completados en el frontend
      setCompletedTutorials((prev) => ({ ...prev, [tutorialId]: true }));
    } catch (error) {
      console.error('Error al marcar como completado', error);
    }
  };

  return (
    <div className='pages'>
      <nav className="tech-nav">
        <a href="#learnnode">Node.js</a>
        <a href="#learntypescript">TypeScript</a>
        <a href="#learnreact">React</a>
        <a href="#learnredis">Redis</a>
        <a href="#learngraphql">GraphQL</a>
        <a href="#learnnext">Next</a>
        <a href="#learnairtable">Airtable</a>
        <a href="#learnaxios">Axios</a>
        <a href="#learnmongo">MongoDB</a>
        <a href="#learnsequelize">Sequelize</a>
        <a href="#learnrest">Rest</a>
        <a href="#learnhtml">HTML</a>
        <a href="#learncss">CSS</a>
        <a href="#learnexpress">Express</a>
      </nav>
    <div className="title-container">     {/* Contenedor para el título y el círculo */}
      <div className="tit1">
         <CircularProgress progress={progress} />
      </div>
      <div className="tit2">
        <h1 className="page-title tit">Tutorials</h1>
      </div>
    </div>
    <div className="projects-grid">        {/* Contenedor para los proyectos */}
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} onComplete={handleComplete} />
      ))}
    </div>
  </div>
);
}