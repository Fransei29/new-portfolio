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
        <h1 className={styles.mainTitle}>Front End Developer.</h1>
    </section>
    <section ref={(el) => {elementsRef.current[1] = el;}} className="fade-in-left">
       <h2 className={styles.subTitle}>I build impactful digital experiences.</h2>
    </section>
    <section ref={(el) => {elementsRef.current[2] = el;}} className="fade-in-right">
        <p className={styles.description}>
        Full Stack Developer with 3 years of experience and a strong frontend focus, engineering scalable web apps with modern technologies.
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
