const express = require("express");
const router = express.Router();
const { createTransport } = require("nodemailer");
const { hash, compare } = require("bcrypt");
const bodyParser = require("body-parser");
const User = require("../models/users");

require("dotenv").config();

// router.set("view engine", "ejs");
router.use(express.static("views"));
router.use(bodyParser.urlencoded({extended: true}));


router.get("/", (req, res) => {
    res.status(200).render("signup", {signupPageError: undefined});
});

router.post("/", async (req, res) => {

    const {name, email, password, confPassword} = req.body;

    if(password !== confPassword) {
        return res.status(200).render("signup", {
            signupPageError: "Password & confirm password are not same"
        })
    }

    // if user already exists in database;
    const data = await User.findOne({email: email});
    console.log(data);
    if(data) {
        return res.status(200).render("signup", {
            signupPageError: "Account already exists"
        });
    }

    const hashPassword = await hash(password, 10);
    const user = new User({
        name: name,
        email: email,
        hashPassword: hashPassword,
        isVerified: false
    });

    console.log(user);
    await user.save();

    // getting current user's Id;
    const userId = await User.findOne({
        email: email
    }, {_id: true});

    const userIdString = userId.toString().split(`"`)[1];

    const transporter = createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    // encrypting _id;
    const hashId = await hash(userIdString, 10);

    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: "Please verify you mail",
        html: `
            <p>Please click the link below to verify your account for book marker</p>
            <a target="_blank" href="http:/localhost:5000/verify/${encodeURIComponent(hashId)}">http://localhost:5000/verify/${encodeURIComponent(hashId)}</a>
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {

        if(err) {
            console.log(err);
            console.log(info);
            return res.status(200).render("signup", {
                signupPageError: "Issue in creating account"
            });

        } else {
            return res.status(200).send("Please verfiy you email");
        }
    });
});


module.exports = router;