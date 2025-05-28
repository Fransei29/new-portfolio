import styles from "./TestimonialsComponent.module.scss";
import { FaLinkedin } from "react-icons/fa";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  image?: string;
  linkedin?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Matias Rivarola",
    role: "Front End Developer",
    message:
      "Working with Franco was a fantastic experience. \nHe consistently delivered high-quality code and was always willing to lend a hand to teammates when needed. \nHis reliability and dedication made a real impact on the success of our latest project. We are still working together.",
    image: "/img/Mati.webp",
    linkedin: "https://www.linkedin.com/in/matirivarola1/",
  },
  {
    name: "Edison Lamar",
    role: "DevOps Engineer",
    message:
      "Franco has a great eye for detail and a strong understanding of how design and development go hand in hand. \nDuring our collaboration, he was always open to feedback and communicated clearly and respectfully. \nHis front-end skills truly brought our UI designs to life.",
    image: "/img/Edi.webp",
    linkedin: "https://www.linkedin.com/in/edisonlamar/",
  },
  {
    name: "Adrian Rodriguez",
    role: "Web Developer Student",
    message:
      "Franco is the kind of developer every team wants — proactive, thoughtful, and dependable. \nHe not only met deadlines but also contributed valuable suggestions that improved our workflow quality. \nHis passion for learning and improving was evident in every sprint.",
    image: "/img/Adrian.webp",
    linkedin: "https://www.linkedin.com/in/adrian-rodriguez-053020304/",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <p className={styles.highlight}>Testimonials</p>
      <p className={styles.testimonialsSubtitle}>
      What people say about working with me.
        </p>
      <div className={styles.grid}>
        {testimonials.map((t, index) => (
          <div key={index} className={styles.card}>
            {t.image && <img src={t.image} alt={t.name} className={styles.avatar} />}
            <p className={styles.message}>"{t.message}"</p>
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
  );
}
