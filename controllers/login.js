const loginGetReq = (req, res) => {

    const token = req.cookies.token;
    if(token) {
        res.redirect("/bookmarker");
    }

    res.status(200).render("index", {
        loginPageError: undefined
    });
}

const loginPostReq = (req, res) => {
    res.redirect("/bookmarker");
}

module.exports = { loginGetReq, loginPostReq };