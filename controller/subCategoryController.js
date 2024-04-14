
const  SubCategoryModels  = require('../models/subCategoryModel')

const factory= require('./handlerFactory')


exports.setCategoryIdToBody = (req, res , next ) => {
    // Nested route create
    if (!req.body.categroy) req.body.category = req.params.categoryId
    next()
}

//     // Nested route get
exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) filterObject = { category: req.params.categoryId };
    req.filterObj = filterObject;
    next();
};

// @desc    Get list of SubCategories 
// @route   Get /api/v1/subcategories
// @access  Public
exports.getSubCategories =factory.getAll(SubCategoryModels)

// @desc    GET subcategory by ID
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategoryByid = factory.getOneById(SubCategoryModels)


// @desc    Post create subcategories 
// @route   Post /api/v1/subcategories
// @access  Priavte
exports.createSubCategory = factory.createOne(SubCategoryModels)


// @desc    update Subcategory by ID
// @route   put /api/v1/categories/:id
// @access  Priavte
exports.updateSubCategoryByid = factory.updateOne(SubCategoryModels)


exports.deleteSubCategoryByid = factory.deleteOne(SubCategoryModels)