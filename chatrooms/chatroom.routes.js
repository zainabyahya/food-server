const express = require("express");
const router = express.Router();
const { getAllChatrooms, getChatroomsById, addChatroom, deleteChatroom } = require("./chatroom.controllers");
const { authenticateToken } = require("../middlewares/auth.js");

router.get("/", getAllChatrooms);

router.get("/chats/:id", authenticateToken, getAllChats)

router.get("/chats/:id/:searchTerm", searchChatroomByWord)

router.get("/:id", getChatroomsByUserId);

router.post("/", authenticateToken, addChatroom);

router.delete('/:id', authenticateToken, deleteChatroom);

router.put('/:id', authenticateToken, updateChatroom);

module.exports = router;