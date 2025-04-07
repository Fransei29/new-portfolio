"use client"

import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  FileText,
  Github,
  ExternalLink
} from 'lucide-react';
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

const ProjectCard = ({ project, showDocumentation = true }) => {
  return (
    <div className="project-card" id={project.title.toLowerCase().replace(/\s/g, "")}>
      {/* Contenedor superior con logo y preview */}
      <div className="project-header">
        {/* Logo + título */}
        <div className="project-title-container-card">
          <div className="project-title">
            {project.icon && (
              <project.icon className="project-icon" />
            )}
          </div>
          <div>
            <h2>{project.title}</h2>
          </div>
        </div>


        {/* Imagen de previsualización */}
        {project.previewImage && (
          <div className="project-preview">
            <Image
              src={project.previewImage}
              alt={`${project.title} Preview`}
              width={270} // Reducimos un poco el tamaño para que encaje mejor
              height={120}
              quality={100}
              layout="intrinsic"
              priority
              className="project-image"
            />
          </div>
        )}
      </div>

      {/* Descripción y botones */}
      <div className="project-footer">
        <p className="project-description">{project.description}</p>
        <div className="project-links">
          {showDocumentation && project.link1 && (
            <a href={project.link1} target="_blank" rel="noopener noreferrer">
              <FileText className="iconSmall" size={19} /> Docs
            </a>
          )}
          {project.link2 && (
            <a href={project.link2} target="_blank" rel="noopener noreferrer">
              <Github className="iconSmall" size={19} /> GitHub
            </a>
          )}
          {project.link3 && (
            <a href={project.link3} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="iconSmall" size={19} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
