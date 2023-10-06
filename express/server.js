const express = require("express");
const cors = require("cors");
const db = require("./src/database");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("./src/graphql");

// Database will be sync'ed in the background.
db.sync();

// Create new express app
const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
// when theres a GET request, send json object
app.get("/", (req, res) => { // (request, response)
  res.json({ message: "Hello World!" });
});

// Add user, post, movie routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/movie.routes.js")(express, app);
require("./src/routes/session.routes.js")(express, app);
require("./src/routes/reservation.routes.js")(express, app);

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// Add GraphQL to express server.
// NOTE: You can use the GraphQL web-interface to test the GraphQL schema thanks to the graphiql parameter being true.
// Access the web-interface when the server is running here: http://localhost:4000/graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
  })
);

// Set port, listen for requests for backend.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
