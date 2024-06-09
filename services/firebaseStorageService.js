const { bucket } = require("../config/firebase-admin-setup");
const { getDownloadURL } = require("firebase-admin/storage");

const getFirebaseImgUrl = async (destinationName, filePath, fileName) => {
    console.log("des", destinationName);
    console.log("file", filePath);
    console.log("name", fileName);
    const remoteFilePath = `${destinationName}/${fileName}`;

    const [uploadedFile] = await bucket.upload(filePath, {
        destination: remoteFilePath,
    });

    console.log("uploadedFile", uploadedFile);
    /////////////////////////////
    const imageURL = await getDownloadURL(uploadedFile);
    console.log("imageURL", uploadedFile);
    return imageURL;
};

module.exports = getFirebaseImgUrl;