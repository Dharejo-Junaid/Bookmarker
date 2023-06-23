const jwt  = require("jsonwebtoken");

const auth = async (req, res, next) => {

    const token = req.cookies.token;

    if(token) {
        jwt.verify(token, process.env.JWT_KEY, (err, result) => {
            if(! err) {
                
                if(req.originalUrl === "/bookmarker")
                    return next();
                else 
                    return res.redirect("/bookmarker");    
            }

            else {
                if(req.originalUrl === "/") return next();
                else return res.redirect("/");
            }
        });
    }
}

module.exports = auth;