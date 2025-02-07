const express = require("express");

const {
  getBanner,
  getBannerByid,
  createBanner,
  UpdateBannerByid,
  deleteBannerByid,
  uploadBannerImage,
  resizeImage,
} = require("../controller/BannerController");

// const {
//   getCategroyValidator,
//   createCategroyValidator,
//   updateCategroyValidator,
//   deleteCategroyValidator,
// } = require("../utils/categoryValidator");

const authController = require("../controller/AuthController");


const router = express.Router();



router
  .route("/")
  .get(getBanner)
  .post(
    authController.protect,
    authController.allowedTo("manager", "admin"),
    uploadBannerImage,
    resizeImage,
    createBanner
  );

router
  .route("/:id")
  .get(getBannerByid)
  .put(
    authController.protect,
    authController.allowedTo("manager", "admin"),
    uploadBannerImage,
    resizeImage,
    UpdateBannerByid
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteBannerByid
  );

module.exports = router;
