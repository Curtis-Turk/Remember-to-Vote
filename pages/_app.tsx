import "../styles.css";
import Footer from "../src/components/Footer";
import { Form } from "../src/components/Form";
import Title from "../src/components/Title";
import { useState } from "react";

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  return (
    <div className="App">
      <Title />
      {isFormSubmitted ? (
        <div id="polling-form">
          <h2>Submitted</h2>
          {/* <p>
            You will receive a message on the day of the election with your
            polling station information
          </p> */}
          <p>
            You should now receive a test text with an example polling station
            of:
            <h4>Earlswood Social Club, 160-164 Greenway Road, Rumney.</h4>
          </p>
          <p>
            For the live version you would be messaged you on the day of the
            election with the current polling station for your address.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              id="submit-form-btn"
              className="submitEnabled"
              onClick={() => setIsFormSubmitted(false)}
            >
              Back to main page
            </button>
          </div>
        </div>
      ) : (
        <Form setIsFormSubmitted={setIsFormSubmitted} />
      )}
      <Footer />
    </div>
  );
}
export default App;
