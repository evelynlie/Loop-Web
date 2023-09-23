module.exports = (sequelize, DataTypes) =>
  sequelize.define("movie", {
    movie_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    averageRating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false, 
    // FISTHIS: Need to create movie.controller.js and session.controller.js
    // hooks: {
    //   beforeUpdate: async (movie) => {
    //     // If the username is changed, update it in the related posts.
    //     if (movie.changed('movie_id')) {
    //       await Session.update({ movie_id: movie.movie_id }, {
    //         where: { movie_id: movie.movie_id }
    //       });
    //     }
    //   }
    // }
  });