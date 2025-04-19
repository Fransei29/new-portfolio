import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import ThemeToggleButton from './ThemeToggleButton';

// 👇 Importa Typewriter sin SSR
const Typewriter = dynamic(() => import('react-simple-typewriter').then(mod => mod.Typewriter), { ssr: true });

// Definir la interfaz para las props
interface HomeTextProps {
  texts: string[]; // Asumiendo que 'texts' es un array de strings
}

const HomeText: React.FC<HomeTextProps> = ({ texts }) => {
    const [currentText, setCurrentText] = React.useState(texts[0]);
    const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowTypewriter(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <h3 className="title">
        Hi, <span className="name-highlight"> I&apos;m Franco</span>
      </h3>
      <div className="subtitle">
        <div className="subtitle-text">
          <p className="changing-text-container">
            <span className="changing-text">
              F
            <Typewriter
              words={texts}
              loop={0}
              cursor
              cursorStyle=""
              typeSpeed={60}
              deleteSpeed={60}
              delaySpeed={2000}
            />
            </span>
          </p>
          <div className="subtitle-textA">
            <p className="introduction-text">
              JavaScript developer with 2+ years of experience and expertise in 
              <span className="tech-words"> Next</span>, 
              <span className="tech-words"> React</span>, 
              <span className="tech-words"> Node</span> and 
              <span className="tech-words"> TypeScript</span>.
              <br />
              I create web apps and help others learn to code.
            </p>
          </div>
          <p className="tech-icons">
              <FaReact size={40} color="rgb(151, 0, 76)" />
              <TbBrandNextjs size={40} color="rgb(151, 0, 76)" />
              <FaNodeJs size={40} color="rgb(151, 0, 76)" />
              <SiTypescript size={40} color="rgb(151, 0, 76)" />
          </p>
          <ThemeToggleButton />
        </div>
        
      </div>
    </>
  );
};

export default HomeText;
