const Confirmation = require('../models/Confirmation');
const FoodPost = require('../models/FoodPost');


function checkUserAuthorization(confirmation, userId) {
    return confirmation.owner.toString() === userId.toString() || confirmation.user.toString() === userId.toString();
}

async function updateConfirmationStatus(confirmation) {
    if (confirmation.confirmedByOwner === "confirmed" && confirmation.confirmedByUser === "confirmed") {
        confirmation.status = "confirmed";
    } else if (confirmation.confirmedByOwner === "confirmed" || confirmation.confirmedByUser === "confirmed") {
        confirmation.status = "partiallyConfirmed";
    } else if (confirmation.confirmedByOwner === "rejected" || confirmation.confirmedByUser === "rejected") {
        confirmation.status = "rejected";
    } else {
        confirmation.status = "pending";
    }
    await confirmation.save();
    return confirmation.status;
}

const createConfirmation = async (req, res, next) => {
    try {
        const confirmationData = {
            ...req.body,
            user: req.user.userId,
            status: "pending"
        }
        const checkCon = await Confirmation.findOne({ post: confirmationData.post })
        if (!checkCon) {
            const newConfirmation = await Confirmation.create(confirmationData);
            console.log("🚀 ~ createConfirmation ~ newConfirmation:", newConfirmation)

            res.status(201).json({ newConfirmation });

        } else {
            res.status(204).json({ "message": "confirmation already exists." })
        }
    } catch (error) {
        next(error);
    }
};

const updateConfirmation = async (req, res, next) => {
    console.log("🚀 ~ updateConfirmation ~ req:", req.body)
    const confirmationId = req.params.conId;
    console.log("🚀 ~ updateConfirmation ~ confirmationId:", confirmationId)
    const userId = req.user.userId;
    const { confirmedByOwner, confirmedByUser } = req.body;
    console.log("🚀 ~ updateConfirmation ~ confirmedByUser:", confirmedByUser)
    console.log("🚀 ~ updateConfirmation ~ confirmedByOwner:", confirmedByOwner)
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
            console.log(acc, key);
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
    const { users } = req.body
    console.log("🚀 ~ getConfirmationByUsersIds ~ req.body:", req.body)
    console.log("🚀 ~ getConfirmationByUsersIds ~ users:", users)
    // try {
    //     const confirmation = await Confirmation.findOne({ user: userId, owner: ownerId });
    //     if (!confirmation) {
    //         const err = new Error("Confirmation not found for these users");
    //         err.status = 404
    //         next(err);
    //     }
    //     res.status(201).json({ confirmation });
    // } catch (error) {
    //     next(error);
    // }
};

module.exports = { getConfirmationByPostId, getConfirmationByUsersIds, createConfirmation, checkConfirmationStatus, updateConfirmation };