module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
