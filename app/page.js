"use client";

import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react'; // Importar el hook de signIn
import { useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    const syncDatabase = async () => {
      await fetch('/api/sync');
    };

    syncDatabase(); // Sincroniza la base de datos cuando la página se carga
  }, []);


  return (
    <>
     <div className="home-text">
        <h1 className="title">Hi, I&apos;m Franco!</h1>
        <div className="title-section">
            <Image className="title-icon" src="/favicon.ico" alt="Icon" width={50} height={50} />
            <p className="subtitle">Improve your skills with tutorials</p>
         </div>
        <div className="socialmedia">
          <a href="https://github.com/Fransei29" target="_blank" rel="noopener noreferrer">
          <i className="soicon fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/franco-seiler/" target="_blank" rel="noopener noreferrer">
          <i className="soicon fab fa-linkedin"></i>
          </a>
          <a href="mailto:seilerfranco317@gmail.com" target="_blank" rel="noopener noreferrer">
          <i className="soicon fas fa-envelope"></i>
          </a>
        </div>
      </div>
      <div className="about">
        <div className="auth-container">
          {session ? (
                <div className="user-info">
                  <p className='welcome'>Welcome {session.user.name}</p>
                  <Image  src={session.user.image} alt={session.user.name} width={50} height={50}className="user-avatar"/>
                  <button onClick={() => signOut()} className="sign-out-button">Sign out</button>
                </div>
              ) : (
                <div className="auth-button">
                  <button onClick={() => signIn()} className="sign-in-button">Sign in</button>
                </div>
              )}
       </div>
       <div className="keywords">
          <p className="highlight">Design</p>
          <p className="highlight">Development</p>
          <p className="highlight">Collaboration</p>
        </div>
      </div>
    </>
  );
}

