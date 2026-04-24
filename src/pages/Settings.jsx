import React, { useEffect, useState } from "react";
// import { deleteUserAccount } from "../utils/repository/user";
import { useAtom } from "jotai";
import { authUserAtom } from "../store/other";
import { successNotification } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useAtom(authUserAtom);
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return false; 
    });


  const handleSignOut = async() => {
    
    // const res = await deleteUserAccount(user?.userDetails?.id || '');
    // if(res && res?.status == 200){
    //   successNotification({message:'Signned out'});
    //   setOpen(false);
    //   navigate('/')
    //   setUser({});
    //   setAuthUser({})
    // }

    
  };

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

  return (

<div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">

  {/* Header */}
  <div className="px-6 md:px-16 py-10 border-b border-gray-200 dark:border-gray-800">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
      Settings
    </h1>
    <p className="text-gray-500 dark:text-gray-400 mt-2">
      Manage your account, preferences and security
    </p>
  </div>

  {/* Content */}
  <div className="px-6 md:px-16 py-10 space-y-8">

    <div>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Account
      </h2>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">

        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-gray-900 dark:text-white font-medium">Profile</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your personal information
            </p>
          </div>
          <button 
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={()=>{navigate('/profile')}}
          >
            Edit
          </button>
        </div>

        {/* <div className="flex items-center justify-between p-5">
          <div>
            <p className="text-gray-900 dark:text-white font-medium">Email</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your email address
            </p>
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            user@example.com
          </span>
        </div> */}

      </div>
    </div>


    <div>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Preferences
      </h2>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">

        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-gray-900 dark:text-white font-medium">Theme</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Switch between dark and light mode
            </p>
          </div>

          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            {isDark ? "Light": "Dark"}
          </button>
        </div>

        {/* <div className="flex items-center justify-between p-5">
          <div>
            <p className="text-gray-900 dark:text-white font-medium">Notifications</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enable or disable alerts
            </p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition">
            Manage
          </button>
        </div> */}

      </div>
    </div>

    <div>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Security
      </h2>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">

        {/* <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-gray-900 dark:text-white font-medium">Password</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Change your password
            </p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-black transition">
            Update
          </button>
        </div> */}

        <div className="flex items-center justify-between p-5 bg-red-50 dark:bg-red-900/10">
          <div>
            <p className="text-red-600 dark:text-red-400 font-medium">Logout</p>
            <p className="text-sm text-red-500 dark:text-red-300">
              Sign out from your account
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>

      </div>
    </div>

  </div>

  {open && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">

      <div className="w-full max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center">

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Confirm Logout
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Are you sure you want to sign out?
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => setOpen(false)}
            className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSignOut}
            className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sign Out
          </button>

        </div>

      </div>

    </div>
  )}

</div>
  );
};

export default Settings;
