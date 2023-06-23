const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { compare, hash } = require("bcrypt");
const User = require("../models/users");

router.get("/:hashId", async (req, res) => {
    let { hashId } = req.params;
    hashId = decodeURIComponent(hashId);

    console.log(hashId);

    const unVerifiedusers = await User.find({isVerified: false});

    console.log("UnVerfied: ", unVerifiedusers);
    for(let user of unVerifiedusers) {

        let userId = user["_id"].toString().split(`"`)[1];

        compare(userId, hashId, (err, same) => {
            if(same) {

                module.exports.user = user;

                if(! user.isVerified) {
                    return res.status(200).render("index", {
                        loginPageError: "Please verify your account first"
                    });
                }

                const token = jwt.sign( 
                    { id: userId }, 
                    process.env.JWT_SECRET, 
                    { expiresIn:"3m" }
                );

                res.cookie('token', token, { httpOnly: true, secure: true }).redirect("/bookmarker");
            } else {
                console.log(err);
            }
        });
    }

    res.send("Authentication fail");
});


module.exports.verfiy = router;