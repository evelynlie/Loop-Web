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
    await db.movie.create({ title: "Barbie", imageURL: "http://localhost:3000/static/media/barbie.a215b72ba6528a48c499.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "Oppenheimer", imageURL: "http://localhost:3000/static/media/oppenheimer.20523bbe9dbe4628d6be.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "Mission: Impossible - Dead Reckoning Part 1", imageURL: "http://localhost:3000/static/media/mission_impossible.cb09349f2d5e17dbf770.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "The Moon", imageURL: "http://localhost:3000/static/media/the_moon.58c7a73d7f062b14bc85.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "The Marvels", imageURL: "http://localhost:3000/static/media/the_marvels.dbd8c0f8369fba36dc0c.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "Wonka", imageURL: "http://localhost:3000/static/media/wonka.e390fda060bd85b127be.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "Concrete Utopia", imageURL: "http://localhost:3000/static/media/concrete_utopia.2e61ce213082d66de00b.jpeg", averageRating: 0, viewCount: 0 });
    await db.movie.create({ title: "Dune Part Two", imageURL: "http://localhost:3000/static/media/dune_part_two.c09941b1b2fa01db6127.jpeg", averageRating: 0, viewCount: 0 });
  }
  
  // Only seed session data if necessary.
  if(session_table_count == 0) {
    await db.session.create({ sessionDate: "23 Sep 2023", sessionTime: '10:00 am', movie_id: 1 });
    await db.session.create({ sessionDate: "24 Sep 2023", sessionTime: '11:00 am', movie_id: 2 });
    await db.session.create({ sessionDate: "25 Sep 2023", sessionTime: '12:00 am', movie_id: 3 });
    await db.session.create({ sessionDate: "26 Sep 2023", sessionTime: '13:00 am', movie_id: 4 });
    await db.session.create({ sessionDate: "27 Sep 2023", sessionTime: '14:00 am', movie_id: 5 });
    await db.session.create({ sessionDate: "28 Sep 2023", sessionTime: '15:00 am', movie_id: 6 });
    await db.session.create({ sessionDate: "29 Sep 2023", sessionTime: '16:00 am', movie_id: 7 });
    await db.session.create({ sessionDate: "30 Sep 2023", sessionTime: '17:00 am', movie_id: 8 });
  }
}

module.exports = db;