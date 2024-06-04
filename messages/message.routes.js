const express = require("express");
const router = express.Router();
const { getAllMessages,
    getMessagesByUser,
    deleteMessage,
    updateMessage,
    addMessage }
    = require("./message.controllers.js");
const { authenticateToken } = require("../middlewares/auth.js");

router.get("/", getAllMessages);

router.get("/user/:userId", getMessagesByUser);

router.post("/", authenticateToken, addMessage);

router.delete('/:messageId', authenticateToken, deleteMessage);

router.put('/:messageId', authenticateToken, updateMessage);

module.exports = router;