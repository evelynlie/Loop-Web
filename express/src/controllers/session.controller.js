const db = require("../database");
const Movie = db.movie;
const Session = db.session;

// Select all users from the database.
// exports.all = async (req, res) => {
//   const movies = await db.movie.findAll();

//   res.json(movies);
// };

// Select one movie from the database based on id.
// exports.findByMovieId = async (req, res) => {
//   const movies = await db.movie.findByPk(req.params.id);

//   res.json(movies);
// };

// Select all users from the database.
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
    sessionDate: req.body.sessionDate,
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