import React, { createContext, useState } from 'react';

export const AdminContext = createContext();


  const AdminProvider = (props) => {

    const checkLogin = data => {
      const parseData = JSON.stringify(data);
      fetch('https://tangoblogging.herokuapp.com/loginAdmin', {
        method: 'POST',
        cors: 'cors',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: parseData,
      })
      .then(result => result.status === 200 ? setAdminLogin(true) : setAdminLogin(false))
      .catch(err => console.log('something went wrong:', err))
    }

    const registerAdmin = data => {
       const parsedData = JSON.stringify(data)
       fetch('https://tangoblogging.herokuapp.com/registerAdmin', {
            mode: 'cors',
            method: 'POST',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
              body: parsedData
          })
          .then(data => console.log(data))
          .catch(err => console.log(err))
    }

    const [AdminLogin, setAdminLogin] = useState(false)


      return ( 
          <AdminContext.Provider value = {{ AdminLogin, setAdminLogin, checkLogin, registerAdmin}}>
              {props.children}
          </AdminContext.Provider>
       );
  }
   
  export default AdminProvider;
  