const express = require("express");
const router = express.Router();
const { login, logged, currentUser } = require("../controllers/authController");
const { authMiddleware ,checkAdmin} = require("../middleware/authMid");

router.post("/login", login);
router.post("/logged", logged);


//authMiddleware ตรวจสอบ token หากมีก็ให้ไปต่อ currentUser
router.post("/current-user",authMiddleware, currentUser);
router.post("/current-admin",authMiddleware,checkAdmin , currentUser);




module.exports = router;
