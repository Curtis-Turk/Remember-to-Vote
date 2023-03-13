import "./App.css";
import Footer from "./components/Footer";
import { Form } from "./components/Form";
import Title from "./components/Title";
import { useState } from "react";

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  return (
    <div className="App">
      <Title />
      {isFormSubmitted ? (
        <div>
          <p>Submitted</p>
          <p>
            You will receive a message on the day of the election with your
            polling station information
          </p>
          <button onClick={() => setIsFormSubmitted(false)}>
            Back to main page
          </button>
        </div>
      ) : (
        <Form setIsFormSubmitted={setIsFormSubmitted} />
      )}
      <Footer />
    </div>
  );
}
export default App;
