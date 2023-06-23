const userBookmarks = [
    {
        name: "google",
        url: "ghvjhbsjfmajksrnkfdsbrkjnskn,aklnmrkl"
    },

    {
        name: "apple",
        url: "ghvjhbsjfmajksrnkfdsbrkjnskn,aklnmrkl"
    },

    {
        name: "facebook",
        url: "ghvjhbsjfmajksrnkfdsbrkjnskn,aklnmrkl"
    }
]

const getAllBookmarks = (req, res) => {
    res.status(200).render("./bookmarker", {
        userBookmarks: userBookmarks
    });
}

const addNewBookmark = (req, res) => {
    const { name, url } = req.body;

    // Add bookmarks to database;
    userBookmarks.push({
        name: name,
        url: url
    });
    res.redirect("/bookmarker");
}

module.exports = {getAllBookmarks, addNewBookmark};