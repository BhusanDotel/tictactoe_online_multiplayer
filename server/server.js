const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const roomRoutes = require("./routes/roomRoutes");
const turnRoutes = require("./routes/turnRoutes");
const playAgainRoutes = require("./routes/playAgainRoutes");
const roomInfoRoutes = require("./routes/roomInfoRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MDB_URL)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((e) => {
    console.log("Error", e);
  });

app.use("/api", turnRoutes);
app.use("/api", roomRoutes);
app.use("/api", playAgainRoutes);
app.use("/api", roomInfoRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
