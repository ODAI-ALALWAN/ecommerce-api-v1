const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true , 'name required'],
        minlength : [2 , 'Too short user name'],
        maxlength : [32 , 'Too long uers name'],
    },
    slug : {
        type : String ,
        lowercase : true
    },
    email : {
        type : String,
        required : [true , 'email required'],
        unique : true,
        lowercase : true
    },
    phone : String,
    profileImage : String,
    password : {
        type : String ,
        required : [true , 'password required'],
        minlength : [6 , 'Too short password']
    },
    passwordChangedAt : Date , 
    passwordResetCode : String,
    passwordResetExpires : Date,
    passwordResetVerified : Boolean,
    isAdmin : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        enum : ['user', 'manager' ,'admin'],
        default : 'user'
    },
    active:{
      type : Boolean,
      default : true
    },
     // child reference (one to many)
     wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
    
}, {timestamps : true})

const setImageUrl = (doc) => {
    if (doc.profileImage) {
      const imageUrl = `${process.env.BASE_URL}/users/${doc.profileImage}`;
      doc.profileImage = imageUrl
    }}
  
  // return url-Image after save image in database 
  
  // findAll , findOne , update
  UserSchema.post("init", (doc) => {
    setImageUrl(doc)
  });
  // Create
  UserSchema.post("save", (doc) => {
    setImageUrl(doc)
  });
  

UserSchema.pre('save' , async function (next) {
  if(!this.isModified('password')) return next()

  // Hashing user password

  this.password = await bcrypt.hash(this.password , 10)
  next()
})




module.exports = mongoose.model('User' , UserSchema)