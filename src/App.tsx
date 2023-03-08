import "./App.css";
import Form from "./components/form";

function App() {
  return (
    <div className="App">
      <h1>Polling station Reminder</h1>
      <h2>
        Enter your details to recieve a message with your polling station
        details
      </h2>
      <Form></Form>
    </div>
  );
}

export default App;
