import { useState } from 'react';

export default function About() {
  const [aboutToggle, setAboutToggle] = useState(false);

  const toggleAboutSection = () => {
    aboutToggle ? setAboutToggle(false) : setAboutToggle(true);
  };

  const aboutSection = () => {
    return (
      <div id="about-section">
        <p>Already lost the piece of paper with your polling station details? Us too.</p>
        <p>
          <strong>What is this?</strong>
          <br></br>A service to help people vote in these May elections. It has been made by
          volunteer group <a href="https://www.campaignlab.uk/">Campaign lab</a>, who use technology
          to improve campaigns.
        </p>
        <p>
          <strong>How does it work?</strong>
          <br></br>
          Enter your details On the morning of the election, we send you a message with the address
          of your polling station
        </p>
        <p>
          <strong>Why?</strong>
          <br></br>
          There is a new law in place requiring everyone to bring ID in order to vote. As well as
          sending you the address of your polling station, we want to remind everyone about this new
          ID requirement.
        </p>
        <p>
          <strong>Does this cost me money?</strong>
          <br></br>
          No. However, if you were signed up in error, you would be able to remove yourself from the
          service by texting STOP, and this text would be under your normal price plan.
        </p>
        <p>
          <strong>What happens to my data?</strong>
          <br></br>
          We delete it after the election. If you opt in sharing your email, we will not delete it,
          but you will have the right to deletion in any further communications.
        </p>
      </div>
    );
  };

  return (
    <div id="about">
      <button id="about-btn" onClick={toggleAboutSection}>
        {aboutToggle ? 'back to form' : 'About'}
      </button>
      {aboutToggle ? aboutSection() : null}
    </div>
  );
}
