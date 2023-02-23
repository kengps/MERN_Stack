const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    //ข้อมูล username , password
  const { username, password } = req.body;

  if (password === process.env.password) {
    //login เข้าสู่ระบบ
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({token, username});
  } else {
    res.status(400).json({error: "รหัสผ่านไม่ถูกต้อง!",});
  }
};
