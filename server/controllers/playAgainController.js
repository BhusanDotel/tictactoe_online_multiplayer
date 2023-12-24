const boardData = require("../models/boardModel.js");

const playAgain = async (req, res) => {
  if (req.body) {
    const { roomcode, name } = req.body;
    if (roomcode && name) {
      try {
        const room = await boardData.findOne({ roomCode: roomcode });
        if (room) {
          room[11] = null;
          room[12] = null;
          room[13] = null;
          room[21] = null;
          room[22] = null;
          room[23] = null;
          room[31] = null;
          room[32] = null;
          room[33] = null;
          room.clickcount = 0;
          room.winCoordsInitials = "";
          const _player2 = room.player2;
          room.turn = _player2;
          const matrix = [
            [100, 100, 100],
            [100, 100, 100],
            [100, 100, 100],
          ];

          room.matrix = matrix;
          await room.save();
        }
      } catch (error) {}
    }
  }
};

module.exports = {
  playAgain,
};
