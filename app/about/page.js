'use client';

import Image from 'next/image';
import './about.css'; // Import the CSS file for the About page

export default function About() {
  return (
    <div className="about-container">
      <section className="hero-section">           {/* Hero Section */}
        <Image src="/img/profile.png" alt="Profile picture of Franco Seiler" width={140} height={140} className="profile-pic"/>
        <h1 className='name-title'>Franco Seiler</h1>  
      </section>
      <section className='sub-description'>
        <p>
          I am a passionate and dedicated <u><strong>Web Developer</strong></u> with solid knowledge in <u><strong>JavaScript</strong></u> and modern frameworks. 
          I specialize in building scalable web applications and have strong expertise in working with databases, as well as in developing robust APIs.
          Beyond coding, I excel in collaboration and <u>teamwork</u>, consistently contributing to successful projects and creating a positive, productive work environment.
          I am always eager to embrace <u>new technologies</u> and approaches to solve complex problems efficiently.
        </p>
      </section>   
      <section className="experience-section">    {/* Experience Section */}
        <h2>Experience</h2>
        <p>
            I have developed and launched several web applications focusing on enhancing user experience, ensuring scalability and integrating them with databases.
        </p>
        <p>
            I have also crafted dynamic and interactive frontend interfaces, optimizing for both performance and responsiveness to provide a seamless user experience. My ability to collaborate effectively with clients has allowed me to understand project requirements thoroughly and deliver tailored solutions within tight deadlines.
        </p>
        <p>
            Additionally, I worked on many personal full-stack applications projects, refining my skills in both frontend and backend development.
        </p>
      </section>
      <section className="skills-section">        {/* Skills Section */}
        <h2>Skills</h2>
        <div className="skills-grid">
            <div className="skill-card">HTML</div>
            <div className="skill-card">CSS</div>
            <div className="skill-card">JavaScript</div>
            <div className="skill-card">TypeScript</div>
            <div className="skill-card">React</div>
            <div className="skill-card">Next.js</div>
            <div className="skill-card">Node.js</div>
            <div className="skill-card">Express</div>
            <div className="skill-card">PostgreSQL</div>
            <div className="skill-card">MongoDB</div>
            <div className="skill-card">Redis</div>
            <div className="skill-card">Sequelize</div>
            <div className="skill-card">GraphQL</div>
            <div className="skill-card">Rest</div>
            <div className="skill-card">Axios</div>
            <div className="skill-card">Docker</div>
            <div className="skill-card">Airtable</div>
        </div>
      </section>    
      <section className="contact-section"> {/* Contact Section */}
        <h2>Contact Me</h2>
        <p>
            I am always excited to connect with fellow developers, potential clients, and creative thinkers. 
            Whether you have a project in mind, need some advice, or just want to chat about tech, feel free to reach out!
        </p>
        
        <div className="contact-options">
            <a href="mailto:seilerfranco317@gmail.com" className="contact-link">
            <i className="fas fa-envelope"></i> Send an email
            </a>
            <a href="https://www.linkedin.com/in/franco-seiler/" target="_blank" rel="noopener noreferrer" className="contact-link">
            <i className="fab fa-linkedin"></i> Connect on LinkedIn
            </a>
            <a href="https://github.com/Fransei29" target="_blank" rel="noopener noreferrer" className="contact-link">
            <i className="fab fa-github"></i> Follow on GitHub
            </a>
        </div>
    </section>
  </div>
 );
}

