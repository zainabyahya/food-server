const express = require("express");
const Chatroom = require("../models/Chatroom.js");
const Message = require("../models/Message.js");

const getAllChatrooms = async (req, res, next) => {
    try {
        const allChatrooms = await Chatroom.find().populate("users");
        res.status(200).json({ allChatrooms });
    } catch (error) {
        next(error);
    }
};

const getChatroomsById = async (req, res, next) => {
    try {
        const { chatroomId } = req.params;
        const foundChatrooms = await Chatroom.findById(chatroomId).populate('users');

        res.status(200).json({ foundChatrooms });
    } catch (error) {
        next(error);
    }
};
const addChatroom = async (req, res, next) => {
    try {
        const { users } = req.body;
        const newChatroom = await Chatroom.create({ users: users });

        res.status(201).json({ newChatroom });
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

module.exports = { getAllChatrooms, getChatroomsById, addChatroom, deleteChatroom };