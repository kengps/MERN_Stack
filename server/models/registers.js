const mongoose = require("mongoose");

const userRegister = mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
    password: {
      type: {},
      required: true,
    },
    confirmpass: {
      type: String,
      required: true,
    },
    // slug: {
    //   type: String,
    //   lowercase: true, // หากมีการพิมพ์ภาษาอังกฤษไม่ว่าจะพิมพ์ใหญ๋หรือเล็กก็จะทำให้เป็นตัวพิมพ์เล็กทั้งหมด
    //   unique: true, // ห้ามตั้งชื่อซ้ำกัน
    // },
  },
  { timestamps: true }
); //ทำการจัดเก็บข้อมูลช่วงเวลาในการสร้างหรือแก้ไข

module.exports = mongoose.model("Users", userRegister);
