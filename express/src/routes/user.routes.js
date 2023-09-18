module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with username.
  router.get("/select/:username", controller.findUsername); // :username is a parameter we passing
  // multiple parameters "/select/:id/post/:post"

  // Select one user from the database based on email.
  router.get("/selectByEmail", controller.findByEmail);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update a user based on username(id)
  router.put("/update/:id", controller.update);

  // Delete a user based on username(id)
  router.delete("/delete/:username", controller.delete);

  // Add routes to server.
  app.use("/api/users", router);
};
