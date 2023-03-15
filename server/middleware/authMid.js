const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res , next) =>{

   try {
     //การกำหนด token ที่มากับ headers
     let token = req.headers["authtoken"];
    // ตรวจสอบว่ามี token หรือไม่ถ้าไม่มีให้ทำอะไร ถ้ามีให้ทำอะไร
     if (!token) return res.status(400).send("Token Invalid!!");

     // ถ้ามี token จะให้ทำการแปลง token เป็น jwt 
     const decoded = jwt.verify(token, "jwtSecret");

     let { iat, exp, user } = decoded;

     next();
   } catch (error) {
        console.log(error);
   }



}