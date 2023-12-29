const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const initSocket = require("./SocketService");
require("dotenv").config();

const roomRoutes = require("./routes/roomRoutes");
const turnRoutes = require("./routes/turnRoutes");
const playAgainRoutes = require("./routes/playAgainRoutes");
const roomInfoRoutes = require("./routes/roomInfoRoutes");
const deleteRoomRoute = require("./routes/deleteRoomRoute");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const mongoCloudURL = process.env.MDB_URL;
const mongoLocal = "mongodb://localhost:27017/AaluCrossDB";
mongoose
  .connect(mongoCloudURL)
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
app.use("/api", deleteRoomRoute);

const server = http.createServer(app);

initSocket(server);

server.listen(3000, () => {
  console.log("App listening on port 3000!");
});
