const express = require("express");
const router = express.Router();
const { getChatroomsByUser, getChatroomsById, addChatroom, deleteChatroom } = require("./chatroom.controllers");
const { authenticateToken } = require("../middlewares/auth.js");

router.get("/userId", getChatroomsByUser);

router.get("/:chatroomId", getChatroomsById);

router.post("/", authenticateToken, addChatroom);

router.delete('/:chatroomId', authenticateToken, deleteChatroom);


module.exports = router;