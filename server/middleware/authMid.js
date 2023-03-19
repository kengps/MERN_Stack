const jwt = require("jsonwebtoken");

const Users = require("../models/registers");
exports.authMiddleware = (req, res, next) => {
  try {
    //การกำหนด token ที่มากับ headers
    let token = req.headers["authtoken"];

    // ตรวจสอบว่ามี token หรือไม่ถ้าไม่มีให้ทำอะไร ถ้ามีให้ทำอะไร
    if (!token) return res.status(400).send("Token Invalid!!");

    // ถ้ามี token จะให้ทำการแปลง token เป็น jwt
    const decoded = jwt.verify(token, "jwtSecret");

    console.log(decoded);
    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Admin Access denied");
  }
};

exports.checkAdmin = async (req, res, next) => {
  try {
    const { username } = req.user;

    const adminUser = await Users.findOne({ username }).exec();

    if (adminUser.role !== "admin") {
      res.status(400).send("Admin Access denied");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Admin Access denied");
  }
};
