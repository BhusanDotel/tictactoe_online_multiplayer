const boardData = require("../models/boardModel.js");

let timer;
let seconds = 300;

const startTimer = (roomCodeIn) => {
  timer = setInterval(() => {
    seconds--;

    if (seconds < 0) {
      clearInterval(timer);
      async function deleteRoom() {
        await boardData.deleteOne({ roomCode: roomCodeIn });
      }
      deleteRoom();
      seconds = 300;
    }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(timer);
  seconds = 300;
};

const deleteRoom = async (req, res) => {
  if (req.body) {
    const { roomCodeIn } = req.body;
    if (roomCodeIn) {
      const roomExists = await boardData.findOne({ roomCode: roomCodeIn });
      if (roomExists) {
        resetTimer();
        startTimer(roomCodeIn);
      }
    }
  }
};

module.exports = {
  deleteRoom,
};
