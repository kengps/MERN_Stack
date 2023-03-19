import React, { useEffect,useState } from "react";

import { useSelector } from "react-redux";
import { currentAdmin } from "../api/auth";
import LoadingAndRedirect from "./LoadingAndRedirect";

//{children} คือ ค่าของ component ที่อยู่ใน PageUser  เนื่องจากโดน UserRouter ครอบอยู่
const AdminRouter = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
                console.log(res);
                setOk(true);
        })
        .catch((err) => {
            console.log(err);
            setOk(false)
        });
    }
  }, [user]);

  return ok ? children : <LoadingAndRedirect/>
};

export default AdminRouter;
