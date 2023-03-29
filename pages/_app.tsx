import '../styles.css';
import Footer from '../src/components/Footer';
import { Form } from '../src/components/Form';
import Title from '../src/components/Title';
import { useState } from 'react';
import SubmittedForm from '../src/components/SubmittedForm';

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  return (
    <div className="App">
      <Title />
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
