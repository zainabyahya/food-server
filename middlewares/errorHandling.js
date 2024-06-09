function errorHandling(err, req, res, next) {
    console.log("🚀 ~ errorHandling ~ err:", err)

    res.status(err.status || 500).send(err.message || "Internal server error.");

}

module.exports = errorHandling;