const express = require("express");
const genres = require("./routes/movieGenres");
const customers = require("./routes/customers");
const home = require("./routes/home");
const app = express();

app.use(express.json()); //middleware
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);

// SERVING
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
