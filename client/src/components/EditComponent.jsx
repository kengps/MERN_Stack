import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import sweetAlert from "sweetalert2";

const EditComponent = () => {
  const slug = useParams();
  const props = slug.slug;
  console.log("Edit props" + props);
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
    slug: ""
  });
  const { title, content, author } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/blog/${props}`
        );
        console.log('Edit '+ response.data.slug + JSON.stringify(response));
        
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
    //       event.preventDefault();
    //       //console.log({title , content , author});
    //       console.log("API =" ,import.meta.env.VITE_REACT_APP_API);
    //     //   //เขียนแบบปกติ
    //     // axios.post(`${import.meta.env.VITE_REACT_APP_API}/create`,{title , content , author} ).then((response) =>{
    //     //   sweetAlert.fire('แจ้งเตือน' , 'บันทึกข้อมูลสำเร็จ','success');
    //     // }).catch((err) =>{
    //     //   sweetAlert.fire('แจ้งเตือน' , err.response.data.error,'error')
    //     // })
    //   //   เขียนแบบ Async Await
    //     try {
    //         const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/create`,{title , content , author} )
    //         sweetAlert.fire('แจ้งเตือน' , 'บันทึกข้อมูลสำเร็จ','success');
    //         setState({...state , title:'',content:'', author:''})
    //     } catch (err) {
    //       sweetAlert.fire('แจ้งเตือน' , err.response.data.error,'error')
    //     }
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      <hr />
      <h1>แก้ไข</h1>
      {JSON.stringify(state)}
    </div>
  );
};

export default EditComponent;
