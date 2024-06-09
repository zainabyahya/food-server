const FoodPost = require('../models/FoodPost');
const Location = require('../models/Location');

const getFirebaseImgUrl = require("../services/firebaseStorageService");

const addFoodPost = async (req, res, next) => {
    try {

        const newLocation = new Location({
            longitude: req.body.longitude,
            latitude: req.body.latitude
        });
        const savedLocation = await newLocation.save();

        const currentDate = new Date();
        const newFoodPostData = {
            ...req.body,
            location: savedLocation,
            owner: req.user.userId,
            dateCreated: currentDate.toDateString(),
        }
        if (req.file) {
            const imageURL = await getFirebaseImgUrl(
                "food-images",
                req.file.path,
                req.file.originalname
            );
            console.log("imageURL" + imageURL);

            newFoodPostData.image = imageURL;
        }
        const newFoodPost = await FoodPost.create(newFoodPostData);
        res.status(201).json({ newFoodPost });
    } catch (error) {
        next(error);
    }
};

const updateFoodPost = async (req, res, next) => {
    try {
        const { foodPostId } = req.params;
        const newPostData = {
            ...req.body,
        }
        if (req.file) {
            const imageURL = await getFirebaseImgUrl(
                "food-images",
                req.file.path,
                req.file.originalname
            );
            console.log("imageURL" + imageURL);

            newPostData.image = imageURL;
        }

        const updatedFoodPost = await FoodPost.findByIdAndUpdate(foodPostId, newPostData, { new: true });
        res.status(200).json({ updatedFoodPost });
    } catch (error) {
        next(error);
    }
};

const deleteFoodPost = async (req, res, next) => {
    try {
        const postId = req.params.foodPostId;
        const foundPost = await FoodPost.findByIdAndDelete(postId);

        if (foundPost.image) {
            const imageName = foundPost.image.replace(/^images\//, "");
            const staticPath = path.join(path.dirname(""), "static/images");
            const imagePath = path.join(staticPath, imageName);

            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Error deleting post image" });
                    }
                });
            }
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

const getAllFoodPosts = async (req, res, next) => {
    try {
        const foodPosts = await FoodPost.find();
        res.status(200).json({ foodPosts });
    } catch (error) {
        next(error);
    }
};

const getFoodPostById = async (req, res, next) => {
    try {
        const { foodPostId } = req.params;
        const foodPost = await FoodPost.findById(foodPostId);
        if (!foodPost) {
            const err = new Error('Food post not found')
            err.status = 404
            next(err);
        }
        res.status(200).json(foodPost);
    } catch (error) {
        next(error);
    }
};

const getFoodPostByOwner = async (req, res, next) => {
    try {
        const { ownerId } = req.params;
        const foodPosts = await FoodPost.find({ owner: ownerId });
        res.status(200).json(foodPosts);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllFoodPosts, getFoodPostById, getFoodPostByOwner, updateFoodPost, deleteFoodPost, addFoodPost };