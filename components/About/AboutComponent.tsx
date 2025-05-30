import React from 'react';
import styles from './AboutComponent.module.scss';
import Image from 'next/image';
import { useScrollAnimation } from '../../hooks/Scroll';

const About = () => {
  const elementsRef = useScrollAnimation();

  return (
    <section className={styles.aboutContainer}>
      <div className={styles.aboutSection}>
        
       <section ref={el => { elementsRef.current[0] = el; }} className="fade-in-right">
          <div className={styles.firstPart}>
              <p className={styles.highlight}>
              Who I Am
              </p>
          </div>   
        </section>
       
        <section ref={el => { elementsRef.current[1] = el; }} className="fade-in-right">
          <div className={styles.secondPart}>
              <div className={styles.aboutSubtitle}>
                <p>
                I was born in Argentina 27 years ago, and my journey into tech truly began in Amsterdam, where I started studying programming three years ago. 
                </p>
                <p>
                It was the start of a whole new chapter.
                </p>
                <p>
                Since then, I have dedicated myself to building clean, thoughtful web experiences—always balancing logic with design. 
                </p>
                <p>
                I care about how things work, but also about how they feel.
                </p>
                <p>
                Outside of coding, I am passionate about design, sports, and learning from everything around me.
                </p>
              </div>
            <div className={styles.imageSection}>
              
                <div className={styles.imageWrapper}>
                    <Image
                        src='/img/franco.jpg'
                        alt="Franco Seiler"
                        width={200}
                        height={200}
                        className={styles.image}
                    />
                </div>
            </div>       
        </div>
        </section>
      </div>
    </section>
  );
};

export default About;
