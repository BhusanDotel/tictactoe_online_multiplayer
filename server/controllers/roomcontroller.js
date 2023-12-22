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
            player1: name,
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
      boardData.create({
        roomCode: roomCodeIn,
        matrix: [
          [100, 100, 100],
          [100, 100, 100],
          [100, 100, 100],
        ],
        player2: name,
      });
      res.json("room is available");
    } else {
      res.json("room not available");
    }
  }
};

module.exports = {
  createRoom,
  joinRoom,
};
