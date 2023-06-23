const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {type:String, trim:true},
    email: {type:String, trim:true},
    hashPassword: {type:String},
    isVerified: {type:Boolean}
});

module.exports = mongoose.model("User", User);