import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import styles from './HomeText.module.scss'; 

const HomeText: React.FC = () => {

  return (
<section className={styles.homeTextContainer}>
  <p className={styles.greeting}>Hi, I&apos;m <span className={styles.nameHighlight}>Franco</span></p>
  <h1 className={styles.mainTitle}>Frontend Developer.</h1>
  <h2 className={styles.subTitle}>I build impactful digital experiences.</h2>
  <p className={styles.description}>
    Frontend developer with 2+ years of experience focused on design, usability, and performance.  <br/>
    Passionate about crafting intuitive interfaces that solve real user problems.
  </p>
  <div className={styles.techIcons}>
    <FaReact size={28} className={styles.icon} />
    <TbBrandNextjs size={28} className={styles.icon} />
    <FaNodeJs size={28} className={styles.icon} />
    <SiTypescript size={28} className={styles.icon} />
  </div>
</section>

  );
};

export default HomeText;
