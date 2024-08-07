import Image from 'next/image';

export default function Home() {
  return (
    <>
     <div className="home-text">
        <h1 className="title">Hi, I&apos;m Franco!</h1>
        <Image className="title2" src="/favicon.ico" alt="GitHub" width={50} height={50} />
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
      <div className="keywords">
          <p className="highlight">Design</p>
          <p className="highlight">Development</p>
          <p className="highlight">Collaboration</p>
        </div>
      </div>
    </>
  );
}
