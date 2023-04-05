import '../styles.css';
import { useState } from 'react';
import Footer from '../src/components/Footer';
import { Form } from '../src/components/Form';
import Title from '../src/components/Title';
import About from '../src/components/About';
import SubmittedForm from '../src/components/SubmittedForm';

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [aboutToggle, setAboutToggle] = useState(false);

  const toggleAboutSection = () => {
    aboutToggle ? setAboutToggle(false) : setAboutToggle(true);
  };

  return (
    <div id="App">
      <Title />
      <button id="about-btn" onClick={toggleAboutSection}>
        About
      </button>
      {aboutToggle ? <About /> : null}
      {isFormSubmitted ? (
        <SubmittedForm setIsFormSubmitted={setIsFormSubmitted} />
      ) : (
        <Form setIsFormSubmitted={setIsFormSubmitted} />
      )}
      <Footer />
    </div>
  );
}
export default App;
