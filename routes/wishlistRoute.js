const express = require("express");

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../controller/wishlistController");

const authController = require("../controller/AuthController");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.route("/").post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete("/:productId", removeProductFromWishlist);

module.exports = router;
