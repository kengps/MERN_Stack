import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import SweetAlert from "sweetalert2";

import axios from "axios";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";




const LoggedComponent = () => {
  const redirect = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  //การ destructuring ของ state
  const { username, password } = state;
  //console.log(register);

  //  const handleRegister = (e) => {

  //  setRegister({ ...register, [e.target.name]: e.target.value });

  //  }

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
    //console.log(name, "=", event.target.value);
  };

  //
  const levelRole = (role) => {
    if (role === "user") {
      redirect("/level/user");
    } else {
      redirect("/level/admin");
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();

    console.table({ username, password });

    console.log("URL : " + import.meta.env.VITE_REACT_APP_API);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/logged`,
        {
          username,
          password,
        }
      );
      const token = response.data.token;
      console.log('ได้อะไรมา',response.data);

      
     SweetAlert.fire("แจ้งเตือน", response.data.payLoad.user.username + ' เข้าสู่ระบบสำเร็จ', "success");
      setState({ ...state, username: "", password: "" });

      // payload มาจาก userReducer จากการ return action.payload
      dispatch({
        type: "LOGIN",
        payload: {
          token: token,
          username: response.data.payLoad.user.username,
          role: response.data.payLoad.user.role,
        },
      });
      localStorage.setItem("token", token);

      levelRole(response.data.payLoad.user.role);
    } catch (error) {
      SweetAlert.fire("แจ้งเตือน", "เข้าสู่ระบบไม่สำเร็จ", "error");
      console.log(error);
      // alert(error);
    }
  };
  // console.log(import.meta.env.VITE_REACT_API_APP);

  //function สำหรับการกดปุ่ม แสดงรหัสหรือซ่อนรหัส

  return (
    <div>
      {JSON.stringify(state)}
      <h1>LoggedComponent</h1>

      <div className="from-control">
        <Form onSubmit={submitForm}>
          <div className="form-group">
            <InputGroup className="border mt-3">
              <InputGroup.Text>Username</InputGroup.Text>
              <Form.Control
                className="form-control input-lg"
                name="username"
                onChange={inputValue("username")}
                value={username}
              />
            </InputGroup>
           

          
            <InputGroup className="mt-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                className="form-control input-lg"
                name="password"
                type="password"
                value={password}
                onChange={inputValue("password")}
                />
            </InputGroup>
           </div>

          <Button className="mt-3" type="submit">
            Login
          </Button>
        </Form>
      </div>
      {/* <Spin tip="Loading..." size="large">
        <div className="content" />
      </Spin> */}
    </div>
  );
};

export default LoggedComponent;
