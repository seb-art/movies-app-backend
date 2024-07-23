const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/GenreRoute");
const movies = require("./routes/MovieRoute");
const rentals = require("./routes/RentalRoute");
const customers = require("./routes/CustomerRoute");
const users = require("./routes/UserRoute");
const home = require("./routes/HomeRoute");
const auth = require("./routes/AuthRoute");
const app = express();

require('dotenv').config();


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to the DB..."))
  .catch((err) => console.log("Something went wrong", err));

app.use(express.json()); //middleware
app.use("/", home);
app.use("/api/rentals", rentals);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/users", users);
app.use("/api/auth", auth);

// SERVING
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
