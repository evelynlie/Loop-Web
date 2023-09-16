module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with username.
  router.get("/select/:username", controller.findUsername); // :username is a parameter we passing
  // multiple parameters "/select/:id/post/:post"

  router.get("/selectEmail/:email", controller.findEmail);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update a user based on username(id)
  router.put("/update/:id", controller.update);

  // Delete a user based on username(id)
  router.delete("/delete/:id", controller.delete);

  // Add routes to server.
  app.use("/api/users", router);
};
