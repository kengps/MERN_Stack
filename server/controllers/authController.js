const jwt = require("jsonwebtoken");
const { expressjwt: exJwt } = require("express-jwt");

const bcrypt = require("bcryptjs");
const Users = require("../models/registers");

exports.login = (req, res) => {
  //ข้อมูล username , password
  const { username, password } = req.body;

  if (password === process.env.password) {
    //login เข้าสู่ระบบ
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d", // กำหนดเวลาหมดอายุ
    });
    return res.json({ token, username });
  } else {
    res.status(400).json({ error: "รหัสผ่านไม่ถูกต้อง!" });
  }
};

//ตรวจสอบ Token
exports.requireLogin = exJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// exports.loginn = () => {
//   expressJWT({
//     seclet: process.env.JWT_SECRET,
//     algorithms: ['HS256'],
//     userProperty: 'auth'
//   });
// }

exports.currentUser = async (req, res) => {
  try {
    console.log("ตรวจสอบ ", req.user);
    const user = await Users.findOne({ username: req.user.username })
      .select("-password")
      .exec();
    res.send(user);
    console.log("userController ", user);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด", error);
    res.status(400).json({ error: "Server isError" });
  }
};

//login แบบ การสมัครและดึงข้อมูลมาจากฐานข้อมูล

exports.logged = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("password " + password);
    // ค้้นหาและทำการอัปเดตว่า user นี้เข้ามาล่าสุดตอนไหน
    const user = await Users.findOneAndUpdate({ username }, { new: true });
    console.log(user.password);

    if (user && user.enabled) {
      // {//check password
      // // const isMatch = await bcrypt.compare(password, user.password);
      // // const match = await bcrypt.compare(password, user.password);

      // // console.log('Result '+isMatch);
      // // console.log('Result '+isMatch);
      // // console.log("Result " + user.password);
      // //console.log('Result '+ isMatch);
      // // if(!isMatch){
      //   //   return  res.status(400).json({message: "pass invalid"})
      //   // }
      // }
      // check ว่าpass ตรงกันหรือไม่ หรือไม่

      if (password !== user.password)
        return res.status(400).json({ error: "Password invalid!!" });
      // payLoad
      const payLoad = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      // Token
      const token = jwt.sign(payLoad, "jwtSecret", { expiresIn: "1d" });

      return res.json({ token, payLoad });
    } else {
      res.status(400).json({ error: "User is not Found!!" });
    }
  } catch (error) {
    res.status(400).json({ error: "Server isError" });
  }
};


exports.logged2 = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("password " + password);
    // ค้้นหาและทำการอัปเดตว่า user นี้เข้ามาล่าสุดตอนไหน
    const user = await Users.findOneAndUpdate({ username }, { new: true });
    console.log('passแบบ Saut',user.password);

    if (user && user.enabled) {
      
        //check password ระหว่าง password ปกติ และ password ที่มีการใส่รหัส
        const isMatch = await bcrypt.compare(password, user.password);
         console.log('pass',isMatch);
      //   //const match = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "pass invalid" });
        }
      
      const payLoad = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      // // Token
      const token = jwt.sign(payLoad, "jwtSecret", { expiresIn: "1d" });

      return res.json({ token, payLoad });
      // res.send('hello')
    } else {
      res.status(400).json({ error: "User is not Found!!" });
    }
  } catch (error) {
    res.status(400).json({ error: "Server isError" });
  }
};
