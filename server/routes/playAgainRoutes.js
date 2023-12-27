const express = require("express");
const router = express.Router();

const playagaincontroller = require("../controllers/playAgainController");

router.post("/playagain", playagaincontroller.playAgain);
router.post("/allowplayagain", playagaincontroller.allowPlayAgain);
router.post("/denyplayagain", playagaincontroller.denyPlayagain);

module.exports = router;
