import React, { useState } from "react";

const Experience = () => {
  const [isOpen, setIsOpen] = useState({});

  const toggleDetail = (id) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <p className="highlight">Experience</p>
      <section className="experience-section">
        <div className="timeline">
          {/* Coursfy */}
          <div className="experience-item" onClick={() => toggleDetail("coursfy")}>
            <div className="circle"></div>
            <div className="experience-content">
              <h1 className="title-experience">Full Stack Developer at Coursfy</h1>
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
                  <li>Developed responsive web apps with <strong>React</strong> and <strong>Next.js</strong>.</li>
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

