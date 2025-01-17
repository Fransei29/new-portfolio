"use client"

import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import './/ProjectCard.css'

// Función para formatear el título
const formatTitle = (title) => {
  const words = title.split(' ');
  return (
    <>
      {words[0]}{" "}
      <span className="highlight-second-word">
        {words[1] || ''}
      </span>
      {words.slice(2).length > 0 && ` ${words.slice(2).join(' ')}`}
    </>
  );
};

const ProjectCard = ({ project, showDocumentation = true, onComplete }) => {
  
  const [showLogs, setShowLogs] = useState(false);

  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };

  return (
    <div className="project-card" id={project.title.toLowerCase().replace(/\s/g, '')}>
      <div className="project-title">
        {project.icon && (
          <Image src={project.icon} alt={`${project.title} Icon`} width={38} height={38} className="project-icon" />
        )}
        <h2>{formatTitle(project.title)}</h2>
      </div>
      {project.previewImage && (
        <div className="project-preview">
          <Image src={project.previewImage} alt={`${project.title} Preview`} width={205} height={105} className="project-image"/>
        </div>
      )}
      <div>
      <p className="project-description">{project.description}</p>
      {showDocumentation && project.link1 && (
        <a href={project.link1} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-file-alt"></i> Docs
        </a>
      )}
      {project.link2 && (
        <a href={project.link2} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i> Github
        </a>
      )}
      {project.link3 && (
        <a href={project.link3} target="_blank" rel="noopener noreferrer" >
         <i className="fas fa-external-link-alt"></i> Live
        </a>
      )}
    </div>
 </div>
  );
};

export default ProjectCard;
