const express = require("express");

const router = express.Router();
const { register ,register2 } = require("../controllers/registerController");





router.post("/register", register2);
router.post("/register2", register2);


module.exports = router