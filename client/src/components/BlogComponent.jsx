import  { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";


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
  const submitForm = (event) =>{
      event.preventDefault();
    //  console.log({title , content , author});
     
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
