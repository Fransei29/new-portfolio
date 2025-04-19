import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import '../app/globals.css'; // Asegúrate de que la ruta sea correcta

const SocialMedia = () => {
  return (
    <div className="socialmedia">
      {/* GitHub Link */}
      <a
        href="https://github.com/Fransei29"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Github className="soicon" />
      </a>

      {/* LinkedIn Link */}
      <a
        href="https://www.linkedin.com/in/franco-seiler/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin className="soicon" />
      </a>

      {/* Email Link */}
      <a
        href="mailto:seilerfranco317@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Email"
      >
        <Mail className="soicon" />
      </a>

      {/* CV Link */}
      <Link href="/FrancoCV.pdf" passHref legacyBehavior>
        <a href="/FrancoCV.pdf" target="_blank" rel="noopener noreferrer" className="logo-link" aria-label="CV">
          <Image
            src="/dev6.png"
            alt="CV Logo"
            width={40}
            height={40}
            className="cv-icon"
          />
        </a>
      </Link>
    </div>
  );
};

export default SocialMedia;
