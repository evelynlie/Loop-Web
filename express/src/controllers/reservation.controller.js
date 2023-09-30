const db = require("../database");
const Reservation = db.reservation;

// Select all users from the database.
exports.all = async (req, res) => {
  const reservations = await db.reservation.findAll();

  res.json(reservations);
};

// Select one user from the database based on title.
exports.findByMovieTitle = async (req, res) => {
  const reservations = await db.reservation.findOne({ where: { title: req.query.title } });

  res.json(reservations);
};

// Create a movie in the database.
exports.create = async (req, res) => {

  const reservation = await Reservation.create({
    username: req.body.username,
    reservation_id: req.body.reservation_id,
    session_time: req.body.session_time,
    number_tickets: req.body.number_tickets,
    title: req.body.title,
  });

  res.json(reservation);
};