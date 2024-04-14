const express = require("express");

const {
  getSubCategories,
  getSubCategoryByid,
  createSubCategory,
  updateSubCategoryByid,
  deleteSubCategoryByid,
  createFilterObj,
  setCategoryIdToBody,
} = require("../controller/subCategoryController");
const {
  createSubCategroyValidator,
  getSubCategroyValidator,
  updateSubCategroyValidator,
  deleteSubCategroyValidator,
} = require("../utils/subCategoryValidator");

const authController = require("../controller/AuthController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getSubCategories)
  .post(
    authController.protect,
    authController.allowedTo("manager", "admin"),
    setCategoryIdToBody,
    createSubCategroyValidator,
    createSubCategory
  );

router
  .route("/:id")
  .get(getSubCategroyValidator, getSubCategoryByid)
  .put(
    authController.protect,
    authController.allowedTo("manager", "admin"),
    updateSubCategroyValidator,
    updateSubCategoryByid
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteSubCategroyValidator,
    deleteSubCategoryByid
  );

module.exports = router;
