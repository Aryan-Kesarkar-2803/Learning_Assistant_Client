import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAtom } from "jotai";
import { authUserAtom } from "./store/other";
import Loader from "./components/globalComponents/Loader";
import {
  firstRequest,
  homeRequestSentimentModel,
} from "./utils/repository/other";
import ChatBot from "./components/Chatbot";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useAtom(authUserAtom);

  const getAuthenticationStatus = async () => {
    const [res, res1] = await Promise.all([
      firstRequest(),
      homeRequestSentimentModel(),
    ]);

    if (res == false) {
      setAuthUser({});
      navigate("/");
    }
  };

  useEffect(() => {
    getAuthenticationStatus();
  }, []);

  return (
    <>
    {
      loading ? 
      <Loader texts={["...starting the Server","...this may take some time"]}/> :
    
    <div>
      <Header />
      <Outlet />
      {location?.pathname == "/my-learnings/learning" && <ChatBot />}

      <ToastContainer
        style={{
          width: "100%",
        }}
      />
    </div>
}
    </>
  );
};

export default Layout;
