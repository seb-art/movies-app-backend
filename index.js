const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/movieGenres");
const movies = require("./routes/movies");
const customers = require("./routes/customers");
const home = require("./routes/home");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/movies")
  .then(() => console.log("connected to the DB..."))
  .catch((err) => console.log("Something went wrong", err));

app.use(express.json()); //middleware
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);

// SERVING
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
