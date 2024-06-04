const FoodPost = require('../models/FoodPost');

const addFoodPost = async (req, res, next) => {
    try {
        console.log("🚀 ~ addFoodPost ~ req.body:", req.body)
        const imageFile = req.file;
        const imageUrl = "images/" + imageFile?.filename;

        const parsedLocation = JSON.parse(req.body.location);

        const newFoodPostData = {
            ...req.body,
            location: parsedLocation,
            owner: req.user.userId,
            dateCreated: Date.now(),
            image: imageUrl
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
        let imageUrl = "images/";
        let newPostData = {};

        if (req.file) {
            const imageFile = req.file;
            imageUrl += imageFile.filename;
            newPostData = {
                ...req.body,
                image: imageUrl,
            }
        } else {
            newPostData = {
                ...req.body,
            }
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
            return res.status(404).json({ error: 'Food post not found' });
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