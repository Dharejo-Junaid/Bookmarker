const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { signupGetRequest, signupPostRequest } = require("../controllers/signup");

require("dotenv").config();

router.use(express.static("views"));
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", signupGetRequest);
router.post("/", signupPostRequest);
module.exports = router;