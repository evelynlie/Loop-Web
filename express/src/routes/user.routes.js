module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one); // :id is a parameter we passing
  // multiple parameters "/select/:id/post/:post"

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Add routes to server.
  app.use("/api/users", router);
};
