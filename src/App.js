import React from "react";
import "./css/styles.css";
import Main from "./components/Main";
import EntriesContextProvider from "./contexts/EntriesContext";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import AdminProvider from './contexts/AdminContext'

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
      <EntriesContextProvider>
        <Main />
        <Footer />
      </EntriesContextProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
