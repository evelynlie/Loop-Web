import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "./SignIn";
import { Route, BrowserRouter as Router, Routes  } from "react-router-dom";

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
