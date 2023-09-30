module.exports = (express, app) => {
    const controller = require("../controllers/session.controller.js");
    const router = express.Router();
  
    // Select a session from the database based on movie_id.
    router.get("/select/:id", controller.findSessionTime);
  
    // Create a new session.
    router.post("/", controller.create);

    // Select a session from the database based on movie_id.
    router.put("/updateTicketAvailable", controller.updateTicketAvailable);
  
    // Add routes to server.
    app.use("/api/sessions", router);
  };
  