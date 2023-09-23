const db = require("../database");
const Movie = db.movie;
const Session = db.session;
Session.belongsTo(Movie, { foreignKey: 'movie_id'}); // Connect the movie_id of the movie table to the movie_id of the session table

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

// Select one user from the database based on title.
// exports.findByMovieTitle = async (req, res) => {
//   const movies = await db.movie.findOne({ where: { title: req.query.title } });

//   res.json(movies);
// };

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

// Update movie detail in the database.
// exports.update = async (req, res) => {
//   const id = req.params.id;

//   // Update movie title and imageURL.
//   Movie.update({title: req.body.title, imageURL: req.body.imageURL}, {
//     where: { movie_id: id }
//   })
//   .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Movie was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Movie with movie_id=${id}. Maybe Movie was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Movie with movie_id=" + id
//       });
//     });
// };