module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/", controller.create);

  // Update a post.
  router.put("/update/:id", controller.update);

  // Delete a post.
  router.delete("/delete/:id", controller.delete);

  // Add routes to server.
  app.use("/api/posts", router);
};
