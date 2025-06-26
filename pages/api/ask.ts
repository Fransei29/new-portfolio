import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

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

// Fallback knowledge data in case file is not available
const fallbackKnowledge: Knowledge = {
  name: "Franco Seiler",
  role: "Full Stack Developer",
  bio: "I'm Franco Seiler, a Full Stack Developer from Córdoba, Argentina.",
  location: "Córdoba, Argentina",
  availability: "Open to remote or hybrid roles in Europe or globally",
  languages: ["Spanish (native)", "English (advanced)", "Italian (advanced)", "Dutch (basic)"],
  technologies: ["React", "TypeScript", "Node.js", "Next.js", "Python", "PostgreSQL"],
  experience: "3+ years developing modern and scalable web applications",
  technologyExperiences: {
    "React": "Built multiple interactive user interfaces with React",
    "TypeScript": "Applied TypeScript across all frontend and backend layers",
    "Node.js": "Built RESTful and GraphQL APIs with Node.js and Express"
  },
  projects: [
    {
      name: "E-commerce Platform",
      description: "Complete e-commerce platform with shopping cart, payments and admin panel",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      url: "https://github.com/francoseiler/ecommerce-platform"
    }
  ],
  education: "Information Systems Engineering",
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
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Python", "FastAPI"],
    databases: ["PostgreSQL", "MongoDB", "MySQL"],
    devops: ["Docker", "Git", "GitHub", "CI/CD"],
    testing: ["Jest", "React Testing Library", "Cypress"],
    tools: ["VS Code", "Postman", "Figma"]
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

    // Try to read knowledge base, fallback to default if not available
    let knowledge: Knowledge = fallbackKnowledge;
    
    try {
      const knowledgePath = path.join(process.cwd(), 'knowledge.json');
      
      if (fs.existsSync(knowledgePath)) {
        const knowledgeData = fs.readFileSync(knowledgePath, 'utf8');
        const parsedKnowledge = JSON.parse(knowledgeData);
        
        // Validate structure
        if (parsedKnowledge.name && parsedKnowledge.skills && parsedKnowledge.languages) {
          knowledge = parsedKnowledge;
        }
      }
    } catch (fileError) {
      console.warn('Using fallback knowledge data:', fileError);
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