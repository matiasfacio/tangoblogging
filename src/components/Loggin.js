import React, { useContext, useEffect } from "react";
import { AdminContext } from "../contexts/AdminContext";
import AdminRegister from "./AdminRegister";
import AdminLoginComponent from "./AdminLoginComponent";

const Loggin = () => {
  const { AdminLogin } = useContext(AdminContext);

  useEffect(() => {}, [AdminLogin]);

  return (
    <div className="loggingIn">
      <h2>Login Area</h2>
      {AdminLogin ? <h3>Change Email and Password</h3> : ""}
      {AdminLogin ? <AdminRegister /> : ""}
      {!AdminLogin ? ((<h3>Login Admin</h3>), (<AdminLoginComponent />)) : ""}
    </div>
  );
};

export default Loggin;
