const { createTransport } = require("nodemailer");
const { hash } = require("bcrypt");
const User = require("../models/users");

const signupGetRequest = (req, res) => {
    res.status(200).render("signup", {signupPageError: undefined});
}

const signupPostRequest = async (req, res) => {

    const {name, email, password, confPassword} = req.body;

    if(password !== confPassword) {
        return res.status(200).render("signup", {
            signupPageError: "Password & confirm password are not same"
        })
    }

    console.log(await User.find({}));
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
    sendMailTo(userIdString, email, res);
}

const sendMailTo = (userId, toEmail, res) => {
    const transporter = createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.GMAIL,
        to: toEmail,
        subject: "Please verify you mail",
        html: `
            <p>Please click the link below to verify your account for book marker</p>
            <a target="_blank" href="http:/localhost:5000/verify/${userId}">http://localhost:5000/verify/${userId}</a>
        `
    };

    transporter.sendMail(mailOptions, async (err, info) => {

        if(err) {
            await User.findByIdAndDelete(userId);
            return res.status(200).render("signup", {
                signupPageError: "Issue in creating account"
            });

        } else {
            return res.status(200).send("Please verfiy you email");
        }
    });
}

module.exports = { signupGetRequest, signupPostRequest };