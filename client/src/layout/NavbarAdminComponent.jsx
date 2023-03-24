// import React from "react";
// import { Link } from "react-router-dom";
// // AntDesign
// import {
//   AppstoreOutlined,
//   ContainerOutlined,
//   MenuFoldOutlined,
//   PieChartOutlined,
// } from "@ant-design/icons";

// import { Button, Menu } from "antd";

// const NavbarAdminComponent = () => {
//   // function getItem(label, key, icon, children, type) {
//   //   return {
//   //     key,
//   //     icon,
//   //     children,
//   //     label,
//   //     type,
//   //   };
//   // }

//   // const items = [
//   //   getItem("Option 1", "1", <PieChartOutlined />),
//   //   getItem("Option 2", "2", <DesktopOutlined />),
//   //   getItem("Option 3", "3", <ContainerOutlined />),
//   //   getItem("Navigation One", "sub1", <MailOutlined />, [
//   //     getItem("Option 5", "5"),
//   //     getItem("Option 6", "6"),
//   //     getItem("Option 7", "7"),
//   //     getItem("Option 8", "8"),
//   //   ]),
//   //   getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
//   //     getItem("Option 9", "9"),
//   //     getItem("Option 10", "10"),
//   //     getItem("Submenu", "sub3", null, [
//   //       getItem("Option 11", "11"),
//   //       getItem("Option 12", "12"),
//   //     ]),
//   //   ]),
//   // ];

//   // const [collapsed, setCollapsed] = useState(false);
//   // const toggleCollapsed = () => {
//   //   setCollapsed(!collapsed);
//   // };

//   return (
//     <nav class="nav flex-column">
//       <ul class="nav flex-column">
//         <li class="nav-item">
//           <Link to={"/level/admin"} class="nav-link active" aria-current="page">
//             DashBroad
//           </Link>
//         </li>
//         <li class="nav-item">
//           <Link
//             to={"/level/admin/manege"}
//             class="nav-link active"
//             aria-current="page"
//           >
//             ManegeSetting
//           </Link>
//         </li>
//       </ul>

//     </nav>
//   );
// };

// export default NavbarAdminComponent;

import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarComponentAntd from "./NavnarComponent";


const NavbarAdminComponent = () => {
  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("1");


  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("เมนู", "sub2", <AppstoreOutlined />, [
      getItem(
        <Link to={"/level/admin"} class="nav-link active" aria-current="page">
          {" "}
          DashBroad
        </Link>
      ),
      getItem(
       
          <Link
            to={"/level/admin/manege"}
            class="nav-link active"
            aria-current="page"
          >
            {" "}
            จัดการ User
          </Link>
      
      ),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),
  ];

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = (e) => {
    console.log("click ", e);

    setCurrent(e.key);
  };
  return (
    <>
      
        <NavbarComponentAntd />
    
      <Switch
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      {/* 
      <nav class="nav flex-column">
        <ul class="nav flex-column">
          <li class="nav-item">
            <Link
              to={"/level/admin"}
              class="nav-link active"
              aria-current="page"
            >
              DashBroad{" "}
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to={"/level/admin/manege"}
              class="nav-link active"
              aria-current="page"
            >
              ManegeSetting
            </Link>
          </li>
        </ul>
      </nav> */}
    </>
  );
};
export default NavbarAdminComponent;
