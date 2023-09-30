module.exports = (express, app) => {
    const controller = require("../controllers/reservation.controller.js");
    const router = express.Router();
  
    // Select all posts.
    router.get("/", controller.all);

    // Select movie from the database based on movie title.
    router.get("/selectByMovieTitle", controller.findByMovieTitle);
  
    // Create a new post.
    router.post("/", controller.create);
    
    // Add routes to server.
    app.use("/api/reservations", router);
  };
  