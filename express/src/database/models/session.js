module.exports = (sequelize, DataTypes) =>
  sequelize.define("session", {
    session_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sessionDate: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    sessionTime: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    ticketAvailable: {
      type: DataTypes.INTEGER,
      allowNUll: false,
      defaultValue: 10
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false, 
  });