const express = require("express");

const {
  getReviews,
  getReviewByid,
  createReview,
  updateReviewByid,
  deleteReviewsId,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require("../controller/ReviewController");
const {
  getReviewValidator,
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/ReviewValidator");

const authController = require("../controller/AuthController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getReviews)
  .post(
    authController.protect,
    authController.allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );

router
  .route("/:id")
  .get(getReviewValidator, getReviewByid)
  .put(
    authController.protect,
    authController.allowedTo("user"),
    updateReviewValidator,
    updateReviewByid
  )
  .delete(
    authController.protect,
    authController.allowedTo("manager", "admin", "user"),
    deleteReviewValidator,
    deleteReviewsId
  );

module.exports = router;
