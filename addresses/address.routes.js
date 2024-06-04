const express = require("express");
const router = express.Router();
const { createAddress, deleteAddress } = require("./address.controllers");

// Create Address
router.post("/", createAddress);

// Delete Address by ID
router.delete("/:addressId", deleteAddress);

module.exports = router;
