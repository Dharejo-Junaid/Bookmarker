const jwt  = require("jsonwebtoken");

const auth = async (req, res, next) => {

    const token = req.cookies.token;

    if(token) {
        jwt.verify(token, process.env.JWT_KEY, (err, result) => {
            if(! err) {
                
                req.id = result.id;

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

    else {
        if(req.originalUrl === "/") return next();
        else return res.redirect("/");
    }

    
}

module.exports.auth =  auth;