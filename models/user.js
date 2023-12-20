//Define user model for authentication using pasportlocalmongoose library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");
const router = require("../routes/listing");
const User=require("../models/user.js");
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
});

userSchema.plugin(passportLocalMongoose);//automatically create username,salt,hash password for us
module.exports=mongoose.model("User",userSchema);

