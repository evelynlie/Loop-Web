module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING(32),
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    signUpDate: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false, 
    hooks: {
      beforeUpdate: async (user) => {
        // If the username is changed, update it in the related posts.
        if (user.changed('username')) {
          await Post.update({ username: user.username }, {
            where: { username: user.username }
          });
        }
      }
    }
  });