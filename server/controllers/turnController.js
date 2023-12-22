const boardData = require("../models/boardModel.js");

const turn = async (req, res) => {
  if (req.body) {
    const { a, b, roomcode } = req.body;
    try {
      console.log(a, b, roomcode);
    } catch (error) {}
  }
};

module.exports = {
  turn,
};
