
const sharp = require('sharp')
const asyncHandler = require("express-async-handler");

const factory = require("./handlerFactory");

const { uploadSingleImage } = require("../middlewares/uoloadImagemiddleware");
const BannerModel = require('../models/BannerModel');

// middleware uplod image
exports.uploadBannerImage = uploadSingleImage("image");

// resize middleware image
exports.resizeImage = asyncHandler( async (req, res, next) => {

    const filename = `banner-${Math.round(Math.random() * 1e9)}-${Date.now()}.jpg`;

    if(req.file){
        await sharp(req.file.buffer)
        // .resize(600 , 600)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`uploads/banner/${filename}`)
    
        req.body.image = filename
    
    }
    next()
})



// @desc    Get list of Banners
// @route   Get /api/v1/banner
// @access  Public
exports.getBanner = factory.getAll(BannerModel);
// @desc    GET Banner by ID
// @route   GET /api/v1/banner/:id
// @access  Public
exports.getBannerByid = factory.getOneById(BannerModel);
// @desc    Post create Banners
// @route   Post /api/v1/banner
// @access  Priavte
exports.createBanner = factory.createOne(BannerModel);
// @desc    update Banner by ID
// @route   put /api/v1/banner/:id
// @access  Priavte
exports.UpdateBannerByid = factory.updateOne(BannerModel);
// @desc    update Banner by ID
// @route   put /api/v1/banner/:id
// @access  Priavte
exports.deleteBannerByid = factory.deleteOne(BannerModel);
