const jwt = require("jsonwebtoken");
const User = require("../models/users");

const verifyUser = async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if(! user) {
        res.send("Authentication fail");
    }

    else {
        await User.findOneAndUpdate({_id: userId}, {isVerified: true});

        const token = jwt.sign( 
            { id: userId }, 
            process.env.JWT_KEY, 
            { expiresIn:"3m" }
        );

        res.cookie('token', token, { httpOnly: true, secure: true }).redirect("/bookmarker");
    }
}

module.exports = verifyUser;