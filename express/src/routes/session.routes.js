module.exports = (express, app) => {
    const controller = require("../controllers/session.controller.js");
    const router = express.Router();

    // Select all sessions.
    router.get("/", controller.all);

    // Select a sesssion from the database based on movie_id and sessionTime.
    router.get("/selectID", controller.findIDbyTitleAndTime);
  
    // Select a session from the database based on movie_id.
    router.get("/select/:id", controller.findSessionTime);
  
    // Create a new session.
    router.post("/", controller.create);

    // Select a session from the database based on movie_id.
    router.put("/updateTicketAvailable", controller.updateTicketAvailable);

    // Select a session from the database based on movie_id.
    router.put("/updateSessionTime/:id", controller.updateSessionTime);
  
    // Add routes to server.
    app.use("/api/sessions", router);
  };
  