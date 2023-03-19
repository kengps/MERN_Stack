import React from "react";
import NavbarAdminComponent from "../../../layout/NavbarAdminComponent";

const ManegeAdmin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <NavbarAdminComponent />
        </div>
        <div className="col">
          <h1>ManegeAdmin</h1>
        </div>
      </div>
    </div>
  );
};

export default ManegeAdmin;
