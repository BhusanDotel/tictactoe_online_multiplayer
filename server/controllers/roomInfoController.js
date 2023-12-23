const boardData = require("../models/boardModel.js");

const fetchRoomInfo = async (req, res) => {
  if (req.body) {
    const { roomcode } = req.body;
    if (roomcode) {
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
