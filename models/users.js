const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {type:String, trim:true},
    email: {type:String, trim:true},
    hashPassword: {type:String},
    isVerified: {type:Boolean, default:false}
});

module.exports = mongoose.model("User", User);