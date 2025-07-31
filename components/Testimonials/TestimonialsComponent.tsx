'use client';

import styles from "./TestimonialsComponent.module.scss";
import { FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';


type Testimonial = {
  name: string;
  role: string;
  message: string;
  image?: string;
  linkedin?: string;
};

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      name: t('testimonials.matias.name'),
      role: t('testimonials.matias.role'),
      message: t('testimonials.matias.message'),
      image: "/img/Mati.webp",
      linkedin: "https://www.linkedin.com/in/matirivarola1/",
    },
    {
      name: t('testimonials.edison.name'),
      role: t('testimonials.edison.role'),
      message: t('testimonials.edison.message'),
      image: "/img/Edi.webp",
      linkedin: "https://www.linkedin.com/in/edisonlamar/",
    },
    {
      name: t('testimonials.adrian.name'),
      role: t('testimonials.adrian.role'),
      message: t('testimonials.adrian.message'),
      image: "/img/Adrian.webp",
      linkedin: "https://www.linkedin.com/in/adrian-rodriguez-053020304/",
    },
  ];

  return (
    <div className={styles.testimonialsContainer}>
    <section className={styles.testimonials}>
      <p className={styles.highlight}>{t('testimonials.title')}</p>
      <div className={styles.grid}>
        {testimonials.map((t, index) => (
          <div key={index} className={styles.card}>
            {t.image && (
              <Image
                src={t.image}
                alt={t.name}
                width={100}  
                height={100} 
                className={styles.avatar}
              />
            )}

           <p className={styles.message}>&quot;{t.message}&quot;</p>
            <div className={styles.author}>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
            <div className={styles.secondSection}>
                {t.linkedin && (
                    <a
                    href={t.linkedin}
                    className={styles.linkedinButton}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${t.name}'s LinkedIn profile`}
                    title={`View ${t.name} on LinkedIn`}
                    >
                    <FaLinkedin size={22} />
                    </a>
                )}
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
