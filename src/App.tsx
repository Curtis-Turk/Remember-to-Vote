import "./App.css";
import Form from "./components/form";

function App() {
  return (
    <div className="App">
      <h1>Polling Station Reminder</h1>
      <h2>
        Enter your details to receive a message with your polling station
        details
      </h2>
      <Form></Form>
    </div>
  );
}
export default App;
