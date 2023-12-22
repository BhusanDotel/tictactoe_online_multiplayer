const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  roomCode: {
    type: Number,
    required: true,
  },

  11: { type: String, default: null },
  12: { type: String, default: null },
  13: { type: String, default: null },
  21: { type: String, default: null },
  22: { type: String, default: null },
  23: { type: String, default: null },
  31: { type: String, default: null },
  32: { type: String, default: null },
  33: { type: String, default: null },

  matrix: {
    type: [[Number]],
    required: true,
  },

  image: {
    type: String,
    required: false,
  },

  player1: {
    type: String,
    required: false,
  },
  player2: {
    type: String,
    required: false,
  },
});

const boardData = mongoose.model("Board", boardSchema);

module.exports = boardData;
