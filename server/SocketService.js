const { Server } = require("socket.io");

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("roomCode", (roomCode) => {
      io.emit("roomCode", roomCode);
    });

    socket.on("playAgain", (trigger) => {
      io.emit("playAgain", trigger + 1);
    });

    socket.on("cellState", (data) => {
      io.emit("cellState", data);
    });
  });
};

module.exports = initSocket;
