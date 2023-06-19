const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { hash, compare } = require("bcrypt");
const { createTransport } = require("nodemailer");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.status(200).render("index", {
        loginPageError: undefined
    });
});

app.post("/", async (req, res) => {
    const {email, password} = req.body;

    // get user from database
    let user = {email: "junaid@gmail.com",passwordHash: "$2b$10$CvUffTF92ZYJOvP5kc53nengtq0BYienvIt37UQZ8N4DCPqULAiv."};

    if(email === user.email) {

        compare(password, user.passwordHash, (err, same) => {
            if(same) {
                res.send("Access granted");
            }

            else {
                res.status(200).render("index", {
                    loginPageError: "Wrong password"
                })
            }
        });

    } else {
        res.status(200).render("index", {
            loginPageError: `Email: ${email} does not exist`
        });
    }
});

app.get("/signup", (req, res) => {
    res.status(200).render("signup", {signupPageError: undefined});
});

app.post("/signup", async (req, res) => {

    const {name, email, password, confPassword} = req.body;
    console.log(name, email, password, confPassword);

    // get user from database
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
            <p>Please verify your account for book marker</p>
            <a target="_blank" href="http:/localhost:5000/verify/${hashEmail}">Verify</a>
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {

            // step # delete data for current user from database;

            res.status(200).render("signup", {
                signupPageError: "Issue in creating account"
            });
        }

        else {
            res.status(200).send("Please verfiy you email");
        }
    });
});

app.get("/verify/:hashEmail", (req, res) => {
    const { hashEmail } = req.params;
    console.log(hashEmail);

    compare("junaidali.100190@gmail.com", hashEmail, (err, same) => {
        if(same) {
            res.send("Mail is verfied");
        } else {
            res.send("Error");
        }
    })
});



app.listen(5000, () => {
    console.log("Server is listening at 5000");
});


/*

    compare(password, passHash, (err, same) => {
        if(err) {
            console.log(err);
        }

        else {
            console.log(same);
        }
    });

*/


/*

    const passHash = await hash(password, 10);
    console.log(passHash);

*/