const express = require("express");
const router = express.Router();
const { createAddress, deleteAddress } = require("./address.controllers");

router.post("/", createAddress);

router.delete("/:addressId", deleteAddress);

module.exports = router;
