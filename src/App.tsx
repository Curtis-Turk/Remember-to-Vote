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
        <div>Form submitted</div>
      ) : (
        <Form setIsFormSubmitted={setIsFormSubmitted} />
      )}
      <Footer />
    </div>
  );
}
export default App;
