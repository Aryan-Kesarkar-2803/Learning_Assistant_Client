import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { authUserAtom, roadmapAtom } from "../../store/other";
import { TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveRoadmap } from "../../utils/repository/getStarted";

const Roadmap = () => {
  const [roadmap, setRoadmap] = useAtom(roadmapAtom);
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveRoadmap = async () => {
    setLoading(true);
    const formattedRoadmap = convertToRoadmap(roadmap?.roadmap);

    const learning = {
      roadmap: formattedRoadmap || [],
      topic: roadmap?.topic || "",
      userId: authUser?.userDetails?.id || "",
      isCompleted: false,
      progress: 0,
    };
    //  console.log(learning); return;
    const response = await saveRoadmap(learning);
    setLoading(false);
    if (!response) {
      return;
    }
    setRoadmap({});
    navigate("/my-learnings");
  };

  const convertToRoadmap = (text) => {
    const steps = text.split("•").filter(Boolean);

    const roadmap = steps.map((stepBlock) => {
      const lines = stepBlock.trim().split("\n").filter(Boolean);

      const stepName = lines[0].replace(":", "").trim();

      const topics = lines.slice(1).map((line) => ({
        topicName: line.replace("-", "").trim(),
        videoLink: "",
        docId: "",
        isCompleted: false,
      }));

      return {
        stepName,
        topics,
        isCompleted: false,
      };
    });

    return roadmap;
  };

  useEffect(() => {
    if (!roadmap?.roadmap || roadmap?.roadmap == "") {
      navigate("/get-started");
    }
  }, []);

  return (
    // <div className="min-h-screen py-8 bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200 px-4">
    //   {/* Content Wrapper */}
    //   <div className="max-w-3xl mx-auto mt-4 text-center">
    //     {/* Heading */}
    //     <h1 className="text-4xl font-bold text-gray-800">Checkout Roadmap</h1>

    //     <div className="flex flex-col items-center max-w-2xl mx-auto">
    //       <div className="mt-8 w-full bg-white rounded-2xl shadow-md">
    //         <TextareaAutosize
    //           value={roadmap?.roadmap || ""}
    //           readOnly
    //           className="w-full h-80 p-4 border rounded-2xl focus:outline-none"
    //         />
    //       </div>

    //       <div className="w-full flex justify-between mt-6">
    //         <button
    //           className="px-6 h-12 flex items-center justify-center bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
    //           onClick={() => navigate("/get-started")}
    //         >
    //           Back
    //         </button>

    //         <button
    //           disabled={loading}
    //           onClick={handleSaveRoadmap}
    //           className={`px-6 h-12 flex items-center justify-center ${
    //             loading
    //               ? "bg-gray-400 cursor-not-allowed"
    //               : "bg-blue-600 hover:bg-blue-700"
    //           } text-white rounded-xl transition min-w-[120px]`}
    //         >
    //           {loading ? (
    //             <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    //           ) : (
    //             "Proceed"
    //           )}
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen py-8 bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 px-4 transition-colors duration-300">
      {/* Content Wrapper */}
      <div className="max-w-3xl mx-auto mt-4 text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Checkout Roadmap
        </h1>

        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <div className="mt-8 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 border border-transparent dark:border-gray-700 transition-colors duration-300">
            <TextareaAutosize
              value={roadmap?.roadmap || ""}
              readOnly
              className="w-full h-80 p-4 border dark:border-gray-700 rounded-2xl focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
            />
          </div>

          <div className="w-full flex justify-between mt-6">

            <button
              className="px-6 h-12 flex items-center justify-center bg-red-600 dark:bg-red-700 text-white rounded-xl hover:bg-red-700 dark:hover:bg-red-800 transition min-w-[120px]"
              onClick={() => navigate("/get-started")}
            >
              Back
            </button>

            <button
              disabled={loading}
              onClick={handleSaveRoadmap}
              className={`px-6 h-12 flex items-center justify-center ${
                loading
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
              } text-white rounded-xl transition min-w-[120px]`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
