import React from "react";
import { Link } from "react-router-dom";


const NavbarAdminComponent = () => {
  return (
    <nav class="nav flex-column">
      <ul class="nav flex-column">
        <li class="nav-item">
         
          <Link to={'/level/admin'} class="nav-link active" aria-current="page">DashBroad</Link>
        </li>
        <li class="nav-item">
          <Link to={'/level/admin/manege'} class="nav-link active" aria-current="page">ManegeSetting</Link>
         
        </li>
       
       
      </ul>
    </nav>
  );
};

export default NavbarAdminComponent;
