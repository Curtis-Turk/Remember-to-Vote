import { render, screen } from "@testing-library/react";
import App from "../pages/App";

test("full name has correct label", () => {
  const message: string = "Name:";
  // screen.logTestingPlaygroundURL(screen.getByLabelText(message));
  expect(screen.getByText(message)).toBeInTheDocument();
});

test("full name: incorrect label doesn't exist", () => {
  render(<App />);
  const message: string = "FullNames";
  expect(screen.queryByLabelText(message)).toBeNull();
});

test("phone number has correct label", () => {
  render(<App />);
  const message: string = "Phone Number:";
  expect(screen.getByLabelText(message)).toBeInTheDocument();
});

// test("one week before checkbox appears", () => {
//   render(<App />);
//   // const message: string = "One week before";
//   const checkbox = screen.getByTestId("one-week");
//   expect(checkbox.checked).toEqual("false");
// });

test("renders checkbox", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "One week before" });
  expect(checkbox).toBeInTheDocument();
  // toEqual(
  //   expect.arrayContaining([
  //     <input id="one-week" name="reminders[]" type="checkbox" value="7 days" />,
  //   ])};
});
