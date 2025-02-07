
const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required : true
    },
    image : String
},{ timestamps: true })

//// Mongoose query middleware
BannerSchema.pre(/^find/ , function (next){
  this.populate({
    path:'productId',
    select:'title _id -category'
  })
  next()
})

const setImageUrl = (doc) => {
    const baseUrl = process.env.BASE_URL;
    if (doc.image) {
      if (!doc.image.startsWith(baseUrl)) {
        const imageUrl = `${baseUrl}/banner/${doc.image}`;
        doc.image = imageUrl;
      }
}};


// return url-Image after save image in database 

// findAll , findOne , update
BannerSchema.post("init", (doc) => {
  setImageUrl(doc)
});

// Create
BannerSchema.post("save", (doc) => {
  setImageUrl(doc)
});
module.exports = mongoose.model('banners',BannerSchema)