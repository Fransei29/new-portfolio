import React, { useState } from "react";

// Interfaz para definir el tipo del estado isOpen
interface IsOpenState {
  [key: string]: boolean;
}

const Experience: React.FC = () => {
  const [isOpen, setIsOpen] = useState<IsOpenState>({});

  const toggleDetail = (id: string): void => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <section className="experience-section">
        <p className="highlight">Experience</p>
        <div className="timeline">
          {/* Coursfy */}
          <div className="experience-item" onClick={() => toggleDetail("coursfy")}>
            <div className="circle"></div>
            <div className="experience-content">
              <h1 className="title-experience">Full Stack Developer at Intelligent Apps Sweden</h1>
              <p className="experience-date">October 2024 - Present</p>
              {isOpen.coursfy && (
                <ul>
                  <li>Developed responsive front-end pages with <strong>Next.js</strong> and <strong>React</strong>.</li>
                  <li>Integrated a payment API for seamless transactions.</li>
                  <li>Populated and consumed APIs for client-server communication.</li>
                  <li>Collaborated on performance and scalability optimizations.</li>
                </ul>
              )}
            </div>
          </div>

          {/* Freelance */}
          <div className="experience-item" onClick={() => toggleDetail("freelance")}>
            <div className="circle"></div>
            <div className="experience-content">
              <h1 className="title-experience">Front-End Developer - Freelance</h1>
              <p className="experience-date">March 2024 - October 2024</p>
              {isOpen.freelance && (
                <ul>
                  <li>Built responsive web applications using <strong>React</strong> and <strong>Next.js</strong>.</li>
                  <li>Optimized performance, improving loading times by 30%.</li>
                  <li>Integrated <strong>Redux</strong> for state management in e-commerce platforms.</li>
                  <li>Applied <strong>TypeScript</strong> for improved code quality and reduced runtime errors.</li>
                </ul>
              )}
            </div>
          </div>

          {/* Digital Innovators */}
          <div className="experience-item" onClick={() => toggleDetail("digitalInnovators")}>
            <div className="circle"></div>
            <div className="experience-content">
              <h1 className="title-experience">Front-End Developer at Digital Innovators</h1>
              <p className="experience-date">May 2023 - February 2024</p>
              {isOpen.digitalInnovators && (
                <ul>
                  <li>Built and maintained SPAs using <strong>React</strong> and <strong>Redux</strong>.</li>
                  <li>Increased user retention by 15% and improved conversion rates by 20%.</li>
                  <li>Contributed to an internal component library, reducing development time by 30%.</li>
                  <li>Developed custom <strong>React</strong> hooks to enhance code modularity.</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
