const boardData = require("../models/boardModel.js");

const createRoom = (req, res) => {
  if (req.body) {
    const { name } = req.body;
    if (name) {
      async function createRoom() {
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        const roomExists = await boardData.findOne({ roomCode: randomNumber });
        if (roomExists) {
          res.json("room already available");
          createRoom();
        } else {
          boardData.create({
            roomCode: randomNumber,
            isfull: false,
            player1: name,
            turn: name,
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
    const roomExists = await boardData.findOne({ roomCode: roomCodeIn });
    if (roomExists) {
      if (roomExists.isfull === false) {
        const matrix = [
          [100, 100, 100],
          [100, 100, 100],
          [100, 100, 100],
        ];
        roomExists.isfull = true;
        roomExists.roomCode = roomCodeIn;
        roomExists.matrix = matrix;
        roomExists.player2 = name;
        await roomExists.save();
        res.json("room is available");
      } else {
        res.json("room is full");
      }
    } else {
      res.json("room not available");
    }
  }
};

module.exports = {
  createRoom,
  joinRoom,
};
