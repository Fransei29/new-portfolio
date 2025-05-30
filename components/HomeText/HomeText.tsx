import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import styles from './HomeText.module.scss'; 
import { useScrollAnimation } from '../../hooks/Scroll';

const HomeText: React.FC = () => {
  const elementsRef = useScrollAnimation();

  return (
  <section className={styles.homeTextContainer}>
    <section ref={(el) => {elementsRef.current[0] = el;}} className="fade-in-right">
        <p className={styles.greeting}>Hi, I&apos;m <span className={styles.nameHighlight}>Franco</span></p>
        <h1 className={styles.mainTitle}>Full Stack Developer.</h1>
    </section>
    <section ref={(el) => {elementsRef.current[1] = el;}} className="fade-in-left">
       <h2 className={styles.subTitle}>I build impactful digital experiences.</h2>
    </section>
    <section ref={(el) => {elementsRef.current[2] = el;}} className="fade-in-right">
        <p className={styles.description}>
        2+ years engineering scalable apps with a frontend focus, using clean code, modern tools, and a strong focus on UX and performance.
        </p>
        <div className={styles.techIcons}>
          <FaReact size={28} className={styles.icon} />
          <TbBrandNextjs size={28} className={styles.icon} />
          <FaNodeJs size={28} className={styles.icon} />
          <SiTypescript size={28} className={styles.icon} />
        </div>
    </section>
  </section>

  );
};

export default HomeText;
