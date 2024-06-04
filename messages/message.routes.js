const express = require("express");
const router = express.Router();
const { getAllMessages,
    getMessagesByUser,
    deleteMessage,
    updateMessage,
    addMessage }
    = require("./message.controllers.js");

const { authenticateToken } = require("../middlewares/auth.js");
const { isMessageAuthor } = require("../middlewares/isAuthor.js")

router.get("/", getAllMessages);

router.get("/user/:userId", getMessagesByUser);

router.post("/", authenticateToken, addMessage);

router.delete('/:messageId', authenticateToken, isMessageAuthor, deleteMessage);

router.put('/:messageId', authenticateToken, isMessageAuthor, updateMessage);

module.exports = router;