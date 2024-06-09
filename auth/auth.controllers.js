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
        console.log("====================");
        console.log("------------" + req.body);

        const phoneNumber = req.body.phoneNumber;
        const password = req.body.password;
        console.log("🚀 ~ login ~ phoneNumber:", phoneNumber)
        console.log("=========zzzzz===========");

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

    try {
        const existingUser = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: "phoneNumber already registered" });
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
            console.log("imageURL" + imageURL);

            newUserData.image = imageURL;
        }

        const newUser = await User.create(newUserData);
        const generatedToken = generateToken(newUser);
        res.status(201).json({ generatedToken });
    } catch (error) {
        next(error);
    }

};


module.exports = { login, signUp };