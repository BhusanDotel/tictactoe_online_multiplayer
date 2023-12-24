const boardData = require("../models/boardModel.js");

const fetchRoomInfo = async (req, res) => {
  if (req.body) {
    const { roomcode, name } = req.body;
    if (roomcode && name) {
      const room = await boardData.findOne({ roomCode: roomcode });
      if (room) {
        res.json(room);
      }
    }
  }
};

module.exports = {
  fetchRoomInfo,
};
