const Message = require("../models/Message");


const getAllMessages = async (req, res, next) => {
    try {
        const allMessages = await Message.find();
        res.status(200).json({ allMessages });
    } catch (error) {
        next(error);
    }
};


const getMessagesByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const foundMessages = await Message.find({ user: userId });
        res.status(200).json({ foundMessages });
    } catch (error) {
        next(error);
    }
};

const addMessage = async (req, res, next) => {
    try {
        const newMessageData = {
            ...req.body,
            user: req.user.userId
        }
        const newMessage = await Message.create(newMessageData);

        res.status(201).json({ newMessage });
    } catch (error) {
        next(error);
    }
};

const deleteMessage = async (req, res, next) => {
    try {
        const messageId = req.params.messageId;
        await Message.findByIdAndDelete(messageId);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

const updateMessage = async (req, res, next) => {
    try {
        const messageId = req.params.messageId;
        const updatedMessage = await Message.findByIdAndUpdate(messageId, req.body, { new: true });
        res.status(201).json({ updatedMessage });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllMessages, getMessagesByUser, deleteMessage, updateMessage, addMessage };