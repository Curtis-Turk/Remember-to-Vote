import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import Title from '../src/components/Title';
import About from '../src/components/About';
import Footer from '../src/components/Footer';
import { Form } from '../src/components/Form';
import SubmittedForm from '../src/components/SubmittedForm';

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const bootstrap = require('bootstrap');
  }, []);

  return (
    <div id="App">
      <Title />
      <About />
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
