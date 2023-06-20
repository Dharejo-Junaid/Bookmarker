const express = require("express");
const router = express.Router();

const { compare } = require("bcrypt");

router.get("/:hashEmail", (req, res) => {
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


module.exports = router;