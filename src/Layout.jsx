import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <ToastContainer
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default Layout;
