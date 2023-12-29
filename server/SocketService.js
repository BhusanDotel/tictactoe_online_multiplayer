const { Server } = require("socket.io");

// const initSocket = (httpServer) => {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//     },
//   });

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "https://aalucross.onrender.com",
      methods: ["GET", "POST"],
    },
  });

  const activeUsers = [];

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

    socket.on("activeUserInfo", (activeUserInfo) => {
      const { username, roomCode } = activeUserInfo;
      // Check if the user already exists in activeUsers array
      const existingUserIndex = activeUsers.findIndex(
        (user) => user.username === username
      );
      if (existingUserIndex !== -1) {
        // If user exists, update the sID
        activeUsers[existingUserIndex].sID = socket.id;
      } else {
        // If user doesn't exist, add a new entry
        const activeUser = {
          roomcode: roomCode,
          username: username,
          sID: socket.id,
        };
        activeUsers.push(activeUser);
      }
      io.emit("activeUsers", activeUsers);
    });

    socket.on("disconnect", () => {
      let disconnectedUser = "";
      activeUsers.forEach((user) => {
        if (user.sID === socket.id) {
          disconnectedUser = user.username;
        }
      });
      const disconnetUserIndex = activeUsers.findIndex(
        (user) => user.username === disconnectedUser
      );
      if (disconnetUserIndex !== -1) {
        activeUsers.splice(disconnetUserIndex, 1);
        io.emit("activeUsers", activeUsers);
      }
    });
  });
};

module.exports = initSocket;
