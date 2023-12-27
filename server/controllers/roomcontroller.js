const boardData = require("../models/boardModel.js");

const createRoom = (req, res) => {
  if (req.body) {
    const { name } = req.body;
    console.log(name);
    if (name) {
      async function createRoom() {
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        const roomExists = await boardData.findOne({ roomCode: randomNumber });
        if (roomExists) {
          res.json("room already available");
          createRoom();
        } else {
          const matrix = [
            [100, 100, 100],
            [100, 100, 100],
            [100, 100, 100],
          ];
          boardData.create({
            roomCode: randomNumber,
            isfull: false,
            player1: name,
            turn: name,
            gameStartTurn: name,
            matrix: matrix,
          });
          res.json(randomNumber);
        }
      }
      createRoom();
    }
  }
};

const joinRoom = async (req, res) => {
  if (req.body) {
    const { name, roomCodeIn } = req.body;
    if (name && roomCodeIn) {
      const roomExists = await boardData.findOne({ roomCode: roomCodeIn });
      if (roomExists) {
        if (
          roomExists.player1 === name ||
          roomExists.player2 === name ||
          roomExists.isfull === false
        ) {
          if (roomExists.player1 !== name) {
            roomExists.player2 = name;
            roomExists.isfull = true;
          }
          roomExists.roomCode = roomCodeIn;
          await roomExists.save();
          res.json("room is available");
        } else {
          res.json("room is full");
        }
      } else {
        res.json("room not available");
      }
    }
  }
};

module.exports = {
  createRoom,
  joinRoom,
};
