const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll(); // findAll() sequelise helper function

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({ // create() sequelise helper function
    username: req.body.username,
    movieTitle: req.body.movieTitle,
    rating: req.body.rating,
    comment: req.body.comment
  });

  res.json(post);
};
