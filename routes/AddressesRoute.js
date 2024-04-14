const express = require("express");

const {
addAddress,removeAddress,getLoggedUserAddress
} = require("../controller/AddressesController");

const authController = require("../controller/AuthController");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.route("/").post(addAddress).get(getLoggedUserAddress);

router.delete("/:addressId", removeAddress);

module.exports = router;
