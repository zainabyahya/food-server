const express = require("express");
const Chatroom = require("../models/Chatroom.js");
const Message = require("../models/Message.js");

const getChatroomsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const allChatrooms = await Chatroom.find({ users: userId }).populate("users");
        res.status(200).json({ allChatrooms });
    } catch (error) {
        next(error);
    }
};

const getChatroomsById = async (req, res, next) => {
    try {
        const { chatroomId } = req.params;
        const foundChatrooms = await Chatroom.findById(chatroomId).populate('messages');

        res.status(200).json({ foundChatrooms });
    } catch (error) {
        next(error);
    }
};
const addChatroom = async (req, res, next) => {
    try {
        const { users } = req.body;
        const sortedUsers = users.sort();

        const checkChatroom = await Chatroom.findOne({ users: sortedUsers });

        if (checkChatroom) {
            return res.status(200).json({ chatroom: checkChatroom });
        }

        const newChatroom = await Chatroom.create({ users: sortedUsers });
        return res.status(201).json({ chatroom: newChatroom });

    } catch (error) {
        next(error);
    }
};

const deleteChatroom = async (req, res, next) => {
    try {
        const { chatroomId } = req.params;
        await Chatroom.findByIdAndDelete(chatroomId);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = { getChatroomsByUser, getChatroomsById, addChatroom, deleteChatroom };