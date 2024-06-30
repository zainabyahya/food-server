const path = require("path");
const fs = require("fs");
const User = require("../models/User.js");
const getFirebaseImgUrl = require("../services/firebaseStorageService");


const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const foundUser = await User.findById(userId);
        res.status(200).json({ foundUser });
    } catch (error) {
        next(error);
    }
};

const updateUserRating = async (req, res, next) => {
    try {
        const userId = req.body.id;
        const rating = req.body.rating;
        const foundUser = await User.findById(userId);
        const ratingInfo = {
            ratingSum: foundUser.ratingSum + rating,
            ratingCount: foundUser.ratingCount + 1,
        };
        const updatedUser = await User.findByIdAndUpdate(userId, ratingInfo, { new: true });
        res.status(200).json({ updatedUser });
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
        console.log("🚀 ~ updateUser ~ userId:", userId)
        let newUserData = {
            ...req.body,
        }
        console.log("🚀 ~ updateUser ~ newUserData:", newUserData)

        if (req.file) {
            const imageURL = await getFirebaseImgUrl(
                "profile-images",
                req.file.path,
                req.file.originalname
            );
            console.log("imageURL" + imageURL);

            newUserData.image = imageURL;
        }
        const updatedUser = await User.findByIdAndUpdate(userId, newUserData, { new: true });

        res.status(201).json({ updatedUser });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUserById, deleteUser, updateUser, updateUserRating };