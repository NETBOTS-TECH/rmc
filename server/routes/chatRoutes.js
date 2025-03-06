const express = require("express");
const { createChatUser, getChatUsers } = require("../controllers/chatUserController");

const router = express.Router();

router.post("/", createChatUser);
router.get("/", getChatUsers);

module.exports = router;
