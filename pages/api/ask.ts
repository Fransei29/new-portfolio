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

    // Read knowledge base
    const knowledgePath = path.join(process.cwd(), 'knowledge.json');
    const knowledgeData = fs.readFileSync(knowledgePath, 'utf8');
    const knowledge: Knowledge = JSON.parse(knowledgeData);

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