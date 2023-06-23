const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {getAllBookmarks, addNewBookmark} = require("../controllers/bookmarker");

router.use(express.urlencoded({ extended:true }));

// router.use(auth);
router.get("/", getAllBookmarks);
router.post("/", addNewBookmark);

module.exports = router;