import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "./SignIn";
import { Route, BrowserRouter as Router, Routes  } from "react-router-dom";

// Global data for tests.
let container;

// Runs before each test, here the SignIn component is rendered and the container is stored.
beforeEach(() => {
  // Dummy loginUser function in order to run SignIn component for handleSubmit function
  // This is to replace the actual loginUser that set username, email, signupDate to localstorage
  const loginUser = async (email) => {
  }

  const utils = render(
    <Router>
        <Routes>
            <Route path="/" element={<SignIn loginUser={loginUser}/>} />
        </Routes>
    </Router>);
  container = utils.container;
});

// Test rendering sign in component
test("Render Sign In", () => {
  expect(container).toBeInTheDocument();
});

// Test error message (Please fill in all the required fields.) to appear when all inputs are blank
test("Failed Sign In Scenario - Blank Email & Password Input", () => {
  const button = screen.getByDisplayValue("SIGN IN");

  // Simulate click.
  fireEvent.click(button);

  expect(screen.getByText("Please fill in all the required fields.", { exact: true })).toBeInTheDocument();
});

// Test error message (Please fill in all the required fields.) to appear when only password input is blank
test("Failed Sign In Scenario - Blank Password Input", () => {
  const emailInput = screen.getByLabelText("Email");
  const button = screen.getByDisplayValue("SIGN IN");

  // Simulate input.
  fireEvent.change(emailInput, { target: { value: "mbolger@test.com" } });

  // Simulate click.
  fireEvent.click(button);

  expect(screen.getByText("Please fill in all the required fields.", { exact: true })).toBeInTheDocument();
});

// Test error message (Please enter a valid email address.) to appear when email address input is in invalid format
test("Failed Sign In Scenario - Invalid email address", () => {
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText('Password');
  const button = screen.getByDisplayValue("SIGN IN");

  // Simulate input.
  fireEvent.change(emailInput, { target: { value: "invalidemailemail.com" } });
  fireEvent.change(passwordInput, { target: { value: "abc123" } });

  // Simulate click.
  fireEvent.click(button);

  expect(screen.getByText("Please enter a valid email address.", { exact: true })).toBeInTheDocument();

});

// Test error message (Email and / or password invalid, please try again.) to appear when email and password
// doesn't match with any existing user data stored in database
test("Failed Sign In Scenario - Invalid email and / or password",async () => {
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText('Password');
  const button = screen.getByDisplayValue("SIGN IN");

  // Simulate input.
  fireEvent.change(emailInput, { target: { value: "invalidemail@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "abc123" } });

  // Simulate click.
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText("Email and / or password invalid, please try again.", { exact: true })).toBeInTheDocument();
  });

});

// Test Sign In successful scenario where both email and password match with existing records in database
test("Success Sign In Scenario - Valid email and password",async () => {
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText('Password');
  const button = screen.getByDisplayValue("SIGN IN");
  const signInSuccessAlert = jest.spyOn(window,'alert').mockImplementation();

  // Simulate input.
  fireEvent.change(emailInput, { target: { value: "mbolger@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "abc123" } });

  // Simulate click.
  fireEvent.click(button);

  // Expect sign in success alert to appear on window
  await waitFor(() => {
    expect(signInSuccessAlert).toHaveBeenCalledTimes(1)
  });

});