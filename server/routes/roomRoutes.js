const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomcontroller");
router.post("/createroom", roomController.createRoom);
router.post("/joinroom", roomController.joinRoom);

module.exports = router;
