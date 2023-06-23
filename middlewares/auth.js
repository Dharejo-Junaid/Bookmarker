const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { compare } = require("bcrypt");
const bodyParser = require("body-parser");

const auth = async (req, res, next) => {

    bodyParser.urlencoded({extended: true});

    console.log(req.body);
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

                res.cookie('token', token, { httpOnly: true, secure: true });
                next();
            
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
}

module.exports = auth;