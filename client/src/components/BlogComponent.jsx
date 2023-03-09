import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import sweetAlert from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken, getUser } from "../service/authorize";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";


const BlogComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });
  const { title, author } = state;

  const [content, SetContent] = useState("");

  const SubmitContent = (event) => {
    SetContent(event);
  };

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
    //console.log(name, "=", event.target.value);
  };
  // function inputValue(name) {
  //   return function (event) {
  //     setState({ ...state, [name]: event.target.value });
  //     //console.log(name, "=", event.target.value);
  //   };
  // }
  const submitForm = async (event) => {
    event.preventDefault();
    //console.log({title , content , author});
    console.log("API =", import.meta.env.VITE_REACT_APP_API);

    //   //เขียนแบบปกติ
    // axios.post(`${import.meta.env.VITE_REACT_APP_API}/create`,{title , content , author} ).then((response) =>{

    //   sweetAlert.fire('แจ้งเตือน' , 'บันทึกข้อมูลสำเร็จ','success');

    // }).catch((err) =>{
    //   sweetAlert.fire('แจ้งเตือน' , err.response.data.error,'error')
    // })

    //   เขียนแบบ Async Await
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/create`,
        { title, content, author },
        {
          headers: {
            Authorization: `bearer ${getToken()}`,
          },
        }
      );
      sweetAlert.fire("แจ้งเตือน", "บันทึกข้อมูลสำเร็จ", "success");
      setState({ ...state, title: "", author: "" });
      SetContent("");
    } catch (err) {
      sweetAlert.fire("แจ้งเตือน", err.response.data.error, "error");
    }
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      <hr />
      <h1>เขียนบทความ</h1>
      {/* {JSON.stringify(state)} */}
      <Form onSubmit={submitForm}>
        <div className="form-group">
          <InputGroup>
            <InputGroup.Text>ขื่อบทความ</InputGroup.Text>
            <Form.Control
              type="text"
              className="form-control"
              value={title}
              onChange={inputValue("title")}
            />
          </InputGroup>
        </div>
        <div className="form-group">
          <label>รายละเอียด</label>
         
            <ReactQuill
              value={content}
              onChange={SubmitContent}
              placeholder="กรุณาระบุรายละเอียดของคุณ"
              className="pb-5 mb-3"
              style={{ border: "1px solid #666" }}
              />
             
        
        </div>
        <div className="form-group">
          <label>ผู้เขียน</label>
          {getUser() && (
            <>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={inputValue("author")}
                disabled="disabled"
              />
            </>
          )}
          {!getUser() && (
            <>
              <input
                type="text"
                className="form-control"
                value="สมาชิกไร้ตัวตัน"
                onChange={inputValue("author")}
              />
            </>
          )}
        </div>
        <hr />
        <input type="submit" className="btn btn-primary" value="Submit" />
      </Form>
      <br />
    </div>
  );
};

export default BlogComponent;
