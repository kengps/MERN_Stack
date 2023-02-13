import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

const MyRouter = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/blogs`
      );

      setBlogs(response.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container p-5">
      <NavbarComponent />
      
      {blogs.map((blog, index) =>(
          <div className="row" key={index} style={{borderBottom:"1px solid silver"}}>
                <div className="col pt-3 pb-3"> 
                  <h2>{blog.title}</h2>
                  <p>{blog.content}</p>
                  <p className="text-muted">{blog.author} เผยแพร่เมื่อ {blog.createAt}</p>
                </div>
          </div>
      ))}
    </div>
  );
};

export default MyRouter;
