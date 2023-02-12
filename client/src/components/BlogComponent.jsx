import  { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import axios  from 'axios';
import sweetAlert from 'sweetalert2'

const BlogComponent = () => {
    const [state, setState] = useState({
            title: "",
            content: "",
            author: ""
    });
    const {title , content , author} = state

    const inputValue=name=>event => {
        setState({...state, [name]:event.target.value})
        //console.log(name, "=", event.target.value);
        console.log();
    }
    // function inputValue(name) {
    //   return function (event) {
    //     setState({ ...state, [name]: event.target.value });
    //     //console.log(name, "=", event.target.value);
    //   };
   // }
  const submitForm = async(event) =>{
      event.preventDefault();
      //console.log({title , content , author});
      console.log("API =" ,import.meta.env.VITE_REACT_APP_API);
     
    //   //เขียนแบบปกติ
    // axios.post(`${import.meta.env.VITE_REACT_APP_API}/create`,{title , content , author} ).then((response) =>{

    //   sweetAlert.fire('แจ้งเตือน' , 'บันทึกข้อมูลสำเร็จ','success');
      
    // }).catch((err) =>{
    //   sweetAlert.fire('แจ้งเตือน' , err.response.data.error,'error')
    // })
    
  //   เขียนแบบ Async Await
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/create`,{title , content , author} )
        sweetAlert.fire('แจ้งเตือน' , 'บันทึกข้อมูลสำเร็จ','success');
        setState({...state , title:'',content:'', author:''})
    } catch (err) {
      sweetAlert.fire('แจ้งเตือน' , err.response.data.error,'error')
    }
   }

   
  return (
    <div className="container p-5">
      <NavbarComponent />
      <hr />
      <h1>เขียนบทความ</h1>
      {/* {JSON.stringify(state)} */}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ขื่อบทความ</label> 
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>รายละเอียด</label>
          <textarea
            className="form-control"
            value={content}
            onChange={inputValue("content")}
          />
        </div>
        <div className="form-group">
          <label>ผู้เขียน</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <hr />
        <input type="submit" className="btn btn-primary" value="submit" />
      </form>
      <br />
    </div>
  );
};

export default BlogComponent;
