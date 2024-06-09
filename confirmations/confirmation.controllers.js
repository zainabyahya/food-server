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
    return confirmation.status;
}

const createConfirmation = async (req, res, next) => {
    try {
        const confirmationData = {
            ...req.body,
            status: "pending"
        }

        const newConfirmation = await Confirmation.create(confirmationData);
        res.status(201).json({ newConfirmation });
    } catch (error) {
        next(error);
    }
};

const updateConfirmation = async (req, res, next) => {
    const confirmationId = req.params.conId;
    const userId = req.user.userId;
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
            try {
                await FoodPost.findByIdAndDelete(confirmation.post);
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
        res.status(201).json({ confirmation });
    } catch (error) {
        next(error);
    }
};

const checkConfirmationStatus = async (req, res, next) => {
    const confirmationId = req.params.conId;
    try {
        const confirmation = await Confirmation.findById(confirmationId);
        if (!confirmation) {
            const err = new Error("confirmation not found")
            err.status = 404
            next(err);
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
            const err = new Error("Confirmation not found for this post")
            err.status = 404
            next(err);
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
            const err = new Error("Confirmation not found for these users");
            err.status = 404
            next(err);
        }
        res.status(201).json({ confirmation });
    } catch (error) {
        next(error);
    }
};

module.exports = { getConfirmationByPostId, getConfirmationByUsersIds, createConfirmation, checkConfirmationStatus, updateConfirmation };