const express = require("express");
const router = express.Router();
const deleteRoomController = require("../controllers/deleteRoomController");

router.post("/deleteroom", deleteRoomController.deleteRoom);

module.exports = router;
