import { NextApiRequest, NextApiResponse } from 'next';
import knowledge from '../../knowledge.json';

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

    // Helper function to find best matching response
    const findBestMatch = (query: string, data: any): string | null => {
      const queryWords = query.split(' ').filter(word => word.length > 2); // Filter out short words like 'o', 'a', 'the'
      
      // Check for exact matches first
      for (const [key, value] of Object.entries(data)) {
        if (query.includes(key.toLowerCase()) || key.toLowerCase().includes(query)) {
          return typeof value === 'string' ? value : JSON.stringify(value);
        }
      }
      
      // Check for partial word matches (more flexible)
      for (const [key, value] of Object.entries(data)) {
        const keyWords = key.toLowerCase().split(' ');
        if (queryWords.some(word => keyWords.some(keyWord => keyWord.includes(word) || word.includes(keyWord)))) {
          return typeof value === 'string' ? value : JSON.stringify(value);
        }
      }
      
      return null;
    };

    // Check basic greetings and questions
    const basicResponses: { [key: string]: string } = {
      'hello': `Hello! I'm Franco's AI assistant. How can I help you learn about his skills and experience?`,
      'hi': `Hi there! I'm here to help you learn about Franco Seiler's background and technical skills.`,
      'who are you': `I'm Franco's AI assistant, designed to help visitors learn about his skills, projects, and experience as a Full Stack Developer.`,
      'what does franco do': `Franco is a Full Stack Developer with ${knowledge.experience}. He specializes in React, Node.js, TypeScript, and modern web technologies.`,
      'who is franco': `Franco Seiler is a ${knowledge.role} from ${knowledge.location}. ${knowledge.bio}`,
      'is franco a good developer': `Yes! Franco is an excellent developer with ${knowledge.experience}. He has built multiple successful projects including StartOn, Quiero Sport e-commerce, and Property Recommender. His technical skills span React, TypeScript, Node.js, and modern web technologies.`,
      'is he a good developer': `Yes! Franco is an excellent developer with ${knowledge.experience}. He has built multiple successful projects including StartOn, Quiero Sport e-commerce, and Property Recommender. His technical skills span React, TypeScript, Node.js, and modern web technologies.`,
      'good developer': `Yes! Franco is an excellent developer with ${knowledge.experience}. He has built multiple successful projects including StartOn, Quiero Sport e-commerce, and Property Recommender. His technical skills span React, TypeScript, Node.js, and modern web technologies.`,
      'where is franco': `Franco is currently based in ${knowledge.location}. ${knowledge.availability}`,
      'where is he': `Franco is currently based in ${knowledge.location}. ${knowledge.availability}`,
      'where he is': `Franco is currently based in ${knowledge.location}. ${knowledge.availability}`,
      'where he is now': `Franco is currently based in ${knowledge.location}. ${knowledge.availability}`,
      'where he is located': `Franco is currently based in ${knowledge.location}. ${knowledge.availability}`,
      'what is franco doing now': `Franco is currently ${knowledge.availability.toLowerCase()}. He's actively working on new projects and is open to new opportunities, particularly remote or hybrid roles in Europe or globally.`,
      'what is he doing now': `Franco is currently ${knowledge.availability.toLowerCase()}. He's actively working on new projects and is open to new opportunities, particularly remote or hybrid roles in Europe or globally.`,
      'what is he doing': `Franco is currently ${knowledge.availability.toLowerCase()}. He's actively working on new projects and is open to new opportunities, particularly remote or hybrid roles in Europe or globally.`,
      'current status': `Franco is currently ${knowledge.availability.toLowerCase()}. He's actively working on new projects and is open to new opportunities, particularly remote or hybrid roles in Europe or globally.`,
      'status': `Franco is currently ${knowledge.availability.toLowerCase()}. He's actively working on new projects and is open to new opportunities, particularly remote or hybrid roles in Europe or globally.`,
      'email': `Franco's email is ${knowledge.contact.email}`,
      'his email': `Franco's email is ${knowledge.contact.email}`,
      'franco email': `Franco's email is ${knowledge.contact.email}`,
      'give me his email': `Franco's email is ${knowledge.contact.email}`,
      'contact email': `Franco's email is ${knowledge.contact.email}`,
      'github': `Franco's GitHub profile is ${knowledge.contact.github}`,
      'his github': `Franco's GitHub profile is ${knowledge.contact.github}`,
      'franco github': `Franco's GitHub profile is ${knowledge.contact.github}`,
      'linkedin': `Franco's LinkedIn profile is ${knowledge.contact.linkedin}`,
      'his linkedin': `Franco's LinkedIn profile is ${knowledge.contact.linkedin}`,
      'franco linkedin': `Franco's LinkedIn profile is ${knowledge.contact.linkedin}`,
      'give me his email o contact': `Franco's email is ${knowledge.contact.email}`,
      'give me his email or contact': `Franco's email is ${knowledge.contact.email}`,
      'where is he now give me his email': `Franco is currently based in ${knowledge.location}. ${knowledge.availability}\n\nHis email is ${knowledge.contact.email}`,
      'where is he give me his email': `Franco is currently based in ${knowledge.location}. ${knowledge.availability}\n\nHis email is ${knowledge.contact.email}`,
      'how is franco gmail': `Franco's Gmail is ${knowledge.contact.email}`,
      'franco gmail': `Franco's Gmail is ${knowledge.contact.email}`,
      'his gmail': `Franco's Gmail is ${knowledge.contact.email}`,
      'gmail': `Franco's Gmail is ${knowledge.contact.email}`,
      'how is franco email': `Franco's email is ${knowledge.contact.email}`,
      'franco email address': `Franco's email address is ${knowledge.contact.email}`,
      'email address': `Franco's email address is ${knowledge.contact.email}`,
    };

    // Check for exact matches first
    if (basicResponses[userMessage]) {
      return res.status(200).json({ response: basicResponses[userMessage] });
    }

    // Check for partial matches in basic responses
    for (const [key, response] of Object.entries(basicResponses)) {
      if (userMessage.includes(key) || key.includes(userMessage)) {
        return res.status(200).json({ response });
      }
    }

    // Check for combined questions (location + contact)
    const locationKeywords = ['where', 'location', 'based', 'live', 'reside', 'currently', 'now', 'doing', 'status'];
    const contactKeywords = ['email', 'gmail', 'github', 'linkedin', 'contact', 'reach', 'get in touch', 'give me', 'his email', 'franco email', 'email address'];
    
    const hasLocationKeyword = locationKeywords.some(keyword => userMessage.includes(keyword));
    const hasContactKeyword = contactKeywords.some(keyword => userMessage.includes(keyword));
    
    // Handle combined questions
    if (hasLocationKeyword && hasContactKeyword) {
      return res.status(200).json({ 
        response: `Franco is currently based in ${knowledge.location}. ${knowledge.availability}\n\nYou can reach him at:\n• Email: ${knowledge.contact.email}\n• LinkedIn: ${knowledge.contact.linkedin}\n• GitHub: ${knowledge.contact.github}` 
      });
    }
    
    // Handle contact-only questions
    if (hasContactKeyword) {
      // Check if it's specifically asking for email
      if (userMessage.includes('email') || userMessage.includes('give me his email')) {
        return res.status(200).json({ 
          response: `Franco's email is ${knowledge.contact.email}` 
        });
      }
      // Otherwise provide full contact info
      return res.status(200).json({ 
        response: `You can reach Franco at:\n• Email: ${knowledge.contact.email}\n• LinkedIn: ${knowledge.contact.linkedin}\n• GitHub: ${knowledge.contact.github}` 
      });
    }

    // Handle location-only questions
    if (hasLocationKeyword) {
      return res.status(200).json({ 
        response: `Franco is currently based in ${knowledge.location}. ${knowledge.availability}` 
      });
    }

    // Check technology experiences
    const techMatch = findBestMatch(userMessage, knowledge.technologyExperiences);
    if (techMatch) {
      return res.status(200).json({ response: techMatch });
    }

    // Check projects
    if (userMessage.includes('project') || userMessage.includes('starton') || userMessage.includes('ecommerce') || userMessage.includes('property') || userMessage.includes('medicare') || userMessage.includes('task')) {
      const projectNames = knowledge.projects.map(p => p.name.toLowerCase());
      const matchingProject = knowledge.projects.find(p => 
        userMessage.includes(p.name.toLowerCase()) || 
        p.name.toLowerCase().includes(userMessage)
      );
      
      if (matchingProject) {
        const response = `${matchingProject.name}: ${matchingProject.description}\n\nImpact: ${matchingProject.impact}\n\nTechnologies: ${matchingProject.technologies.join(', ')}\n\nGitHub: ${matchingProject.url}${matchingProject.liveDemo ? `\nLive Demo: ${matchingProject.liveDemo}` : ''}`;
        return res.status(200).json({ response });
      } else {
        const projectsList = knowledge.projects.map(p => `• ${p.name}: ${p.description}`).join('\n');
        return res.status(200).json({ 
          response: `Franco has built several key projects:\n\n${projectsList}\n\nWould you like to know more about any specific project?` 
        });
      }
    }

    // Check work experience
    if (userMessage.includes('experience') || userMessage.includes('work') || userMessage.includes('job') || userMessage.includes('career')) {
      const experienceList = knowledge.workExperience.map(exp => 
        `${exp.title} at ${exp.company} (${exp.date})\n${exp.description.join('\n')}`
      ).join('\n\n');
      return res.status(200).json({ 
        response: `Franco's work experience:\n\n${experienceList}` 
      });
    }

    // Check skills
    if (userMessage.includes('skill') || userMessage.includes('technology') || userMessage.includes('tech')) {
      const skillsList = Object.entries(knowledge.skills).map(([key, value]) => 
        `• ${value}: ${knowledge.detailedTechnologies[key as keyof typeof knowledge.detailedTechnologies]?.join(', ') || 'Various technologies'}`
      ).join('\n');
      return res.status(200).json({ 
        response: `Franco's technical skills:\n\n${skillsList}` 
      });
    }

    // Check contact information
    if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('linkedin') || userMessage.includes('github')) {
      return res.status(200).json({ 
        response: `You can reach Franco at:\n• Email: ${knowledge.contact.email}\n• LinkedIn: ${knowledge.contact.linkedin}\n• GitHub: ${knowledge.contact.github}` 
      });
    }

    // Check location and availability
    if (userMessage.includes('location') || userMessage.includes('where') || userMessage.includes('based')) {
      return res.status(200).json({ 
        response: `Franco is based in ${knowledge.location}. ${knowledge.availability}` 
      });
    }

    // Check languages
    if (userMessage.includes('language') || userMessage.includes('speak')) {
      return res.status(200).json({ 
        response: `Franco speaks: ${knowledge.languages.join(', ')}` 
      });
    }

    // Check achievements
    if (userMessage.includes('achievement') || userMessage.includes('accomplish') || userMessage.includes('success')) {
      const achievementsList = knowledge.achievements.map(achievement => `• ${achievement}`).join('\n');
      return res.status(200).json({ 
        response: `Franco's key achievements:\n\n${achievementsList}` 
      });
    }

    // Check education
    if (userMessage.includes('education') || userMessage.includes('study') || userMessage.includes('degree')) {
      const educationList = knowledge.education.map(edu => 
        `${edu.degree} - ${edu.institution}${edu.location ? ` (${edu.location})` : ''} - ${edu.date}`
      ).join('\n');
      return res.status(200).json({ 
        response: `Franco's education:\n\n${educationList}` 
      });
    }

    // Default response for unknown questions
    const defaultResponse = `I'm not sure about that specific question, but I can tell you about Franco's skills, projects, experience, or contact information. What would you like to know?\n\nYou can ask about:\n• His projects (StartOn, Quiero Sport, Property Recommender, etc.)\n• His technical skills (React, TypeScript, Node.js, etc.)\n• His work experience\n• His contact information\n• His location and availability`;
    
    res.status(200).json({ response: defaultResponse });
  } catch (error) {
    console.error('API Error:', error);
    res.status(200).json({ 
      response: `Hi! I'm Franco's AI assistant. I'm having trouble right now, but you can reach Franco directly at ${knowledge.contact.email} or check out his projects at ${knowledge.contact.github}`
    });
  }
}