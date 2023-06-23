const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { compare } = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

router.use(cookieParser());
router.use(express.static("views"));
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", (req, res) => {

    const token = req.cookies.token;
    if(token) {
        res.redirect("/bookmarker");
    }

    res.status(200).render("index", {
        loginPageError: undefined
    });
});

router.post("/", async (req, res) => {
    const {email, password} = req.body;

    // get user from database
    const user = await User.findOne({email: email});

    if(email == user.email) {

        compare(password, user.hashPassword, (err, same) => {
            if(same) {

                if(! user.isVerified) {
                    return res.status(200).render("index", {
                        loginPageError: "Please verify your account first"
                    });
                }

                const token = jwt.sign( 
                    { id: user["_id"].toString().split(`"`)[1] }, 
                    process.env.JWT_SECRET, 
                    {expiresIn:"3m"}
                );

                res.cookie('token', token, { httpOnly: true, secure: true }).redirect("/bookmarker");
            
            } else {
                res.status(200).render("index", {
                    loginPageError: "Wrong password"
                });
            }
        });
    }

    else {
        res.status(200).render("index", {
            loginPageError: `Email: ${email} does not exist`
        });
    }
});



module.exports = router;