const express = require("express");
const router = express.Router();

let names = ["google", "apple", "chatgpt"];
let urls = ["www.google.com", "www.apple.com", "wwww.chatgpt.com"];

router.use(express.urlencoded({ extended:true }));

router.get("/", (req, res) => {
    res.status(200).render("./bookmarker", {
        names: names,
        urls: urls
    });
});

router.post("/", (req, res) => {
    
    const { name, url } = req.body;
    names.push(name);
    urls.push(url);

    res.redirect("/bookmarker");
});

module.exports = router;