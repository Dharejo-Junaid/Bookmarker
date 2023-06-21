const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { compare } = require("bcrypt");

router.use(express.static("views"));
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", (req, res) => {
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