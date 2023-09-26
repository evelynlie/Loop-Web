const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.movie = require("./models/movie.js")(db.sequelize, DataTypes);
db.session = require("./models/session.js")(db.sequelize, DataTypes);

db.user.hasMany(db.post, { foreignKey: 'username' }); // Connect the username of the post table to the username of the user table
db.movie.hasMany(db.session, { foreignKey: 'movie_id' }); // Connect the movie_id of the session table to the movie_id of the movie table
db.movie.hasMany(db.post, { foreignKey: 'movie_id' }); // Connect the movie_id of the session table to the movie_id of the movie table

// Relate post and user.
// post table belong to user, by creating a new column call username in post table to link with user table
db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
db.post.belongsTo(db.movie, { foreignKey: { name: "movie_id", allowNull: false } });

// Relate session and movie.
// session table belong to movie, by creating a new column call movie_id in session table to link with movie table
db.session.belongsTo(db.movie, { foreignKey: { name: "movie_id", allowNull: false } });

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const user_table_count = await db.user.count();
  const movie_table_count = await db.movie.count();
  const session_table_count = await db.session.count();

  // Only seed user data if necessary.
  if(user_table_count == 0) {
    const argon2 = require("argon2");

    let hash = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({ username: "mbolger", password_hash: hash, email: "mbolger@test.com", signUpDate: "Mon, 16 September 2023" });

    hash = await argon2.hash("def456", { type: argon2.argon2id });
    await db.user.create({ username: "shekhar", password_hash: hash, email: "shekhar@test.com", signUpDate : "Tue, 17 September 2023" });

    hash = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({ username: "kent", password_hash: hash, email: "kent@test.com", signUpDate : "Tue, 17 September 2023" });
  }

  // Only seed movie data if necessary.
  if(movie_table_count == 0) {
    await db.movie.create({ title: "Barbie", imageURL: "../movie_posters/barbie.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "Oppenheimer", imageURL: "../movie_posters/oppenheimer.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "Mission: Impossible - Dead Reckoning Part 1", imageURL: "../movie_posters/mission_impossible.jpeg", averageRating: 0, viewCount: 0 });
  }
  
  // Only seed session data if necessary.
  if(session_table_count == 0) {
    await db.session.create({ sessionDate: "23 Sep 2023", sessionTime: '10:00 am', movie_id: 1 });
  }
}

module.exports = db;