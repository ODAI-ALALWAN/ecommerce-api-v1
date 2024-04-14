

const ReviewModel = require("../models/reviewModel");
const factory = require("./handlerFactory");


//     // Nested route get
exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.productId) filterObject = { product: req.params.productId };
    req.filterObj = filterObject;
    next();
};



// @desc    Get list of Reviews
// @route   Get /api/v1/Reviews
// @access  Public
exports.getReviews = factory.getAll(ReviewModel)

// @desc    GET Review by ID
// @route   GET /api/v1/Reviews/:id
// @access  Public
exports.getReviewByid = factory.getOneById(ReviewModel)


exports.setProductIdAndUserIdToBody = (req, res , next ) => {
    // Nested route create
    if (!req.body.product) req.body.product = req.params.productId
    if(!req.body.user) req.body.user = req.user._id
    next()
}


// @desc    Post create Reviews
// @route   Post /api/v1/Reviews
// @access  Priavte /
exports.createReview = factory.createOne(ReviewModel)

// @desc    update Reviews by ID
// @route   put /api/v1/Reviews/:id
// @access  Priavte
exports.updateReviewByid = factory.updateOne(ReviewModel)

// @desc    delete Reviews by ID
// @route   put /api/v1/Reviews/:id
// @access  Priavte
exports.deleteReviewsId = factory.deleteOne(ReviewModel);
