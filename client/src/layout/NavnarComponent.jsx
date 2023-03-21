//import { HomeOutlined, LoginOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";

const NavbarComponentAntd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/logged");
  };

  return (
    <>
      {user && (
        <Menu mode="horizontal">
          <Menu.Item
            key={"app"}
            icon={<MailOutlined />}
            onClick={handleLogout}
            style={{ float: "right" }}
          >
            LOGOUT
          </Menu.Item>
        </Menu>
      )}

      {!user && (
        <Menu mode="horizontal">
          <Menu.Item key={"mail"} icon={<MailOutlined />}>
            LOGIN
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};
export default NavbarComponentAntd;
