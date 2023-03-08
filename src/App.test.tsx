import { render, screen } from "@testing-library/react";
import App from "./App";

test("full name has correct label", () => {
  render(<App />);
  const message: string = "Full Name * :";
  expect(screen.getByLabelText(message)).toBeInTheDocument();
});
test("phone number has correct label", () => {
  render(<App />);
  const message: string = "Phone Number * :";
  expect(screen.getByLabelText(message)).toBeInTheDocument();
});
// test("phone number has correct label", () => {
//   render(<App />);
//   const message: string = "Phone Number * :";
//   expect(screen.getByText(message)).toBeInTheDocument();
// });

// test("fullname form input wrong", () => {
//   render(<App />);
//   const message: string = "Fulls Names * :";
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
//   expect(screen.getByText(message)).toBeInTheDocument();
// });
