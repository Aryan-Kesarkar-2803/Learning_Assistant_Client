const NotFound = () => {
  return (
    // <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
    //   {/* 404 Text */}
    //   <h1 className="text-7xl font-bold text-gray-800">404</h1>
      
    //   {/* Message */}
    //   <p className="text-xl mt-4 text-gray-600">
    //     Oops! Page not found
    //   </p>
      
    //   {/* Description */}
    //   <p className="text-gray-500 mt-2 text-center max-w-md">
    //     The page you are looking for doesn’t exist or has been moved.
    //   </p>
      
    //   {/* Button */}
    //   <button
    //     onClick={() => window.location.href = "/"}
    //     className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
    //   >
    //     Go Home
    //   </button>

    // </div>

    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 transition-colors duration-300">

  {/* 404 Text */}
  <h1 className="text-7xl font-bold text-gray-800 dark:text-gray-100">404</h1>

  {/* Message */}
  <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">
    Oops! Page not found
  </p>

  {/* Description */}
  <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
    The page you are looking for doesn't exist or has been moved.
  </p>

  {/* Button */}
  <button
    onClick={() => window.location.href = "/"}
    className="mt-6 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow dark:shadow-gray-900 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
  >
    Go Home
  </button>

</div>
  );
};

export default NotFound;