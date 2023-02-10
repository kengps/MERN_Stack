import React from "react";
import { NavLink } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";


const MyRouter = () => {
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>MERN Stack | Workshop</h1>

      <nav>
        <NavLink className="btn btn-success" to="/create">
          เขียนบทความ
        </NavLink>
      </nav>
    </div>
  );
};

export default MyRouter;
