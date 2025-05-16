import React, { useEffect, useState } from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import ThemeToggleButton from '../themeToggleButton/ThemeToggleButton';
import styles from './HomeText.module.scss'; 

interface HomeTextProps {
  texts: string[];
}

const HomeText: React.FC<HomeTextProps> = () => {

  return (
    <section className={styles.homeTextContainer}>
      <h3 className={styles.title}>
        Hi, I&apos;m<span className={styles.nameHighlight}> Franco</span>
      </h3>
      <div className={styles.subtitle}>
        <div className={styles.subtitleText}>
          <div className={styles.subtitleTextA}>
            <p className={styles.introductionText}>
            Frontend developer specialized in crafting digital experiences with the latest technologies 
            </p>
          </div>
          <p className={styles.techIcons}> 
            <FaReact size={32} className={styles.icon} />
            <TbBrandNextjs size={32} className={styles.icon} />
            <FaNodeJs size={32} className={styles.icon} />
            <SiTypescript size={32} className={styles.icon} />
          </p>
          <ThemeToggleButton />
        </div>
        
      </div>
    </section>
  );
};

export default HomeText;
