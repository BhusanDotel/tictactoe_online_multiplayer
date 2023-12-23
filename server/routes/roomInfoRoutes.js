const express = require("express");
const router = express.Router();

const playerInfocontroller = require("../controllers/roomInfoController");
router.post("/getroomInfo", playerInfocontroller.fetchRoomInfo);

module.exports = router;
