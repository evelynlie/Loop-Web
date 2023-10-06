import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import { Route, BrowserRouter as Router, Routes  } from "react-router-dom";
import { deleteUser } from "../data/repository";

// Global data for tests.
let container;

// Runs before each test, here the SignUp component is rendered and the container is stored.
beforeEach(() => {
  // Dummy loginUser function in order to run SignUp component for handleSubmit function
  // This is to replace the actual loginUser that set username, email, signupDate to localstorage
  const loginUser = async (email) => {
  }

  const utils = render(
    <Router>
        <Routes>
            <Route path="/" element={<SignUp loginUser={loginUser}/>} />
        </Routes>
    </Router>);
  container = utils.container;
});

// Test rendering SignUp component
test("Render Sign Up", () => {
  expect(container).toBeInTheDocument();
});

// Test error message (Please fill in all the required fields.) to appear when all inputs are blank
test("Failed Sign Up Scenario - Blank Username, Email & Password Input", () => {
  const button = screen.getByDisplayValue("SIGN UP");

  // Simulate click.
  fireEvent.click(button);

  expect(screen.getByText("Please fill in all the required fields.", { exact: true })).toBeInTheDocument();
});

// Test error message (Please enter a valid email address. & Password must be at least 8 characters long.) to appear when email address and password input is in invalid format
test("Failed Sign Up Scenario - email and password is invalid", async () => {
  const usernameInput = screen.getByLabelText("Username");
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText('Password');
  const button = screen.getByDisplayValue("SIGN UP");

  // Simulate input.
  fireEvent.change(usernameInput, { target: { value: "new_user" } });
  fireEvent.change(emailInput, { target: { value: "invalidemail.com" } });
  fireEvent.change(passwordInput, { target: { value: "abc123" } });

  // Simulate click.
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText("Please enter a valid email address.", { exact: true })).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 8 characters long.", { exact: true })).toBeInTheDocument();
  });

});

// Test error message (Password must contain at least one special character.) to appear when password input does not contain a special character
test("Failed Sign Up Scenario - password does not contain special character", async () => {
  const usernameInput = screen.getByLabelText("Username");
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText('Password');
  const button = screen.getByDisplayValue("SIGN UP");

  // Simulate input.
  fireEvent.change(usernameInput, { target: { value: "new_user" } });
  fireEvent.change(emailInput, { target: { value: "new_user@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "abc123456" } });

  // Simulate click.
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText("Password must contain at least one special character.", { exact: true })).toBeInTheDocument();
  });

});

// Test error message (Username is already registered. & Email address is already registered.) to appear when username and email already exist in database
test("Failed Sign Up Scenario - username and email already registered", async () => {
  const usernameInput = screen.getByLabelText("Username");
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText('Password');
  const button = screen.getByDisplayValue("SIGN UP");

  // Simulate input.
  fireEvent.change(usernameInput, { target: { value: "mbolger" } });
  fireEvent.change(emailInput, { target: { value: "mbolger@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "abc12345!" } });

  // Simulate click.
  fireEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByText("Username is already registered.", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Email address is already registered.", { exact: false })).toBeInTheDocument();
  });

});

// Test Sign Up successful scenario where both username, email and password does not match with any existing records in database
test("Success Sign Up Scenario - Valid username, email and password",async () => {
  const usernameInput = screen.getByLabelText("Username");
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText('Password');
  const button = screen.getByDisplayValue("SIGN UP");
  const signUpSuccessAlert = jest.spyOn(window,'alert').mockImplementation();

  // Simulate input.
  fireEvent.change(usernameInput, { target: { value: "john" } });
  fireEvent.change(emailInput, { target: { value: "john@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "abc12345!" } });

  // Simulate click.
  fireEvent.click(button);

  // Expect sign up success alert to appear on window
  await waitFor(() => {
    expect(signUpSuccessAlert).toHaveBeenCalledTimes(1)
  });

});

// Remove the newly sign up user from database
afterAll(async () => {
  await deleteUser("john");
});
