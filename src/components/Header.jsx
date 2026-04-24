// import { useAtom } from "jotai";
// import React, { useEffect, useState } from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { ClickAwayListener } from "@mui/material";
// import { FaUserCircle } from "react-icons/fa";
// import { authUserAtom } from "../store/other";

// const Header = () => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [openProfileMenu, setOpenProfileMenu] = useState(false);
//   const [openDialogForLogout, setOpenDialogForLogout] = useState(false);
//   const [authUser, setAuthUser] = useAtom(authUserAtom);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const logout = () => {
//     setAuthUser({});
//     navigate("/");
//     setOpenDialogForLogout(false);
//   };

//   const toggleProfileMenu = () => {
//     setOpenProfileMenu((prev) => !prev);
//   };
//   const navigateTo = (path) => {
//     toggleProfileMenu();
//     navigate(path);
//   };

//   return (
//     <header className="w-full h-16 md:h-20 bg-gradient-to-r from-gray-50 to-blue-100 text-black shadow-md z-10">
//       <div className=" mx-auto flex items-center justify-between px-4 py-3 md:py-4 pl-7">
//         <div className="flex items-center gap-5">
//           <button
//             id="hamburger"
//             onClick={() => setOpenMenu(!openMenu)}
//             className=" text-2xl flex align-middle text-black"
//           >
//             <RxHamburgerMenu className="size-6 md:size-7" />
//           </button>
//           {/* Logo */}
//           <p className="text-3xl font-bold tracking-wide self-start select-none ml-2 text-black">
//             Learning Assistant
//           </p>
//         </div>

//         {authUser?.token && authUser?.token != "" > 0 ? (
//           <ClickAwayListener onClickAway={() => setOpenProfileMenu(false)}>
//             <div className="relative  text-left  md:block">
//               {/* <FaUserCircle/> */}

//               <div className="flex align-middle gap-3">
//                 <p className="hidden sm:block text-xl font-bold text-black select-none ">
//                   Welcome{" "}
//                   {authUser?.userDetails?.name &&
//                   authUser?.userDetails?.name?.length > 0
//                     ? (authUser?.userDetails?.name || "").split(" ")[0]
//                     : authUser?.role || ""}
//                 </p>

//                 <FaUserCircle
//                   className="size-6 md:size-7 cursor-pointer"
//                   onClick={toggleProfileMenu}
//                 />
//               </div>

//               {/* Dropdown */}

//               <div
//                 className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl z-50 ${openProfileMenu ? "block" : "hidden"}`}
//               >
//                 <ul className="py-2 text-gray-700 text-center">
//                   <li
//                     className={` md:hidden block px-4 py-2  cursor-none text-black font-bold select-none`}
//                   >
//                     Welcome{" "}
//                     {authUser?.userDetails?.name !== ""
//                       ? (authUser?.userDetails?.name || "").split(" ")[0]
//                       : authUser?.role || ""}
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer select-none"
//                     onClick={() => {
//                       navigateTo("/profile");
//                     }}
//                   >
//                     Profile
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer select-none"
//                     onClick={() => {
//                       navigateTo("settings");
//                     }}
//                   >
//                     Settings
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer select-none"
//                     onClick={() => {
//                       setOpenDialogForLogout(true);
//                       toggleProfileMenu();
//                     }}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </ClickAwayListener>
//         ) : (
//           location.pathname != "/login" &&
//           location.pathname != "/register" && (
//             <button
//               className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300"
//               onClick={() => {
//                 navigate("/login");
//               }}
//             >
//               Login
//             </button>
//           )
//         )}
//       </div>

//       <div
//         className={`w-1/2 md:w-1/5 h-auto fixed top-16 md:top-20 left-0  bg-slate-200 text-center text-black px-5 py-4
//     space-y-4 shadow-xl rounded-r-2xl transform transition-transform duration-300 ease-in-out z-50
//     ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <NavLink
//           to="/"
//           onClick={() => setOpenMenu(false)}
//           className={({ isActive }) =>
//             `block py-1 rounded-md transition-all duration-200 ${
//               isActive
//                 ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
//                 : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
//             }`
//           }
//         >
//           Home
//         </NavLink>
//         {authUser?.token && authUser?.token !== null && (
//           <>
//             <NavLink
//               to="/get-started"
//               onClick={() => setOpenMenu(false)}
//               className={({ isActive }) =>
//                 `block py-1 rounded-md transition-all duration-200 ${
//                   isActive
//                     ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
//                     : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
//                 }`
//               }
//             >
//               Get Started
//             </NavLink>

//             <NavLink
//               to="/my-learnings"
//               onClick={() => setOpenMenu(false)}
//               className={({ isActive }) =>
//                 `block py-1 rounded-md transition-all duration-200 ${
//                   isActive
//                     ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
//                     : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
//                 }`
//               }
//             >
//               My Learnings
//             </NavLink>
//           </>
//         )}

//         <NavLink
//           to="/about"
//           onClick={() => setOpenMenu(false)}
//           className={({ isActive }) =>
//             `block py-1 rounded-md transition-all duration-200 ${
//               isActive
//                 ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
//                 : "hover:text-indigo-600 hover:border-b-2 hover:border-indigo-400"
//             }`
//           }
//         >
//           About
//         </NavLink>
//       </div>
//       {openDialogForLogout && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Confirm Logout
//             </h2>
//             <p className="text-sm text-gray-600 mt-2">
//               Are you sure you want to logout?
//             </p>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => {
//                   setOpenDialogForLogout(false);
//                 }}
//                 className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={logout}
//                 className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;



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

  // ── Dark Mode State ──────────────────────────────────────────────────────────
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
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
  // ────────────────────────────────────────────────────────────────────────────

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
    <header className="w-full h-16 md:h-20 bg-gradient-to-r from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 text-black dark:text-white shadow-md dark:shadow-gray-900 z-10 transition-colors duration-300">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:py-4 pl-7">

        {/* Left — Hamburger + Logo */}
        <div className="flex items-center gap-5">
          <button
            id="hamburger"
            onClick={() => setOpenMenu(!openMenu)}
            className="text-2xl flex align-middle text-black dark:text-white transition-colors duration-200"
          >
            <RxHamburgerMenu className="size-6 md:size-7" />
          </button>
          <p className="text-3xl font-bold tracking-wide self-start select-none ml-2 text-black dark:text-white transition-colors duration-200">
            Learning Assistant
          </p>
        </div>

        {/* Right — Dark Mode Toggle + Auth */}
        <div className="flex items-center gap-3">

          {/* ── Dark Mode Toggle Button ── */}
          <button
            onClick={() => setIsDark((prev) => !prev)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm"
          >
            {isDark ? (
              <MdLightMode className="size-5" />
            ) : (
              <MdDarkMode className="size-5" />
            )}
          </button>

          {/* ── Auth Section ── */}
          {authUser?.token && authUser?.token != "" > 0 ? (
            <ClickAwayListener onClickAway={() => setOpenProfileMenu(false)}>
              <div className="relative text-left md:block">
                <div className="flex align-middle gap-3">
                  <p className="hidden sm:block text-xl font-bold text-black dark:text-white select-none transition-colors duration-200">
                    Welcome{" "}
                    {authUser?.userDetails?.name &&
                    authUser?.userDetails?.name?.length > 0
                      ? (authUser?.userDetails?.name || "").split(" ")[0]
                      : authUser?.role || ""}
                  </p>
                  <FaUserCircle
                    className="size-6 md:size-7 cursor-pointer text-black dark:text-white transition-colors duration-200"
                    onClick={toggleProfileMenu}
                  />
                </div>

                {/* Profile Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 rounded-xl z-50 border border-transparent dark:border-gray-700 transition-colors duration-200 ${
                    openProfileMenu ? "block" : "hidden"
                  }`}
                >
                  <ul className="py-2 text-gray-700 dark:text-gray-200 text-center">
                    <li className="md:hidden block px-4 py-2 cursor-none text-black dark:text-white font-bold select-none">
                      Welcome{" "}
                      {authUser?.userDetails?.name !== ""
                        ? (authUser?.userDetails?.name || "").split(" ")[0]
                        : authUser?.role || ""}
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer select-none transition-colors duration-150"
                      onClick={() => navigateTo("/profile")}
                    >
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer select-none transition-colors duration-150"
                      onClick={() => navigateTo("settings")}
                    >
                      Settings
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 cursor-pointer select-none transition-colors duration-150"
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
                className="bg-yellow-400 dark:bg-yellow-500 text-indigo-900 dark:text-indigo-950 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors duration-200"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )
          )}
        </div>
      </div>

      {/* ── Side Drawer Menu ── */}
      <div
        className={`w-1/2 md:w-1/5 h-auto fixed top-16 md:top-20 left-0
          bg-slate-200 dark:bg-gray-800 text-center text-black dark:text-white
          px-5 py-4 space-y-4 shadow-xl dark:shadow-gray-900 rounded-r-2xl
          transform transition-transform duration-300 ease-in-out z-50
          border-r border-transparent dark:border-gray-700
          ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <NavLink
          to="/"
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            `block py-1 rounded-md transition-all duration-200 ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400"
                : "hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-b-2 hover:border-indigo-400 dark:hover:border-indigo-500"
            }`
          }
        >
          Home
        </NavLink>

        {authUser?.token && authUser?.token !== null && (
          <>
            <NavLink
              to="/get-started"
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) =>
                `block py-1 rounded-md transition-all duration-200 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-b-2 hover:border-indigo-400 dark:hover:border-indigo-500"
                }`
              }
            >
              Get Started
            </NavLink>

            <NavLink
              to="/my-learnings"
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) =>
                `block py-1 rounded-md transition-all duration-200 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400"
                    : "hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-b-2 hover:border-indigo-400 dark:hover:border-indigo-500"
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
            `block py-1 rounded-md transition-all duration-200 ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400"
                : "hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-b-2 hover:border-indigo-400 dark:hover:border-indigo-500"
            }`
          }
        >
          About
        </NavLink>
      </div>

      {/* ── Logout Confirmation Dialog ── */}
      {openDialogForLogout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900 p-6 w-80 border border-transparent dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenDialogForLogout(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-150"
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

