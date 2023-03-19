const express = require("express");
const {
  listUser,
  readUser,
  updateUser,
  deleteUser,
  changStatus,
} = require("../controllers/usersContrllor");
const router = express.Router();

const { authMiddleware ,checkAdmin} = require("../middleware/authMid");



router.get('/listuser' ,authMiddleware ,checkAdmin, listUser)
router.get('/listuser/:id' , readUser)
router.put('/listuser/:id' , updateUser)

router.delete('/listuser/:id' , deleteUser)


router.post("/change-status", authMiddleware ,checkAdmin, changStatus);

module.exports = router;
