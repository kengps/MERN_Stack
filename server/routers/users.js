const express = require("express");
const {
  listUser,
  readUser,
  updatePassword,
  deleteUser,
  changStatus,
  changeRole
} = require("../controllers/usersContrllor");
const router = express.Router();

const { authMiddleware ,checkAdmin} = require("../middleware/authMid");



router.get('/listuser' ,authMiddleware ,checkAdmin, listUser)
router.get('/listuser/:id' , readUser)
router.put('/listuser/:id' , updatePassword)

router.delete('/listuser/:id' , deleteUser)


router.post("/change-status", authMiddleware ,checkAdmin, changStatus);
router.post("/change-role", authMiddleware ,checkAdmin, changeRole);


module.exports = router;
