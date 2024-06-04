const Address = require("../models/Address");

const createAddress = async (req, res, next) => {
    try {
        const newAddress = await Address.create(req.body);
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
