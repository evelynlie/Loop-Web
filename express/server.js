const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

// Create new express app
const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
// when theres a GET request, send json object
app.get("/", (req, res) => { // (request, response)
  res.json({ message: "Hello World!" });
});

// the following is same as line 30 using post.routes.js
  // const postController = require("./src/controllers/post.controller.js");
  // app.get("/api/posts", postController.all);
  // pp.get("/api/posts", postController.create);

// Add user routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);

// Set port, listen for requests for backend.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
