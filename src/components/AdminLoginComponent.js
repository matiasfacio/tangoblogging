import React, { useState, useContext, useEffect } from "react";
import { AdminContext } from "../contexts/AdminContext";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { checkLogin, AdminLogin } = useContext(AdminContext);

  useEffect(() => {}, [AdminLogin]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkLogin(loginData);
          setLoginData({
            email: "",
            password: "",
          });
        }}
      >
        <label>Email:</label>
        <input
          type="email"
          placeholder="admin email here"
          value={loginData.email}
          onChange={(e) => {
            setLoginData({ ...loginData, email: e.target.value });
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="admin email here"
          value={loginData.password}
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <h3>You are logged Out</h3>
    </div>
  );
};

export default AdminLogin;
