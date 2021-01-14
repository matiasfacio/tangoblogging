import React, { useContext, useState } from "react";
import { AdminContext } from "../contexts/AdminContext";

const AdminRegister = () => {
  const { registerAdmin } = useContext(AdminContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });



  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerAdmin(loginData);
          setLoginData({
            email: "",
            password: "",
          });
        }}
      >
        <label>Email:</label>
        <input
          type="email"
          required
          placeholder="your admin email"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <label>Password:</label>
        <input
          type="password"
          required
          placeholder="your password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button type="submit">Register</button>
      </form>
      <h3>You are logged in</h3>
    </div>
  );
};

export default AdminRegister;
