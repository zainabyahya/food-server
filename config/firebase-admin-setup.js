const { firestore } = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const serviceAccountKey = require("../ServiceAccountKey");

// Initialize the Firebase Admin SDK
exports.app = initializeApp({
    credential: cert(serviceAccountKey),
    storageBucket: "food-28z.appspot.com",
});

exports.db = firestore();
exports.bucket = getStorage().bucket();