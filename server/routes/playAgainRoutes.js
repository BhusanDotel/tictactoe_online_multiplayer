const express = require("express");
const router = express.Router();

const playagaincontroller = require("../controllers/playAgainController");

router.post("/playagain", playagaincontroller.playAgain);

module.exports = router;
