const db = require("../database");
const Movie = db.movie;
const Session = db.session;

// Select one movie from the database based on id.
exports.findIDbyTitleAndTime = async (req, res) => {
  const session = await db.session.findOne({
    where: {
      movie_id: req.query.movie_id,
      sessionTime: req.query.sessionTime
    }
  });

  res.json(session);
};

// Select all sessions from the database.
exports.all = async (req, res) => {
  const sessions = await db.session.findAll();

  res.json(sessions);
};

// Select session time based on movieId.
exports.findSessionTime = async (req, res) => {
  const session = await db.session.findAll({ where: { movie_id: req.params.id } });

  res.json(session);
};

// Create a session in the database.
exports.create = async (req, res) => {
  const session = await Session.create({
    session_id: req.body.session_id,
    sessionTime: req.body.sessionTime,
    movie_id: req.body.movie_id
  });

  res.json(session);
};

// Update session ticket available in the database.
exports.updateTicketAvailable = async (req, res) => {
  const movie = await Movie.findOne({ where: { title: req.body.title } });
  
  Session.decrement('ticketAvailable', { by: req.body.number_tickets, where: { movie_id: movie.movie_id, sessionTime: req.body.session_time }})
  .then(num => {
      if (num == 1) {
        res.send({
          message: "Session ticketAvailable was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Session ticketAvailable with movie_id=${movie.movie_id}. Maybe Movie was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Session ticketAvailable with movie_id=" + movie.movie_id
      });
    });
};

// Update session time in the database.
exports.updateSessionTime = async (req, res) => {
  const id = req.params.id;
  const { sessionTime } = req.body; // Access data from req.body

  Session.update(
    { sessionTime: sessionTime }, 
    { where: { session_id: id } }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Session time was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Session time with session_id=${id}. Maybe Session was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Session time with session_id=" + id
      });
    });
};