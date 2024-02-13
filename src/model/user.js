const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    userName:{
      type:String,
    },
    email:{
      type:String
    },
    password:{
      type:String
    },
    mobile:{
      type:Number,
      required: false,
    },
   age:{
    type:Number
   },
   hash:{
    type:String
   },
   salt:{
    type:String
   }
  }
);

const User = mongoose.model("User", userSchema);

module.exports  = User