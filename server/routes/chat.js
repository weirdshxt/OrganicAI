const express = require("express");
const router = express.Router();
const { handleChat } = require("../controller/aiController");

router.post("/chat", handleChat);

module.exports = router;
