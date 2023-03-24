import React from "react";
import NavbarAdminComponent from "../../../layout/NavbarAdminComponent";
import NavbarComponent from "../../../layout/NavnarComponent";


const PageAdmin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <NavbarAdminComponent />
        </div>
        <div className="col">
          <h1>PageAdmin</h1>
          
        </div>
      </div>
    </div>
  );
};

export default PageAdmin;
