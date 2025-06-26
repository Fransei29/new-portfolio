import { NextApiRequest, NextApiResponse } from 'next';

interface Knowledge {
  name: string;
  role: string;
  bio: string;
  location: string;
  availability: string;
  languages: string[];
  technologies: string[];
  experience: string;
  technologyExperiences: {
    [key: string]: string;
  };
  projects: Array<{
    name: string;
    description: string;
    impact?: string;
    technologies: string[];
    url?: string;
  }>;
  education: string;
  skills: {
    frontend: string;
    backend: string;
    databases: string;
    uiux: string;
    performance: string;
    testing: string;
    devops: string;
  };
  detailedTechnologies: {
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    testing: string[];
    tools: string[];
  };
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
  };
}

// Complete knowledge data embedded in the code
const knowledge: Knowledge = {
  name: "Franco Seiler",
  role: "Full Stack Developer",
  bio: "I'm Franco Seiler, a Full Stack Developer from Córdoba, Argentina. I have over 3 years of experience building scalable web applications with React, Node.js, TypeScript and modern tools. I'm passionate about clean code, performance, user experience and integrating AI into real-world products.",
  location: "Córdoba, Argentina",
  availability: "Open to remote or hybrid roles in Europe or globally",
  languages: ["Spanish (native)", "English (advanced)", "Italian (advanced)", "Dutch (basic)"],
  technologies: ["React", "TypeScript", "Node.js", "Next.js", "Python", "PostgreSQL"],
  experience: "3+ years developing modern and scalable web applications",
  technologyExperiences: {
    "React": "I've built multiple interactive user interfaces with React, including an e‑commerce platform and a task management app. I leveraged hooks, state management (Redux, Zustand), and performance optimizations to improve load times and responsiveness.",
    "Next.js": "I used Next.js for my portfolio and freelance projects to enable server‑side rendering, static site generation, and seamless routing. I integrated dynamic API routes and optimized the initial load with image and script optimization.",
    "TypeScript": "I applied TypeScript across all frontend and backend layers, reducing runtime errors by around 20% and enhancing code quality and developer experience.",
    "Node.js": "I built RESTful and GraphQL APIs with Node.js and Express, handling database connections, authentication, and business logic for various apps including e‑commerce and collaboration tools.",
    "Express": "In combination with Node.js, I used Express to structure scalable backends, define middleware, and handle routing and error management for production‑ready applications.",
    "Python": "I worked on backend utilities and scripts using Python and FastAPI/Django for specific freelance tasks, including data processing and small web services.",
    "FastAPI": "I used FastAPI to quickly spin up performant REST APIs, benefiting from its built‑in validation, documentation, and async capabilities.",
    "Django": "I built traditional web apps and admin interfaces with Django for internal tools, taking advantage of its ORM, authentication system and rapid scaffolding.",
    "PostgreSQL": "I used PostgreSQL extensively in my task manager and e‑commerce projects to model relational data with Prisma/Sequelize, write optimized SQL queries, and ensure data integrity.",
    "MongoDB": "I used MongoDB with Mongoose in my e‑commerce platform to model product catalogs, orders, and user sessions in a flexible document‑based structure.",
    "MySQL": "I applied MySQL in freelance projects requiring relational databases, creating schemas, relations and integrating with ORMs like Sequelize.",
    "Redis": "Implemented Redis for caching session data and improving performance in high‑traffic apps like task collaboration tools.",
    "SQLite": "Used lightweight SQLite databases for quick prototypes and small utilities where simplified storage was sufficient.",
    "GraphQL": "Built GraphQL APIs using Node.js and Express with Apollo Server, enabling flexible client queries in production apps.",
    "Docker": "Containerized applications end‑to‑end with Docker, defining Dockerfiles and docker‑compose for development and CI setups.",
    "Git/GitHub/GitLab": "I use Git daily with CI/CD pipelines, code reviews and branching strategies to ensure clean and collaborative development.",
    "AWS": "Deployed apps to AWS, managing CPU/storage with EC2 or Lambda, databases with RDS and S3 for static asset hosting.",
    "Vercel/Netlify": "Used Vercel and Netlify for deploying React/Next.js frontends with serverless functions and instant rollbacks.",
    "Jest": "Wrote unit tests for frontend components and backend endpoints to safeguard functionality and reduce regressions.",
    "React Testing Library": "Utilized RTL for testing UI components, ensuring accessibility compliance and component behavior.",
    "Cypress/Playwright": "Set up end‑to‑end tests with Cypress/Playwright to validate user flows like checkout or drag‑and‑drop.",
    "OAuth/NextAuth.js/JWT": "Implemented secure authentication flows using OAuth providers and JWT sessions in Next.js apps.",
    "Tailwind CSS/Sass/Bootstrap": "Styled UIs using Tailwind, Sass or Bootstrap, focusing on responsive design and consistency across devices.",
    "Framer Motion": "Added polished animations and transitions using Framer Motion to improve UX and polish interfaces.",
    "Postman": "Used Postman to test and document APIs during development and backend integrations.",
    "Figma/Adobe XD": "Created UI/UX mockups and prototypes in Figma and Adobe XD before implementation.",
    "SEO": "Optimized page structure, metadata, and performance to improve search visibility and Lighthouse scores.",
    "Accessibility (WCAG)": "Ensured ARIA labels, proper semantic HTML and keyboard navigation to meet WCAG accessibility standards."
  },
  projects: [
    {
      name: "E-commerce Platform",
      description: "Complete e-commerce platform with shopping cart, payments and admin panel",
      impact: "Handled product management, cart logic, Stripe integration and full admin control.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      url: "https://github.com/francoseiler/ecommerce-platform"
    },
    {
      name: "Task Management App",
      description: "Task management application with drag & drop, notifications and real-time collaboration",
      impact: "Built real-time collaboration features with Socket.io and organized task workflow logic.",
      technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL", "Tailwind CSS"],
      url: "https://github.com/francoseiler/task-manager"
    },
    {
      name: "Personal Portfolio",
      description: "Professional portfolio with modern design, animations and integrated AI assistant",
      impact: "Includes 3D interactions, performance optimization and OpenAI integration",
      technologies: ["Next.js", "TypeScript", "Framer Motion", "OpenAI API", "Tailwind CSS"],
      url: "https://github.com/francoseiler/portfolio"
    }
  ],
  education: "Information Systems Engineering - National University",
  skills: {
    frontend: "Frontend Development",
    backend: "Backend Development",
    databases: "Database Design",
    uiux: "UI/UX Design",
    performance: "Performance Optimization",
    testing: "Testing and Quality Assurance",
    devops: "CI/CD and DevOps"
  },
  detailedTechnologies: {
    frontend: [
      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "CSS3", "HTML5", "Framer Motion",
      "Redux", "Zustand", "Material UI", "Bootstrap", "Responsive Design", "Sass"
    ],
    backend: ["Node.js", "Express", "Python", "FastAPI", "Django", "REST APIs", "GraphQL"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Airtable", "Sequelize"],
    devops: ["Docker", "Git", "GitHub", "GitLab", "CI/CD", "AWS", "Vercel", "Netlify"],
    testing: ["Jest", "React Testing Library", "Cypress", "Playwright"],
    tools: ["VS Code", "Postman", "Figma", "Adobe XD", "Webpack", "Vite"]
  },
  contact: {
    email: "seilerfranco317@gmail.com",
    linkedin: "https://www.linkedin.com/in/franco-seiler/",
    github: "https://github.com/Fransei29"
  }
};

// Simple cache for common questions
const responseCache = new Map<string, string>();

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

    // Check cache first
    const cacheKey = message.toLowerCase().trim();
    if (responseCache.has(cacheKey)) {
      return res.status(200).json({ response: responseCache.get(cacheKey) });
    }

    // Build prompt with knowledge base
    const systemPrompt = `You are ${knowledge.name}'s AI assistant. Help visitors learn about his skills and experience.

ABOUT ${knowledge.name.toUpperCase()}:
- Role: ${knowledge.role}
- Location: ${knowledge.location}
- Experience: ${knowledge.experience}
- Languages: ${knowledge.languages.join(', ')}

TECHNOLOGIES:
Frontend: ${knowledge.detailedTechnologies.frontend.join(', ')}
Backend: ${knowledge.detailedTechnologies.backend.join(', ')}
Databases: ${knowledge.detailedTechnologies.databases.join(', ')}
DevOps: ${knowledge.detailedTechnologies.devops.join(', ')}
Testing: ${knowledge.detailedTechnologies.testing.join(', ')}
Tools: ${knowledge.detailedTechnologies.tools.join(', ')}

PROJECTS:
${knowledge.projects.map(project => 
  `• ${project.name}: ${project.description} (${project.technologies.join(', ')})`
).join('\n')}

SKILLS: ${Object.values(knowledge.skills).join(', ')}

CONTACT: ${knowledge.contact.email} | ${knowledge.contact.linkedin} | ${knowledge.contact.github}

RESPONSE GUIDELINES:
• Be confident and specific about ${knowledge.name}'s skills
• If asked about a technology in the list, confirm he knows it and mention relevant projects
• If asked about languages, mention his language skills: ${knowledge.languages.join(', ')}
• If technology not listed, say "I don't have specific information about that"
• Keep responses under 100 words unless more detail is requested
• Always be helpful and professional
• Respond in English

TECHNOLOGY EXPERIENCES (for detailed questions):
${Object.entries(knowledge.technologyExperiences).map(([tech, experience]) => 
  `${tech}: ${experience}`
).join('\n')}`;

    const userPrompt = `User question: ${message}`;

    // Call OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://www.francoseiler.com',
        'X-Title': 'Portfolio Franco Seiler',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API Error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0]?.message?.content;

    if (!assistantResponse) {
      throw new Error('No response from OpenRouter');
    }

    // Cache the response for future use
    responseCache.set(cacheKey, assistantResponse);

    res.status(200).json({ response: assistantResponse });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
}