import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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
                <nav>
                    <Link to={`/blog/${blog.slug}`}>
                    <h4>{blog.title}</h4>
                    </Link>
                </nav>
                  <p>{blog.content.substring(0, 180) }</p>
                  <p className="text-muted">{blog.author} เผยแพร่เมื่อ {new Date(blog.createdAt).toLocaleString()}</p>
                </div>
          </div>
      ))}
    </div>
  );
};

export default MyRouter;
