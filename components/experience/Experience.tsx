import React, { useState } from "react";
import styles from "./Experience.module.scss";
import "../../app/globals.css";

interface IsOpenState {
  [key: string]: boolean;
}

const Experience: React.FC = () => {
  const [isOpen, setIsOpen] = useState<IsOpenState>({});

  const toggleDetail = (id: string): void => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderIcon = () => (
    <span className={styles.timelineIcon}>
      <svg
        className={styles.timelineSvg}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </span>
  );

  return (
    <section className={styles.experienceContainer}>
    <div className={styles.experienceSection}>
        <p className={styles.highlight}>Experience</p>
        <ol className={styles.timeline}>
          <li className={styles.timelineItem} onClick={() => toggleDetail("coursfy")}>
            <div className={styles.timelineLeft}>
              <div className={styles.timelineIcon}>
                {renderIcon()}
              </div>
            </div>
            <div className={styles.timelineRight}>
            <h3 className={styles.titleExperience}>
              <span className={styles.jobTitle}>Full Stack Developer</span>
              <span className={styles.companyName}>Intelligent Apps Sweden</span>
            </h3>
              <time className={styles.experienceDate}>October 2024 - Present</time>
              {isOpen.coursfy && (
                <ul className={styles.experienceList}>
                  <li>Developed responsive front-end pages with <strong>Next.js</strong> and <strong>React</strong>.</li>
                  <li>Integrated a payment API for seamless transactions.</li>
                  <li>Populated and consumed APIs for client-server communication.</li>
                  <li>Collaborated on performance and scalability optimizations.</li>
                </ul>
              )}
            </div>
          </li>

          <li className={styles.timelineItem} onClick={() => toggleDetail("freelance")}>
            <div className={styles.timelineLeft}>
              <div className={styles.timelineIcon}>
                {renderIcon()}
              </div>
            </div>
            <div className={styles.timelineRight}>
              <h3 className={styles.titleExperience}>
                <span className={styles.jobTitle}>Front End Developer</span>
                <span className={styles.companyName}>Freelance</span>
              </h3>
              <time className={styles.experienceDate}>March 2024 - October 2024</time>
              {isOpen.freelance && (
                <ul className={styles.experienceList}>
                  <li>Built responsive web applications using <strong>React</strong> and <strong>Next.js</strong>.</li>
                  <li>Optimized performance, improving loading times by 30%.</li>
                  <li>Integrated <strong>Redux</strong> for state management in e-commerce platforms.</li>
                  <li>Applied <strong>TypeScript</strong> for improved code quality and reduced runtime errors.</li>
                </ul>
              )}
            </div>
          </li>

          <li className={styles.timelineItem} onClick={() => toggleDetail("digitalInnovators")}>
            <div className={styles.timelineLeft}>
              <div className={styles.timelineIcon}>
                {renderIcon()}
              </div>
            </div>
            <div className={styles.timelineRight}>
            <h3 className={styles.titleExperience}>
              <span className={styles.jobTitle}>Front End Developer</span>
              <span className={styles.companyName}>Digital Innovators</span>
            </h3>
              <time className={styles.experienceDate}>May 2023 - February 2024</time>
              {isOpen.digitalInnovators && (
                <ul className={styles.experienceList}>
                  <li>Built and maintained SPAs using <strong>React</strong> and <strong>Redux</strong>.</li>
                  <li>Increased user retention by 15% and improved conversion rates by 20%.</li>
                  <li>Contributed to an internal component library, reducing development time by 30%.</li>
                  <li>Developed custom <strong>React</strong> hooks to enhance code modularity.</li>
                </ul>
              )}
            </div>
          </li>
        </ol>
        </div>
      </section>

  );
};

export default Experience;
