const asyncHandler = require('express-async-handler');

const User = require('../models/UserModel');

// @desc    Add address to addresses
// @route   POST /api/v1/addresses
// @access  Protected/User
exports.addAddress = asyncHandler(async (req, res, next) => {
  // $addToSet => add addressId to addresses array if addresses not exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'successfully added your Address.',
    data: user.addresses,
  });
});

// @desc    Remove product from addresses
// @route   DELETE /api/v1/addresses/:addressId
// @access  Protected/User
exports.removeAddress = asyncHandler(async (req, res, next) => {
    // $pull => remove addressId from addresses array if addresses exist
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { addresses: { _id: req.params.addressId } },
      },
      { new: true }
    );
  
    res.status(200).json({
      status: 'success',
      message: 'successfully removed your address .',
      data: user.addresses,
    });
  });


// @desc    Get logged user addresses
// @route   GET /api/v1/addresses
// @access  Protected/User
exports.getLoggedUserAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('addresses');
  
    res.status(200).json({
      status: 'success',
      results: user.addresses.length,
      data: user.addresses,
    });
  });