const jwt = require("jsonwebtoken");
const { expressjwt: exJwt } = require("express-jwt");

const bcrypt = require("bcrypt");
const Users = require("../models/registers");

//ค้นหา user ทั้งหมด
exports.listUser = async (req, res) => {
  try {
    const user = await Users.find({}).select("-password").exec();
    res.json(user);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด", error);
    res.status(400).json({ error: "Server isError" });
  }
};

//ค้นหา user แค่ 1  user
exports.readUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.find({ _id: id }).select("-password").exec();
    res.json(user);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด", error);
    res.status(400).json({ error: "Server isError" });
  }
};

// ค้นหา user 1 user และทำการ update
exports.updateUser = async (req, res) => {
  try {
    const { role, enabled, password } = req.body;

    // { new: true } คือ การให้แสดงค่าใหม่
    const user = await Users.findOneAndUpdate(
      { password, role, enabled },
      { new: true }
    ).exec();
    res.json(user);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด", error);
    res.status(400).json({ error: "Server isError" });
  }
};

// ค้นหา user 1 user และทำการ delete

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // { new: true } คือ การให้แสดงค่าใหม่
    await Users.findOneAndRemove({ _id: id }).exec();
    res.json({ message: "Delete User Success!!" });
  } catch (error) {
    console.log("เกิดข้อผิดพลาด", error);
    res.status(400).json({ error: "Server isError" });
  }
};

// ค้นหา user 1 user และทำการ update
exports.changStatus = async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.body.id },// ตัวที่ค้นหา
      { enabled: req.body.enabled } // ตัวที่ต้องการให้ update
    ).exec();
    res.json(user);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด", error);
    res.status(400).json({ error: "Server isError" });
  }
};
// ค้นหา user 1 user และทำการ update
exports.changeRole = async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.body.id },// ตัวที่ค้นหา
      { role: req.body.role } // ตัวที่ต้องการให้ update
    ).exec();
    res.json(user);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด", error);
    res.status(400).json({ error: "Server isError" });
  }
};