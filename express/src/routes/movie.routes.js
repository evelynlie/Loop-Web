module.exports = (express, app) => {
  const controller = require("../controllers/movie.controller.js");
  const router = express.Router();

  // Select all movies.
  router.get("/", controller.all);

  // Select a single movie with id.
  router.get("/select/:id", controller.findByMovieId); // :title is a parameter we passing

  // Select movie from the database based on movie title.
  router.get("/selectByMovieTitle", controller.findByMovieTitle);

  // Create a new mvoie.
  router.post("/", controller.create);

  // Update a movie based on movie_id(id)
  router.put("/update/:id", controller.update);

  router.put("/updateAverageRating/:id", controller.updateAverageRating);

  // Add routes to server.
  app.use("/api/movies", router);
};