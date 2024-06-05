const Address = require("../models/Address");
const Location = require('../models/Location');

const createAddress = async (req, res, next) => {
    try {
        const newLocation = new Location({
            longitude: req.body.longitude,
            latitude: req.body.latitude
        });
        const savedLocation = await newLocation.save();

        const addressData = {
            ...req.body,
            location: savedLocation
        }
        const newAddress = await Address.create(addressData);
        res.status(201).json({ newAddress });
    } catch (err) {
        next(err)
    }
};

const deleteAddress = async (req, res, next) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.addressId);
        if (deletedAddress) {
            res.json({ message: "Address deleted successfully" });
        } else {
            res.status(404).json({ message: "Address not found" });
        }
    } catch (err) {
        next(err)
    }
};

module.exports = { createAddress, deleteAddress };
