import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAtom } from "jotai";
import { authUserAtom } from "./store/other";
import { firstRequest, homeRequestSentimentModel } from "./utils/repository/other";

const Layout = () => {
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useAtom(authUserAtom)

  const getAuthenticationStatus = async() =>{

      const [res,res1] = await Promise.all([
        firstRequest(),
        homeRequestSentimentModel()
      ])

      if(res == false){
        setAuthUser({})
        navigate("/")
      }
    }

   useEffect(()=>{
    getAuthenticationStatus();
  },[])

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
