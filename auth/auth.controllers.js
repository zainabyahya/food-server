const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getFirebaseImgUrl = require("../services/firebaseStorageService");

const generateToken = (userCredentials) => {
    const payload = {
        userId: userCredentials._id,
        phoneNumber: userCredentials.phoneNumber,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: Date.now() + 360,
    });
    return token;
};

const login = async (req, res, next) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const password = req.body.password;

        const foundUser = await User.findOne({ phoneNumber: phoneNumber });

        if (!foundUser) {
            return res.status(401).json({ message: "Invalid number or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid number or password" });
        }

        const token = jwt.sign(
            { userId: foundUser._id, phoneNumber: foundUser.phoneNumber },
            process.env.SECRET_KEY
        );
        console.log("🚀 ~ login ~ token:", token)

        res.status(201).json(token);
    } catch (error) {
        next(error);
    }
};

const signUp = async (req, res, next) => {
    console.log("🚀 ~ signUp ~ req:", req.body)
    try {
        const existingUser = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (existingUser) {
            const err = new Error("رقم الهاتف موجود بالفعل")
            err.status = 400
            next(err);
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const newUserData = {
            ...req.body,
        };

        if (req.file) {
            const imageURL = await getFirebaseImgUrl(
                "profile-images",
                req.file.path,
                req.file.originalname
            );
            newUserData.image = imageURL;
        }
        console.log("🚀 ~ signUp ~ newUserData:", newUserData)

        const newUser = await User.create(newUserData);
        console.log("🚀 ~ signUp ~ newUser:", newUser)
        const generatedToken = generateToken(newUser);
        res.status(201).json({ generatedToken });
    } catch (error) {
        next(error);
    }

};


module.exports = { login, signUp };