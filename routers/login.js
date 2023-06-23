const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { auth } = require("../middlewares/auth");
const { loginGetReq, loginPostReq } = require("../controllers/login");

router.use([
    cookieParser(),
    express.static("views"),
    bodyParser.urlencoded({extended: true})
]);

router.get("/", auth, loginGetReq);
router.post("/", loginPostReq);

module.exports = router;