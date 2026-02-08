import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openDialogForLogout, setOpenDialogForLogout] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {};

  const toggleProfileMenu = () => {
    setOpenProfileMenu((prev) => !prev);
  };
  const navigateTo = (path) => {
    toggleProfileMenu();
    navigate(path);
  };

  return (
    <header className="w-full h-16 md:h-20 bg-gradient-to-r from-gray-50 to-blue-100 text-black shadow-md z-10">
      <div className=" mx-auto flex items-center justify-between px-4 py-3 md:py-4 pl-7">
        <div className="flex items-center gap-5">
          <button
            id="hamburger"
            onClick={() => setOpenMenu(!openMenu)}
            className=" text-2xl flex align-middle text-black"
          >
            <RxHamburgerMenu className="size-6 md:size-7" />
          </button>
          {/* Logo */}
          <p className="text-3xl font-bold tracking-wide self-start select-none ml-2 text-black">
            Learning Assistant
          </p>
        </div>

        {/* Desktop Nav */}
        {/* <nav className="hidden md:flex gap-8 font-medium ">
      <NavLink
        // to="/"
        // className={({ isActive }) =>
        //   `hover:text-blue-700 transition select-none ${
        //     isActive ? "text-blue-700" : "text-black"
        //   }`
        // }
      >
        Home
      </NavLink>
      <NavLink
        // to="/plan-event"
        // className={({ isActive }) =>
        //   `hover:text-blue-700 transition select-none ${
        //     isActive ? "text-blue-700" : "text-black"
        //   }`
        // }
      >
        Plan a Event
      </NavLink>
      <NavLink
        // to="/services"
        // className={({ isActive }) =>
        //   `hover:text-blue-700 transition select-none ${
        //     isActive ? "text-blue-700" : "text-black"
        //   }`
        // }
      >
        Services
      </NavLink>
    </nav> */}
        {location.pathname != "/login" && location.pathname != "/register" && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium "
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>

        <div
       className={`w-1/2 md:w-1/5 h-auto fixed top-16 md:top-20 left-0  bg-slate-200 text-center text-black px-5 py-4
    space-y-4 shadow-xl rounded-r-2xl transform transition-transform duration-300 ease-in-out z-50
    ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <NavLink
          to="/"
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            `block py-1 rounded-md transition-all duration-200 ${
              isActive
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
            }`
          }
        >
          Home
        </NavLink>

         <NavLink
          to="/about"
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            `block py-1 rounded-md transition-all duration-200 ${
              isActive
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
            }`
          }
        >
          About
        </NavLink>

      </div>
    </header>
  );
};

export default Header;
