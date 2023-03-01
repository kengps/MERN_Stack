import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Sweet from "sweetalert2";
import { getToken, getUser } from "./service/authorize";

import DOMPurify from "dompurify";

import ReactPaginate from "react-paginate";

const MyRouter = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const ITEMS_PER_PAGE = 10; // Change this to the desired number of items per page

  useEffect(() => {}, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/blogs?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );

      setBlogs(response.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const confirmDelete = async (slug) => {
    try {
      const result = await Sweet.fire({
        title: "คุณต้องการลบบทความหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      //ถ้ากดปุ่ม OK หรือ ตกลง
      if (result.isConfirmed) {
        //ส่ง request ไปที่  api เพื่อลบข้อมูล
        deleteBlog(slug); //หากมีการกด confirm ให้ทำการเรียกใช้ function deleteBlog
      }
    } catch (error) {
      console.log(err);
    }
  };
  //ดึงข้อมูลจาก API เพื่อทำการลบ หากมีการกด ตกลง
  const deleteBlog = async (slug) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API}/blog/${slug} `,
        {
          headers: {
            Authorization: `bearer ${getToken()}`,
          },
        }
      );
      Sweet.fire("Delete!", response.data.message, "success");
      fetchData(); // หลักจากลบข้อมูลเรียบร้อยแล้วจะทำการ ดึงข้อมูลที่เหลือกลับมา
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container p-5">
      <NavbarComponent />

      {blogs
        .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
        .map((blog, index) => (
          <div
            className="row"
            key={index}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-3 pb-3">
              <nav>
                <NavLink to={`/blog/${blog.slug}`}>
                  <h4>{blog.title}</h4>
                </NavLink>
              </nav>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.content.substring(0, 180)),
                }}
              />
              {/* <div>{blog.content.substring(0, 180)}</div> */}

              <p className="text-muted">
                {blog.author} เผยแพร่เมื่อ{" "}
                {new Date(blog.createdAt).toLocaleString()}
              </p>
              {getUser() && (
                <div>
                  <Link
                    className="btn btn-outline-success"
                    to={`/blog/edit/${blog.slug}`}
                  >
                    แก้ไข
                  </Link>{" "}
                  &nbsp;
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => confirmDelete(blog.slug)}
                  >
                    ลบ
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

      <div className="mt-3 pt-3">
        <ReactPaginate
          previousLabel="< previous"
          nextLabel="next >"
          breakLabel="..."
          pageCount={Math.ceil(blogs.length / ITEMS_PER_PAGE)}
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default MyRouter;
