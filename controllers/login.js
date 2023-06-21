const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { compare } = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
    let user = {email: "junaid@gmail.com",passwordHash: "$2b$10$CvUffTF92ZYJOvP5kc53nengtq0BYienvIt37UQZ8N4DCPqULAiv."};

    if(email === user.email) {

        compare(password, user.passwordHash, (err, same) => {
            if(same) {

                const token = jwt.sign( { email }, process.env.JWT_SECRET, {expiresIn:"7d"});

                res.cookie('token', token, { httpOnly: true, secure: true });
                res.redirect("/bookmarker");
            
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