const express = require("express");
const router = express.Router();
const verifyUser = require("../controllers/verify");

router.get("/:userId", verifyUser);
module.exports = router;