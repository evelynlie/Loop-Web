import { render, screen, page, fireEvent, waitFor } from "@testing-library/react";
import MyProfile from "./MyProfile";
import { Route, BrowserRouter as Router, Routes  } from "react-router-dom";
import { updateUser } from "../data/repository";

// Global data for tests.
let container;

// Runs before each test, here the SignUp component is rendered and the container is stored.
beforeEach(() => {
  // Dummy loginUser function in order to run SignUp component for handleSubmit function
  // This is to replace the actual loginUser that set username, email, signupDate to localstorage
  const logoutUser = async () => {
  }

  const username = "mbolger";
  const email = "mbolger@test.com";
  const signupDate = "Mon, 16 September 2023";

  const utils = render(
    <Router>
        <Routes>
            <Route path="/" element={<MyProfile logoutUser={logoutUser} username={username} email={email} signupDate={signupDate}/>} />
        </Routes>
    </Router>);
  container = utils.container;
});

// Test rendering MyProfile component
test("Render MyProfile", () => {
  expect(container).toBeInTheDocument();
});

// Test error message (Please fill in all the required fields.) to appear when username and email input are blank
test("Failed Edit Scenario - Username & Email input are blank", async () => {
  const edit_button = screen.getByRole('button', {name: /edit/i})

  // Simulate click.
  fireEvent.click(edit_button);

  const usernameInput = screen.getByLabelText("Username");
  const emailInput = screen.getByLabelText("Email");
  const update_button = screen.getByDisplayValue("UPDATE");

  // Simulate input.
  fireEvent.change(usernameInput, { target: { value: "" } });
  fireEvent.change(emailInput, { target: { value: "" } });

  // Simulate click.
  fireEvent.click(update_button);

  await waitFor(() => {
        expect(screen.getByText("Please fill in all the required fields.", { exact: true })).toBeInTheDocument();
  });
});

// Test error message (Username is already registered.) to appear when username input already exist in database
test("Failed Edit Scenario - Username already registered", async () => {
  const edit_button = screen.getByRole('button', {name: /edit/i})

  // Simulate click.
  fireEvent.click(edit_button);

  const usernameInput = screen.getByLabelText("Username");
  const update_button = screen.getByDisplayValue("UPDATE");

  // Simulate input.
  fireEvent.change(usernameInput, { target: { value: "kent" } });

  // Simulate click.
  fireEvent.click(update_button);

  await waitFor(() => {
        expect(screen.getByText("Username is already registered.", { exact: true })).toBeInTheDocument();
  });
});

// Test error message (Email address is already registered.) to appear when email input already exist in database
test("Failed Edit Scenario - Username already registered", async () => {
  const edit_button = screen.getByRole('button', {name: /edit/i})

  // Simulate click.
  fireEvent.click(edit_button);

  const emailInput = screen.getByLabelText("Email");
  const update_button = screen.getByDisplayValue("UPDATE");

  // Simulate input.
  fireEvent.change(emailInput, { target: { value: "kent@test.com" } });

  // Simulate click.
  fireEvent.click(update_button);

  await waitFor(() => {
        expect(screen.getByText("Email address is already registered.", { exact: true })).toBeInTheDocument();
  });
});

// Test error message (Please enter a valid email address.) to appear when email address input is in invalid format
test("Failed Edit Scenario - email address is invalid", async () => {
  const edit_button = screen.getByRole('button', {name: /edit/i})

  // Simulate click.
  fireEvent.click(edit_button);

  const emailInput = screen.getByLabelText("Email");
  const update_button = screen.getByDisplayValue("UPDATE");

  // Simulate input.
  fireEvent.change(emailInput, { target: { value: "invalidemail.com" } });

  // Simulate click.
  fireEvent.click(update_button);

  await waitFor(() => {
    expect(screen.getByText("Please enter a valid email address.", { exact: true })).toBeInTheDocument();
  });

});

// Test Edit Profile successful scenario where both username and email input does not match with any existing records in database
test("Success Edit Profile Scenario - Valid username and email",async () => {
  const edit_button = screen.getByRole('button', {name: /edit/i})
  const editSuccessAlert = jest.spyOn(window,'alert').mockImplementation();

  // Simulate click.
  fireEvent.click(edit_button);

  const usernameInput = screen.getByLabelText("Username");
  const emailInput = screen.getByLabelText("Email");
  const update_button = screen.getByDisplayValue("UPDATE");

  // Simulate input.
  fireEvent.change(usernameInput, { target: { value: "john" } });
  fireEvent.change(emailInput, { target: { value: "john@email.com" } });

  // Simulate click.
  fireEvent.click(update_button);

  // Expect edit profile success alert to appear on window
  await waitFor(() => {
    expect(editSuccessAlert).toHaveBeenCalledTimes(1)
  });

});

// Reset the newly edit user profile back to original
afterAll(async () => {
  await updateUser("john", "mbolger", "mbolger@test.com");
});
