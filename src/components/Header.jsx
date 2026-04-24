

// below is new one

import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { authUserAtom } from "../store/other";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openDialogForLogout, setOpenDialogForLogout] = useState(false);
  const [authUser, setAuthUser] = useAtom(authUserAtom);


  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return false; 
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setAuthUser({});
    navigate("/");
    setOpenDialogForLogout(false);
  };

  const toggleProfileMenu = () => {
    setOpenProfileMenu((prev) => !prev);
  };

  const navigateTo = (path) => {
    toggleProfileMenu();
    navigate(path);
  };

  return (

<header className="w-full h-16 md:h-20 bg-gradient-to-r from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 text-black dark:text-white shadow-md dark:shadow-gray-900 z-50 transition-colors duration-300">

  <div className="mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">

    {/* LEFT */}
    <div className="flex items-center gap-3 md:gap-5">
      <button
        onClick={() => setOpenMenu(prev => !prev)}
        className="text-black dark:text-white"
      >
        <RxHamburgerMenu className="size-6 md:size-7" />
      </button>

      <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide select-none">
        Learning Assistant
      </p>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-2 md:gap-3">

     
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
      >
        {isDark ? (
          <MdLightMode className="size-5" />
        ) : (
          <MdDarkMode className="size-5" />
        )}
      </button>

      {authUser?.token && authUser?.token !== "" ? (
        <ClickAwayListener onClickAway={() => setOpenProfileMenu(false)}>
          <div className="relative">

            <div className="flex items-center gap-2 md:gap-3">

              {/* Hide text on small screens */}
              <p className="hidden md:block text-lg font-bold select-none">
                Welcome{" "}
                {(authUser?.userDetails?.name || authUser?.role || "").split(" ")[0]}
              </p>

              <FaUserCircle
                className="size-6 md:size-7 cursor-pointer"
                onClick={toggleProfileMenu}
              />
            </div>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-44 md:w-48 bg-white dark:bg-gray-800 shadow-lg rounded-xl z-50 border dark:border-gray-700 transition ${
                openProfileMenu ? "block" : "hidden"
              }`}
            >
              <ul className="py-2 text-sm md:text-base text-center">

                {/* Show only on mobile */}
                <li className="md:hidden px-4 py-2 font-bold">
                  {(authUser?.userDetails?.name || authUser?.role || "").split(" ")[0]}
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => navigateTo("/profile")}
                >
                  Profile
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => navigateTo("settings")}
                >
                  Settings
                </li>

                <li
                  className="px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer"
                  onClick={() => {
                    setOpenDialogForLogout(true);
                    toggleProfileMenu();
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </ClickAwayListener>
      ) : (
        location.pathname !== "/login" &&
        location.pathname !== "/register" && (
          <button
            className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base bg-yellow-400 text-indigo-900 rounded-lg font-medium hover:bg-yellow-300 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )
      )}
    </div>
  </div>

  {/* SIDE DRAWER */}
  <div
    className={`fixed top-16 md:top-20 left-0 
    w-2/3 sm:w-1/2 md:w-1/5
    bg-slate-200 dark:bg-gray-800 text-center text-black dark:text-white
    px-5 py-4 space-y-4 shadow-xl rounded-r-2xl
    transform transition-transform duration-300 ease-in-out z-50
    border-r dark:border-gray-700 overflow-y-auto
    ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
  >

    <NavLink
      to="/"
      onClick={() => setOpenMenu(false)}
      className={({ isActive }) =>
        `block py-2 text-base md:text-lg ${
          isActive
            ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
            : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
        }`
      }
    >
      Home
    </NavLink>

    {authUser?.token && (
      <>
        <NavLink
          to="/get-started"
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            `block py-2 text-base md:text-lg ${
              isActive
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
            }`
          }
        >
          Get Started
        </NavLink>

        <NavLink
          to="/my-learnings"
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            `block py-2 text-base md:text-lg ${
              isActive
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
            }`
          }
        >
          My Learnings
        </NavLink>
      </>
    )}

    <NavLink
      to="/about"
      onClick={() => setOpenMenu(false)}
      className={({ isActive }) =>
        `block py-2 text-base md:text-lg ${
          isActive
            ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
            : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
        }`
      }
    >
      About
    </NavLink>
  </div>

  {/* LOGOUT MODAL */}
  {openDialogForLogout && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold">Confirm Logout</h2>
        <p className="text-sm text-gray-500 mt-2">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setOpenDialogForLogout(false)}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )}
</header>

  );
};

export default Header;
