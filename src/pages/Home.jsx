import React, { useEffect } from 'react';
import gsap from 'gsap';
import '../styles/Home.scss'

const Home = () => {

  useEffect(() => {
    gsap.fromTo(
      "header",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power4.out" }
    );

    gsap.fromTo(
      "header img",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.7, ease: "power4.out", delay: 1 }
    );

    gsap.fromTo(
      "nav a",
      { y: 30, opacity: 0},
      { y: 0, opacity: 1, duration: 2, ease: 'power3.out', delay: 1}
    );

    gsap.fromTo(
      "section h1",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "power4.out",
        delay: 2
      }
    );

    gsap.fromTo(
      "section h4",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.5,
        ease: "power4.out",
        delay: 3.2
      }
    );

    gsap.fromTo(
      "section button",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.5,
        ease: "power4.out",
        delay: 3.4
      }
    );

    gsap.fromTo(
      '.arrow-icon', 
      {
        x: 0,
      }, 
      {
        x: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'ease.inOut',
      }
    );
  }, []);

  return (
    <main className="home">
      <header>
        <img src="/MyLogo.png" alt="logo" />
        <nav>
          <div className='circle'></div>
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="#">About</a>
        </nav>
      </header>
      <section>
        <h1>Connecting</h1>
        <h1>People Across</h1>
        <h1>Faiths & Interests</h1>
        <h4>Connecting people of all faiths through events and community support</h4>
        <button className="cta-button" onClick={() => window.location.href = '/events'}>
          Explore Events
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='arrow-icon'>
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </section>
    </main>
  );
};

export default Home;
