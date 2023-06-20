const express = require("express");
const router = express.Router();
const { createTransport } = require("nodemailer");
const { hash, compare } = require("bcrypt");
const bodyParser = require("body-parser");

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

    // step # get user from database;
    let user = {email: "junaid@gmail.com",passwordHash: "$2b$10$CvUffTF92ZYJOvP5kc53nengtq0BYienvIt37UQZ8N4DCPqULAiv."};

    if(email === user.email) {
        return res.status(200).render("signup", {
            signupPageError: "Account already exists"
        });
    }

    // step # store data into database with validated = false;

    const transporter = createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    // encrypting mail;
    const hashEmail = await hash(email, 10);

    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: "Please verify you mail",
        html: `
            <p>Please click the link below to verify your account for book marker</p>
            <a target="_blank" href="http:/localhost:5000/verify/${hashEmail}">http://localhost:5000/verify/${hashEmail}</a>
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {

            // step # delete data for current user from database;

            return res.status(200).render("signup", {
                signupPageError: "Issue in creating account"
            });

        } else {
            return res.status(200).send("Please verfiy you email");
        }
    });
});


module.exports = router;