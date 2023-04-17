import { useState } from 'react';

export default function About() {
  return (
    <div id="about-section">
      <h3 id="about-tagline">
        Already lost the piece of paper with your polling station details?
        <br />
        Us too.
        <br />
        <br />
      </h3>
      <br />
      <h4>What is this?</h4>A service to help people vote in these May elections. It has been made
      by volunteer group <a href="https://www.campaignlab.uk/">Campaign lab</a>, who use technology
      to improve campaigns.
      <br />
      <br />
      <h4>How does it work?</h4>
      Enter your details On the morning of the election, we send you a message with the address of
      your polling station
      <br />
      <br />
      <h4>Why?</h4>
      There is a new law in place requiring everyone to bring ID in order to vote. As well as
      sending you the address of your polling station, we want to remind everyone about this new ID
      requirement.
      <br />
      <br />
      <h4>Does this cost me money?</h4>
      No. However, if you have been signed up in error, you will be able to remove yourself from the
      service by texting STOP. This text would be under your normal price plan.
      <br />
      <br />
      <h4>What happens to my data?</h4>
      We delete it after the election. If you opt in sharing your email, we will not delete it, but
      you will have the right to deletion in any further communications.
      <br />
      <br />
    </div>
  );
}
