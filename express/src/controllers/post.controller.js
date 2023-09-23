const db = require("../database");
const Post = db.post;
const User = db.user;
const Movie = db.movie;
Post.belongsTo(User, { foreignKey: 'username' }); // Connect the username of the post table to the username of the user table
Post.belongsTo(Movie, { foreignKey: 'movie_id' }); // Connect the username of the post table to the username of the user table


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
    title: req.body.title,
    movie_id: req.body.movie_id,
    rating: req.body.rating,
    comment: req.body.comment

  });

  res.json(post);
};

// Update a post in the database
exports.update = async (req, res) => {
  const id = req.params.id;
  
  Post.update({ rating: req.body.rating, comment: req.body.comment }, 
    { where: { post_id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Post was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Post with post_id=${id}. Maybe Post was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Post with post_id=" + id
    });
  });
}

// Delete a post in the database
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  Post.destroy({
    where: { post_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with post_id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with post_id=" + id
      });
    });
}