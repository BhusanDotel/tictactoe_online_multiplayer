const boardData = require("../models/boardModel.js");

const playAgain = async (req, res) => {
  if (req.body) {
    const { roomcode, name } = req.body;
    if (roomcode && name) {
      try {
        const room = await boardData.findOne({ roomCode: roomcode });
        if (room) {
          if (room.playAgainVote.length === 0) {
            if (!room.playAgainVote.includes(name)) {
              room.playAgainVote.push(name);
            }
          }
          await room.save();
          res.json("play again registered");
        }
      } catch (error) {}
    }
  }
};

const allowPlayAgain = async (req, res) => {
  if (req.body) {
    const { roomcode, name } = req.body;
    if (roomcode && name) {
      try {
        const room = await boardData.findOne({ roomCode: roomcode });
        if (room) {
          if (!room.playAgainVote.includes(name)) {
            room.playAgainVote.push(name);
          }
          if (room.playAgainVote.length === 2) {
            room[11] = null;
            room[12] = null;
            room[13] = null;
            room[21] = null;
            room[22] = null;
            room[23] = null;
            room[31] = null;
            room[32] = null;
            room[33] = null;
            room.winCoordsInitials = "";
            room.gameStartTurn === room.player1
              ? (room.gameStartTurn = room.player2)
              : (room.gameStartTurn = room.player1);

            room.turn = room.gameStartTurn;
            if (room.turn == room.player2) {
              room.clickcount = 1;
            } else {
              room.clickcount = 0;
            }
            const matrix = [
              [100, 100, 100],
              [100, 100, 100],
              [100, 100, 100],
            ];
            room.matrix = matrix;
            room.playAgainVote = [];
            room.winCoordsInitials = "";
          }
          await room.save();
          res.json("play again registered");
        }
      } catch (error) {}
    }
  }
};

const denyPlayagain = async (req, res) => {
  if (req.body) {
    const { roomcode, name } = req.body;
    if (roomcode && name) {
      try {
        const room = await boardData.findOne({ roomCode: roomcode });
        if (room) {
          room.playAgainVote = [];
          await room.save();
          res.json("play again denied");
        }
      } catch (error) {}
    }
  }
};

module.exports = {
  playAgain,
  allowPlayAgain,
  denyPlayagain,
};
