import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "./SignIn";
import { Route, BrowserRouter as Router, Routes  } from "react-router-dom";
// import { loginUser } from "../data/repository";
// //jest.spyOn(window, 'alert').mockImplementation(() => {});
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => jest.fn(), // Mock useNavigate
// }));

let container;

beforeEach(() => {
  const utils = render(
    <Router>
        <Routes>
            <Route path="/" element={<SignIn />} />
        </Routes>
    </Router>);
  container = utils.container;
});

test("Render Sign In", () => {
  expect(container).toBeInTheDocument();
});

// TEST NOT WORKING YET
// test("Failed Sign In Scenario - Incorrect Email", () => {
//   render(
//     <Routes>
//       <SignIn loginUser={loginUser} />
//     </Routes>
//   );

//   const emailInput = screen.getByLabelText('Email');
//   const passwordInput = screen.getByLabelText('Password');
//   const button = screen.getByDisplayValue('SIGN IN');

//   fireEvent.change(emailInput, { target: { value: "invalidemail@test.com" } });
//   fireEvent.change(passwordInput, { target: { value: "abc123" } });
//   fireEvent.click(button);

//   // Assert that an error message is displayed for incorrect email
//   const emailErrorMessage = screen.getByText('Please enter a valid email address.');
//   expect(emailErrorMessage).toBeInTheDocument();
// });