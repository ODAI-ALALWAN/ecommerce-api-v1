const mongoose = require('mongoose');
const Product = require("./ProductModel")

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, 'Min ratings value is 1.0'],
      max: [5, 'Max ratings value is 5.0'],
      required: [true, 'review ratings required'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to user'],
    },
    // parent reference (one to many)
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to product'],
    },
  },
  { timestamps: true }
);


reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name' });
  next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId) {
  const static = await this.aggregate([
    {
      $match : {product : productId}
    },
    {
      $group : {
        _id : 'product',
        avgRatings : { $avg : '$ratings'},
        ratingsQuantity: { $sum: 1 },
      }
    }
  ])

  if(static.length > 0){
    await Product.findByIdAndUpdate(productId , {
      ratingsAverage : Math.round(static[0].avgRatings),
      ratingsQuantity : static[0].ratingsQuantity
    })
  }else {
    await Product.findByIdAndUpdate(productId , {
      ratingsAverage : 0,
      ratingsQuantity : 0 ,
    })
  }
  
}

reviewSchema.post('save', async function (){
  await this.constructor.calcAverageRatingsAndQuantity(this.product)
})

reviewSchema.post('remove', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

module.exports = mongoose.model('Review' , reviewSchema)