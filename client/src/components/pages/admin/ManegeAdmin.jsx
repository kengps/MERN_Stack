import React, { useEffect, useState } from "react";
import NavbarAdminComponent from "../../../layout/NavbarAdminComponent";
import {
  changStatus,
  listUsers,
  changRole,
  deleteUser,
  resetPassword,
} from "../../api/user";
import { useSelector } from "react-redux";
import Sweet from "sweetalert2";

import { Switch, Select, Tag, Modal } from "antd";
import Item from "antd/es/list/Item";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment/min/moment-with-locales";
import InputGroup from "react-bootstrap/InputGroup";

const ManegeAdmin = () => {
  // state สำหรับการจัดเก็บข้อมูล
  const [data, setData] = useState([]);

  //ดึงข้อมูล State จาก storeRedux
  const { user } = useSelector((state) => ({ ...state }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  // function Modal เมื่อกดที่ปุ่มก็จะโชว์หน้าต่างขึ้นมา
  // โดยจะรับ id เข้ามา
  const showModal = (id) => {
    console.log(id);
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };
  // เมื่อกด ok จะให้ทำการยิง api เพื่อทำการ update รหัสผ่าน
  const handleOk = () => {
    setIsModalOpen(false);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //function การพิมพ์ โดยรับ id และ password มาจาก e
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log("user", user);
  // สร้าง function สำหรับการยิง api แต่เราได้สร้าง function แยกไว้ในตัวแปร lisetUsers
  const loadUser = (authtoken) => {
    listUsers(authtoken)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log("อะไรนะ", err.data);
      });
  };

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    changStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadUser(user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ให้  useEffect ทำงาน function  loadUser โดยรับค่า user.token มาด้วย
  useEffect(() => {
    loadUser(user.token);
  }, []);
  //กำหนดตัวแปร เพื่อการวนวูป
  const roleData = ["admin", "user"];

  // function สำหรับการแก้ไข role เมื่อมีการเปลี่ยนแปลงข้อมูลตรง select สามารถ copy จากhandleOnchange ได้เลยแต่ต้องเปลี่ยนชื่อ function  เอง
  const handleOnchangeRole = (e, id) => {
    const value = {
      id: id,
      role: e,
    };
    console.log(value);
    //changRole คือ function การยิง API
    changRole(user.token, value)
      .then((res) => {
        console.log(res);
        loadUser(user.token);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };

  // function สำหรับการ ยืนยันการลบข้อมูล จะรับแค่ id มาอย่างเดียว
  const handleDelete = async (id) => {
    // หากกดปุ่ม จะให้ปุ่มยืนยันการลบขึ้นมา
    try {
      const result = await Sweet.fire({
        title: "คุณต้องการลบบทความหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      console.log("ยืนยันการลบ", result);
      //ถ้ากดปุ่ม OK หรือ ตกลง
      if (result.isConfirmed) {
        //ส่ง request ไปที่  api เพื่อลบข้อมูล

        confirmDelete(id); //หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete
      }
    } catch (error) {
      console.log(err);
    }
  };
  //function confirmDelete จะทำการเรียก api สำหรับการลบข้อมูล โดยจะรับ user.token และ id มา หากลบเสร็จแล้วจะให้แจ้ง alert
  const confirmDelete = (id) => {
    deleteUser(user.token, id)
      .then((res) => {
        Sweet.fire("แจ้งเตือน", res.data.message, "success");
        console.log("การลบ", res);

        loadUser(user.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 ">
          <NavbarAdminComponent />
        </div>
        <div className="col text-center" >
          {/* {state.map((state, index) => {
            <h1>{state.username}</h1>;
          })} */}
          <h1>ManegeAdmin</h1>
          <div className="container m-md-5 text-center" style={{ position: "fixed", display: 'block' }}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col">ActiveAt</th>
                  <th scope="col">Setting</th>
                </tr>
              </thead>
              <tbody>
                {/* //ทำการวน loop โดยใช้การ map โดยน้ำ state data มา */}
                {data.map((item, index) => (
                  //กำหนดคีย์
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.username}</td>
                    <td>
                      {/* การทำเมนู Select โดยใช้ antd ข้างในต้องมี Select.Option ชั้นในด้วย
                     โดยใน onChange เราจะรับ function มาด้วย ทำคล้ายๆ กับ Status */}
                      <Select
                        style={{ width: "75%" }}
                        value={item.role}
                        onChange={(e) => handleOnchangeRole(e, item._id)}
                      >
                        {/* Select.Option  เราจะทำการ map roleData ที่เรากำหนดโดยมี admin และ user 
                       หลังจาก map แล้ว ให้ทำการวน Select.Option  ไปโดยจะมีการกำหนดสีให้กับค่า value ของ admin และ user 
                     โดยใช้ Tag เป็นตัวกำหนดสี */}

                        {roleData.map((item, index) => (
                          <Select.Option value={item} key={index}>
                            {item == "admin" ? (
                              <Tag color="blue">{item}</Tag>
                            ) : (
                              <Tag color="gold">{item}</Tag>
                            )}
                          </Select.Option>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <Switch
                        checked={item.enabled}
                        onChange={(e) => handleOnchange(e, item._id)}
                      />
                    </td>
                    <td>
                      {moment(item.createdAt).locale("th").format("lll")} น.
                    </td>
                    <td>
                      {moment(item.updatedAt)
                        .locale("th")
                        .startOf(item.updatedAt)
                        .fromNow()}
                    </td>
                    <td>
                      <DeleteOutlined onClick={() => handleDelete(item._id)} />
                      <EditOutlined onClick={() => showModal(item._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal
              title="Change Password"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <InputGroup>
                <InputGroup.Text>New password</InputGroup.Text>
                <input
                  type="text"
                  name="password"
                  onChange={handleChangePassword}
                  className="form-control"
                />
              </InputGroup>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegeAdmin;
