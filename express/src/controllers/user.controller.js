const db = require("../database");
const User = db.user;
const Post = db.post;
User.hasMany(Post, { foreignKey: 'username' }); // Connect the username of the post table to the username of the user table
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.findUsername = async (req, res) => {
  const user = await db.user.findByPk(req.params.username);

  res.json(user);
};

exports.findEmail = async (req, res) => {
  const user = await db.user.findOne({ where: {email: req.params.email}});

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({ where: {email: req.query.email}});

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.status(404).json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: hash,
    signUpDate: req.body.signUpDate
  });

  res.json(user);
};

// Update user detail in the database.
exports.update = async (req, res) => {
  const id = req.params.id;

  // Update username and email.
  User.update({email: req.body.email, username: req.body.username}, {
    where: { username: id }
  })
  .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a user based on username
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { username: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};