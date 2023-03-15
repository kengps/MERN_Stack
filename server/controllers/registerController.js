const registers = require('../models/registers');




exports.register =(req,res) =>{
  const { username, password  } = req.body;

  switch (true) {
    case !username:
      res.status(400).json({ error: "กรุณากรอกข้อมูล username" });
      break;
    case !password:
      res.status(400).json({ error: "กรุณากรอกข้อมูล password" });
      break;
  }
    //การบันทึกข้อมูล จะใช้คำสั่ง create และตามด่วย document
  registers.create({username ,password},(err, register) => {
    if(err) {
        res.status(400).json({ error: err });
    }
    res.json(register)

  })
//   res.json({
//       data: {username , password , confirmpass}
//   })
}