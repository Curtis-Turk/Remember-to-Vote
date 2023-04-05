import { useState } from 'react';

export default function About() {
  const [aboutToggle, setAboutToggle] = useState(false);

  const toggleAboutSection = () => {
    aboutToggle ? setAboutToggle(false) : setAboutToggle(true);
  };

  const aboutSection = () => {
    return (
      <p>
        Enter your details to receive a reminder message on the day of the election with your
        polling station information
      </p>
    );
  };

  return (
    <div id="about">
      <button id="about-btn" onClick={toggleAboutSection}>
        About
      </button>
      {aboutToggle ? aboutSection() : null}
    </div>
  );
}
