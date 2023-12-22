const express = require("express");
const router = express.Router();

const turnController = require("../controllers/turnController");
router.post("/turn", turnController.turn);

module.exports = router;
