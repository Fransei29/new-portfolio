import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userMessage = message.toLowerCase().trim();

    // Predefined responses for common questions
    const responses: { [key: string]: string } = {
      'hello': "Hello! I'm Franco's AI assistant. How can I help you learn about his skills and experience?",
      'hi': "Hi there! I'm here to help you learn about Franco Seiler's background and technical skills.",
      'who are you': "I'm Franco's AI assistant, designed to help visitors learn about his skills, projects, and experience as a Full Stack Developer.",
      'what does franco do': "Franco is a Full Stack Developer with 3+ years of experience building scalable web applications. He specializes in React, Node.js, TypeScript, and modern web technologies.",
      'react': "Yes! Franco has extensive experience with React. He's built multiple interactive user interfaces including an e-commerce platform and task management app using React hooks, state management, and performance optimizations.",
      'typescript': "Absolutely! Franco applies TypeScript across all frontend and backend layers, which has helped reduce runtime errors by around 20% and enhanced code quality significantly.",
      'node.js': "Yes, Franco has built RESTful and GraphQL APIs with Node.js and Express, handling database connections, authentication, and business logic for various applications.",
      'next.js': "Franco uses Next.js for server-side rendering, static site generation, and seamless routing. He's integrated dynamic API routes and optimized initial load performance.",
      'python': "Franco has worked with Python for backend utilities and scripts, using FastAPI and Django for specific freelance tasks including data processing and web services.",
      'postgresql': "Franco has used PostgreSQL extensively in his task manager and e-commerce projects, modeling relational data and writing optimized SQL queries.",
      'mongodb': "Yes, Franco has experience with MongoDB, using it with Mongoose in his e-commerce platform to model product catalogs and user sessions.",
      'languages': "Franco speaks Spanish (native), English (advanced), Italian (advanced), and Dutch (basic). He's comfortable working in international teams.",
      'projects': "Franco has built several key projects: 1) E-commerce Platform with React, Node.js, and MongoDB, 2) Task Management App with React, TypeScript, and PostgreSQL, 3) This Portfolio with Next.js and AI integration.",
      'contact': "You can reach Franco at seilerfranco317@gmail.com, connect on LinkedIn at https://www.linkedin.com/in/franco-seiler/, or check out his code at https://github.com/Fransei29",
      'experience': "Franco has 3+ years of experience developing modern and scalable web applications. He's worked on e-commerce platforms, task management systems, and various freelance projects.",
      'skills': "Franco's skills include Frontend (React, Next.js, TypeScript), Backend (Node.js, Express, Python), Databases (PostgreSQL, MongoDB), and DevOps (Docker, Git, AWS, Vercel).",
      'location': "Franco is based in Córdoba, Argentina, but is open to remote or hybrid roles in Europe or globally.",
      'availability': "Franco is currently open to new opportunities, particularly remote or hybrid roles in Europe or globally.",
      'education': "Franco studied Information Systems Engineering at the National University.",
      'github': "You can find Franco's projects and code at https://github.com/Fransei29",
      'linkedin': "Connect with Franco on LinkedIn at https://www.linkedin.com/in/franco-seiler/",
      'email': "You can reach Franco directly at seilerfranco317@gmail.com"
    };

    // Check for exact matches first
    if (responses[userMessage]) {
      return res.status(200).json({ response: responses[userMessage] });
    }

    // Check for partial matches
    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.includes(key) || key.includes(userMessage)) {
        return res.status(200).json({ response });
      }
    }

    // Check for technology keywords
    const techKeywords: { [key: string]: string } = {
      'javascript': responses['react'],
      'js': responses['react'],
      'frontend': responses['react'],
      'backend': responses['node.js'],
      'api': responses['node.js'],
      'database': responses['postgresql'],
      'sql': responses['postgresql'],
      'nosql': responses['mongodb'],
      'devops': "Franco has experience with Docker, Git, AWS, Vercel, and CI/CD pipelines for deployment and development workflows.",
      'testing': "Franco uses Jest, React Testing Library, and Cypress for unit testing, component testing, and end-to-end testing.",
      'css': "Franco is proficient with Tailwind CSS, Sass, and responsive design principles for creating modern, accessible user interfaces.",
      'html': "Franco has strong HTML5 skills and focuses on semantic markup and accessibility standards.",
      'git': "Franco uses Git daily with CI/CD pipelines, code reviews, and branching strategies to ensure clean and collaborative development.",
      'docker': "Franco has containerized applications end-to-end with Docker, defining Dockerfiles and docker-compose for development and CI setups.",
      'aws': "Franco has deployed apps to AWS, managing EC2, Lambda, RDS databases, and S3 for static asset hosting.",
      'vercel': "Franco uses Vercel for deploying React/Next.js frontends with serverless functions and instant rollbacks.",
      'tailwind': "Franco is proficient with Tailwind CSS for rapid UI development and responsive design.",
      'framer': "Franco uses Framer Motion for polished animations and transitions to improve user experience.",
      'stripe': "Franco has integrated Stripe payments in his e-commerce platform for secure payment processing.",
      'graphql': "Franco has built GraphQL APIs using Node.js and Express with Apollo Server for flexible client queries."
    };

    for (const [keyword, response] of Object.entries(techKeywords)) {
      if (userMessage.includes(keyword)) {
        return res.status(200).json({ response });
      }
    }

    // Default response for unknown questions
    const defaultResponse = "I'm not sure about that specific question, but I can tell you about Franco's skills, projects, experience, or contact information. What would you like to know?";
    
    res.status(200).json({ response: defaultResponse });
  } catch (error) {
    console.error('API Error:', error);
    res.status(200).json({ 
      response: "Hi! I'm Franco's AI assistant. I'm having trouble right now, but you can reach Franco directly at seilerfranco317@gmail.com or check out his projects at https://github.com/Fransei29"
    });
  }
}