import "./App.css";
import Form from "./components/form";
import Form2 from "./components/form_2";

function App() {
  return (
    <div className="App">
      <h1>Polling station Reminder</h1>
      <h2>
        Enter your details to recieve a message with your polling station
        details
      </h2>
      <Form></Form>
      <Form2></Form2>
    </div>
  );
}

export default App;
