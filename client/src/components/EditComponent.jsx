import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import sweetAlert from "sweetalert2";

const EditComponent = () => {
  const slug1 = useParams();
  const props = slug1.slug;
  console.log("Edit props" + props);
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
    slug: ""
  });
    const { title, content, author, slug } = state;

    //console.log('state = ', state);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/blog/${props}`
        );
        const {title , content , author , slug} = response.data

        setState({...state, title, content, author, slug });
        // console.log('Edit '+JSON.stringify(response.data.title));
        // console.log(response.data);
        
      } catch (err) {
        alert(err);
      }
    };

    fetchData();
  }, []);

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
       //   console.log("API =" ,import.meta.env.VITE_REACT_APP_API);
          //เขียนแบบปกติ
        axios.put(`${import.meta.env.VITE_REACT_APP_API}/blog/${props}`,{title , content , author} ).then((response) =>{
          sweetAlert.fire('แจ้งเตือน' , 'บันทึกข้อมูลสำเร็จ','success');
          const { title, content, author, slug } = response.data;
           setState({ ...state, title:'', content:'', author:'', slug:'' });
        }).catch((err) =>{
          sweetAlert.fire('แจ้งเตือน' , err.response.data.error,'error')
        })
      //   เขียนแบบ Async Await
        // try {
        //     const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/blog/${props}`,{title , content , author} )
        //     console.log("response in submitform = " + response.data);
        //     sweetAlert.fire('แจ้งเตือน' , 'บันทึกข้อมูลสำเร็จ','success');
        //     const {title , content ,author , slug} = response.data
            
        //     setState({...state , title,content, author , slug})
        // } catch (err) {
        //   alert(err)
        //     console.log("response in submitform = " + response.data);
        // }
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      <hr />
      <h1>แก้ไข</h1>

      {/* <input type="" name="" value={state.title} />
      {JSON.stringify(state)} */}

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
        <input type="submit" className="btn btn-primary" value="ยืนยัน" />
      </form>
    </div>
  );
};

export default EditComponent;
