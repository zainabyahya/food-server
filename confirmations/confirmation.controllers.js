const Confirmation = require('../models/Confirmation');
const FoodPost = require('../models/FoodPost');


function checkUserAuthorization(confirmation, userId) {
    return confirmation.owner.toString() === userId.toString() || confirmation.user.toString() === userId.toString();
}

async function updateConfirmationStatus(confirmation) {
    if (confirmation.confirmedByOwner && confirmation.confirmedByUser) {
        confirmation.status = "confirmed";
    } else if (confirmation.confirmedByOwner || confirmation.confirmedByUser) {
        confirmation.status = "partiallyConfirmed";
    } else {
        confirmation.status = "rejected";
    }
    await confirmation.save();
}

const createConfirmation = async (req, res, next) => {
    try {
        const newConfirmation = Confirmation.create(req.body);
        res.status(201).json({ newConfirmation });
    } catch (error) {
        next(error);
    }
};

const updateConfirmation = async (req, res, next) => {
    const confirmationId = req.params.id;
    const userId = req.user.userId
    try {
        const confirmation = await Confirmation.findById(confirmationId);
        if (!confirmation) {
            return res.status(404).json({ message: "Confirmation not found" });
        }
        if (!checkUserAuthorization(confirmation, userId)) {
            return res.status(401).json({ message: "Unauthorized confirmation update" });
        }
        const allowedUpdates = ['confirmedByOwner', 'confirmedByUser'];
        const updates = Object.keys(req.body).reduce((acc, key) => {
            if (allowedUpdates.includes(key)) {
                acc[key] = req.body[key];
            }
            return acc;
        }, {});
        confirmation.set(updates);
        await confirmation.save();
        const currentStatus = await updateConfirmationStatus(confirmation);
        if (currentStatus === "confirmed") {
            await FoodPost.findByIdAndDelete(confirmation.post)
        }
        res.json(confirmation);
    } catch (error) {
        next(error);
    }
};

const checkConfirmationStatus = async (req, res, next) => {
    const confirmationId = req.params.id;
    try {
        const confirmation = await Confirmation.findById(confirmationId);
        if (!confirmation) {
            return res.status(404).json({ message: "Confirmation not found" });
        }
        res.status(201).json({ status: confirmation.status });
    } catch (error) {
        next(error);
    }
};

const getConfirmationByPostId = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const confirmation = await Confirmation.findOne({ post: postId });
        if (!confirmation) {
            return res.status(404).json({ message: "Confirmation not found for this post" });
        }
        res.status(201).json({ confirmation });
    } catch (error) {
        next(error);
    }
};

const getConfirmationByUsersIds = async (req, res, next) => {
    const userId = req.params.userId;
    const ownerId = req.params.ownerId;
    try {
        const confirmation = await Confirmation.findOne({ user: userId, owner: ownerId });
        if (!confirmation) {
            return res.status(404).json({ message: "Confirmation not found for these users" });
        }
        res.status(201).json({ confirmation });
    } catch (error) {
        next(error);
    }
};

module.exports = { getConfirmationByPostId, getConfirmationByUsersIds, createConfirmation, checkConfirmationStatus, updateConfirmation };