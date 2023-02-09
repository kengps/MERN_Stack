const Blogs = require("../models/blogs");

const slugify = require("slugify");

//การสร้าง
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  const slug = slugify(title);

  //ตรวจสอบความถูกต้องของข้อมูล
  switch (true) {
    case !title:
      res.status(400).json({ error: "please input title" });
      break;
    case !content:
      res.status(400).json({ error: "please input content" });
      break;
  }

  //การบันทึกข้อมูล
  Blogs.create({title, content, author, slug}, (err, blogs) => {
    if (err) {
      res.status(400).json({ error: "ชื่อนี้ได้ถูกใช้งานแล้ว กรุณาตั้งชื่อใหม่" });
    }
    res.json(blogs);
  });

//   res.json({
//     data: { title, content, author, slug },
//   });
};
