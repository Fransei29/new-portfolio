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

    // Simple knowledge base
    const knowledge = {
      name: "Franco Seiler",
      role: "Full Stack Developer",
      location: "Córdoba, Argentina",
      experience: "3+ years",
      languages: ["Spanish (native)", "English (advanced)", "Italian (advanced)", "Dutch (basic)"],
      technologies: {
        frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
        backend: ["Node.js", "Express", "Python", "FastAPI"],
        databases: ["PostgreSQL", "MongoDB", "MySQL"],
        devops: ["Docker", "Git", "AWS", "Vercel"]
      },
      projects: [
        "E-commerce Platform (React, Node.js, MongoDB)",
        "Task Management App (React, TypeScript, PostgreSQL)",
        "Personal Portfolio (Next.js, TypeScript, AI Integration)"
      ],
      contact: {
        email: "seilerfranco317@gmail.com",
        linkedin: "https://www.linkedin.com/in/franco-seiler/",
        github: "https://github.com/Fransei29"
      }
    };

    // Build a simple prompt
    const systemPrompt = `You are ${knowledge.name}'s AI assistant. Help visitors learn about his skills and experience.

ABOUT ${knowledge.name.toUpperCase()}:
- Role: ${knowledge.role}
- Location: ${knowledge.location}
- Experience: ${knowledge.experience}
- Languages: ${knowledge.languages.join(', ')}

TECHNOLOGIES:
Frontend: ${knowledge.technologies.frontend.join(', ')}
Backend: ${knowledge.technologies.backend.join(', ')}
Databases: ${knowledge.technologies.databases.join(', ')}
DevOps: ${knowledge.technologies.devops.join(', ')}

PROJECTS:
${knowledge.projects.map(project => `• ${project}`).join('\n')}

CONTACT: ${knowledge.contact.email} | ${knowledge.contact.linkedin} | ${knowledge.contact.github}

RESPONSE GUIDELINES:
• Be helpful and professional
• Keep responses under 100 words
• Respond in English
• If asked about a technology, confirm if it's in the list
• If asked about languages, mention his language skills`;

    const userPrompt = `User question: ${message}`;

    // Call OpenRouter with error handling
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
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('OpenRouter API Error:', response.status, response.statusText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices?.[0]?.message?.content;

    if (!assistantResponse) {
      throw new Error('No response from OpenRouter');
    }

    res.status(200).json({ response: assistantResponse });
  } catch (error) {
    console.error('API Error:', error);
    
    // Return a helpful fallback response instead of error
    res.status(200).json({ 
      response: "Hi! I'm Franco's AI assistant. I'm having trouble connecting right now, but you can reach Franco directly at seilerfranco317@gmail.com or check out his projects at https://github.com/Fransei29"
    });
  }
}