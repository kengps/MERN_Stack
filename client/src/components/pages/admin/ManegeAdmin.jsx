import React, { useEffect, useState } from "react";
import NavbarAdminComponent from "../../../layout/NavbarAdminComponent";
import { changStatus, lisetUsers } from "../../api/user";
import { useSelector } from "react-redux";

import { Switch } from "antd";
const ManegeAdmin = () => {
  // state สำหรับการจัดเก็บข้อมูล
  const [data, setData] = useState([]);

  //ดึงข้อมูล State จาก storeRedux
  const { user } = useSelector((state) => ({ ...state }));

  console.log("user", user);
  // สร้าง function สำหรับการยิง api แต่เราได้สร้าง function แยกไว้ในตัวแปร lisetUsers
  const loadUser = (authtoken) => {
    lisetUsers(authtoken)
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <NavbarAdminComponent />
        </div>
        <div className="col">
          {/* {state.map((state, index) => {
            <h1>{state.username}</h1>;
          })} */}
          <h1>ManegeAdmin</h1>
        </div>
        <div>
          <table className="table table-striped table-hover ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">username</th>
                <th scope="col">role</th>
                <th scope="col">status</th>
                <th scope="col">createdAt</th>
                <th scope="col">updateAt</th>
              </tr>
            </thead>
            <tbody>
              {/* //ทำการวน loop โดยใช้การ map โดยน้ำ state data มา */}
              {data.map((item, index) => (
                //กำหนดคีย์
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <Switch
                      checked={item.enabled}
                      onChange={(e) => handleOnchange(e, item._id)}
                    />
                  </td>
                  <td> {new Date(item.createdAt).toLocaleString()}</td>
                  <td>
                    เข้าใช่งานล่าสุด {new Date(item.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManegeAdmin;
