
const path = require("path");
const fs = require("fs");
const User = require("../models/User.js");

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({ allUsers });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const foundUser = await User.findById(userId);
        res.status(200).json({ foundUser });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const foundUser = await User.findByuserIdAndDelete(userId);

        if (foundUser.image) {
            const imageName = foundUser.image.replace(/^images\//, "");
            const staticPath = path.join(path.dirname(""), "static/images");
            const imagePath = path.join(staticPath, imageName);

            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Error deleting user image" });
                    }
                });
            }
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        let imageUrl = "images/";
        let newUserdata = {};

        if (req.file) {
            const imageFile = req.file;
            imageUrl += imageFile.filename;
            newUserdata = {
                ...req.body,
                image: imageUrl,
            }
        } else {
            newUserdata = {
                ...req.body,
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, newUserdata, { new: true });

        res.status(201).json({ updatedUser });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers, getUserById, deleteUser, updateUser };