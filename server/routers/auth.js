const express = require("express");
const router = express.Router();
const { login, logged } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMid");

router.post("/login", login);
router.post("/logged", logged);




router.get("/1", authMiddleware, (req, res) => {
  res.send("1");
});

router.get("/2", (req, res) => {
  res.send("2");
});



module.exports = router;
