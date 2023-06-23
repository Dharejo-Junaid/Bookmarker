const User = require("../models/users");

let userBookmarks = [];

const getAllBookmarks = async (req, res) => {
    
    userBookmarks = (await User.findById(req.id, 
        {_id: false, bookmarks: true})).bookmarks;

    res.status(200).render("./bookmarker", {
        userBookmarks
    });
}

const addNewBookmark = async (req, res) => {
    const { name, url } = req.body;

    // Add bookmarks to database;
    await User.findByIdAndUpdate(req.id, {$push: {bookmarks: {
        name: name, url: url
    }}});
    res.redirect("/bookmarker");
}

module.exports = {getAllBookmarks, addNewBookmark};