import { NextResponse } from 'next/server';

export async function GET() {
    const projects = [
      {
        id: '1',
        title: 'Redis',
        isTutorial: true,
        description: "Discover how to use Redis as an in-memory database. Installation, setup, and basic commands for caching data, managing sessions, and handling real-time data. \nYou'll also implement a caching mechanism in a Node.js app to optimize performance.",
        icon:'/icons/redis.svg',
        link1: 'https://redis.io/docs/latest/',
        link2: 'https://github.com/Fransei29/Redis/blob/main/index.js',
        link3: 'https://vestire-front-s196.vercel.app/',
        previewImage: '/img/vestire.webp',
        logs: [
          'git init',
          'git clone https://github.com/Fransei29/Redis.git',
          'cd Redis',
          'npm install',
          'node index.js'
        ]
      }, 
      {
        id: '2',
        title: 'TypeScript',
        isTutorial: true,
        description: 'Enhance your JavaScript skills with TypeScript and use its powerful type-checking features, and integrate it with popular frameworks like React. \nYou will build a small application to see how TypeScript can improve code quality and reduce bugs.',
        icon: '/icons/typescript.svg',
        link1: 'https://www.typescriptlang.org/docs/',
        link2: 'https://github.com/Fransei29/react-typescript/blob/main/src/App.tsx',
        link3: 'https://react-typescript-oqzgk3zxt-francos-projects-94304a5e.vercel.app/',
        previewImage: '/img/Type.webp',
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
          title: 'Node',
          isTutorial: true,
          description: 'Learn the fundamentals of Node.js through creating RESTful APIs, managing routing, and handling data with Express.js. \nYou will also learn how to connect to databases and implement basic CRUD operations.',
          icon: '/icons/nodedotjs.svg',
          link1: 'https://nodejs.org/docs/latest/api/',
          link2: 'https://github.com/Fransei29/NodeJS/blob/main/hello.js',
          link3: 'https://verdufront-zbzb.vercel.app/', 
          previewImage: '/img/verdu3.jpg',
          logs: [
            'git init',
            'git clone https://github.com/Fransei29/NodeJS.git',
            'cd NodeJS',
            'npm install',
            'node hello.js'
          ]
        },    
        {
          id: '4',
          title: 'Ecommerce',
          isTutorial: true,
          description: 'Learn how to build a complete ecommerce website from scratch. This tutorial covers everything from modern frontend design to backend integration, product management, shopping cart functionality, and final deployment.\nPerfect for understanding the full flow of an online store.',
          icon: '/icons/nextdotjs.svg',
          link1: 'https://nextjs.org/docs',
          link2: 'https://github.com/Fransei29/sport-ecommerce/blob/main/README.md',
          link3: 'https://sport-ecommerce-58pi.vercel.app/',
          previewImage: '/img/img/ecommerce/ecoA.webp',
          logs: [
            'git init',
            'git clone https://github.com/Fransei29/Ecommerce-Tutorial.git',
            'cd Ecommerce-Tutorial',
            'npm install',
            'npm run dev'
          ]
        },   
        {
          id: '5',
          title: 'Mongo',
          isTutorial: true,
          description: "Get started with MongoDB by building a CRUD application. \nThis tutorial covers setting up a MongoDB database, connecting it with a Node.js backend, and performing operations like inserting, updating, deleting, and retrieving data.",
          icon: '/icons/mongodb.svg',
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
          id: '6',
          title: 'React',
          isTutorial: true,
          description: 'Dive into the core concepts of React by learning about components, hooks, state management, and lifecycle methods. \nThis tutorial also demonstrates how to handle user input, manage form data, and make API requests to fetch and display data.',
          icon: '/icons/react.svg',
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
          id: '7',
          title: 'Next',
          isTutorial: true,
          description: "Explore server-side rendering and static site generation with Next.js. \nLearn how to create dynamic routes, fetch data server-side, and deploy your application to platforms like Vercel.",
          icon: '/icons/nextdotjs.svg',
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
          id: '8',
          title: 'GraphQL',
          isTutorial: true,
          description: "You'll learn how to set up a GraphQL server, define schemas, and create resolvers. \nThis tutorial also covers integrating GraphQL with a front-end framework like React to fetch and display data dynamically.",
          icon: '/icons/graphql.svg',
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
          id: '9',
          title: 'Airtable',
          isTutorial: true,
          description: "Learn how to use Airtable. This tutorial shows you how to set up an Airtable base, manage data, and interact with it through APIs. \nYou'll integrate Airtable with a JavaScript application to fetch and display data.",
          icon: '/icons/airtable.svg',
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
          id: '10',
          title: 'Axios',
          isTutorial: true,
          description: "Simplify HTTP requests with Axios. Learn how to handle HTTP requests and responses, manage errors, and make asynchronous operations easier. \nThis tutorial will help you create a seamless data-fetching experience in your web applications.",
          icon: '/icons/axios.svg',
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
          id: '11',
          title: 'Sequelize',
          isTutorial: true,
          description: "Understand how to use Sequelize, an ORM for Node.js, to manage your relational databases effectively. This tutorial guides you through setting up Sequelize, defining models, and creating associations. \nYou'll build a simple API that interacts with a PostgreSQL database.",
          icon: '/icons/sequelize.svg',
          link1: 'https://sequelize.org/docs/v6/getting-started/',
          link2: 'https://github.com/Fransei29/SEQUELIZE/blob/main/index.js',
          previewImage: '/img/vestire.webp',
          logs: [
            'git init',
            'git clone https://github.com/Fransei29/SEQUELIZE.git',
            'cd SEQUELIZE',
            'npm install',
            'node index.js'
          ]
        },
        {
          id: '12',
          title: 'REST',
          isTutorial: true,
          description: "Learn how to design and implement RESTful APIs using Node.js and Express.js. This tutorial walks you through creating routes, handling HTTP methods, and managing CRUD operations. \nBy the end, you'll have a functional API that can handle various client requests.",
          icon: '/icons/nextdotjs.svg',
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
          id: '13',
          title: 'Express',
          isTutorial: true,
          description: "Deepen your understanding of backend development with Express.js. This tutorial covers middleware, routing, and error handling in Express. \nYou'll build a web server that can handle multiple requests and serve dynamic content efficiently.",
          icon: '/icons/express.svg',
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
        },
        {
          id: '14',
          title: 'HTML',
          isTutorial: true,
          description: "Build a solid foundation in web development with this tutorial on HTML and CSS. You'll learn how to create structured web pages, style them with CSS, and make them responsive. \nBy the end, you'll have a portfolio-ready webpage that looks great on any device.",
          icon: '/icons/html5.svg',
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
          id: '15',
          title: 'CSS',
          isTutorial: true,
          description: 'An introductory tutorial focused on the fundamentals of CSS for styling web pages. \nIt demonstrates how to effectively use CSS to create visually appealing, well-structured websites.',
          icon: '/icons/css.svg',
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
     
      ];
      return NextResponse.json(projects); 
}
