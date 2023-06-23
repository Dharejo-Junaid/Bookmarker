const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { compare } = require("bcrypt");

const loginGetReq = (req, res) => {

    res.status(200).render("index", {
        loginPageError: undefined
    });
}

const loginPostReq = async (req, res) => {

    const { email, password } = req.body;

    // get user from database
    const user = await User.findOne({email: email});

    if(! user) {

        return res.status(200).render("index", {
            loginPageError: `Email: ${email} does not exist`
        });
    }

    compare(password, user.hashPassword, (err, same) => {
        if(same) {

            if(! user.isVerified) {
                return res.status(200).render("index", {
                    loginPageError: "Please verify your account first"
                });
            }

            const token = jwt.sign( 
                { id: user["_id"].toString().split(`"`)[1] }, 
                process.env.JWT_KEY, 
                {expiresIn:"3m"}
            );

            
            return res.cookie('token', token, { httpOnly: true, secure: true }).redirect("/bookmarker");

        
        } else {
            res.status(200).render("index", {
                loginPageError: "Wrong password"
            });
        }
    });
}

module.exports = { loginGetReq, loginPostReq };