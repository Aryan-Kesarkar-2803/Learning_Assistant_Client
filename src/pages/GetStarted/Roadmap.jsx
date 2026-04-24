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

    // <div className="min-h-screen py-8 bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 px-4 transition-colors duration-300">
    //   {/* Content Wrapper */}
    //   <div className="max-w-3xl mx-auto mt-4 text-center">
    //     {/* Heading */}
    //     <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
    //       Checkout Roadmap
    //     </h1>

    //     <div className="flex flex-col items-center max-w-2xl mx-auto">
    //       <div className="mt-8 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900 border border-transparent dark:border-gray-700 transition-colors duration-300">
    //         <TextareaAutosize
    //           value={roadmap?.roadmap || ""}
    //           readOnly
    //           className="w-full h-80 p-4 border dark:border-gray-700 rounded-2xl focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200"
    //         />
    //       </div>

    //       <div className="w-full flex justify-between mt-6">

    //         <button
    //           className="px-6 h-12 flex items-center justify-center bg-red-600 dark:bg-red-700 text-white rounded-xl hover:bg-red-700 dark:hover:bg-red-800 transition min-w-[120px]"
    //           onClick={() => navigate("/get-started")}
    //         >
    //           Back
    //         </button>

    //         <button
    //           disabled={loading}
    //           onClick={handleSaveRoadmap}
    //           className={`px-6 h-12 flex items-center justify-center ${
    //             loading
    //               ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
    //               : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
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


    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950 px-4">

  {/* Background (same system) */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
      style={{
        background: "radial-gradient(circle, #6366f1, #3b82f6)",
        top: "-10%",
        left: "-10%",
      }}
    />
    <div
      className="absolute w-[400px] h-[400px] rounded-full opacity-15 dark:opacity-10 blur-3xl"
      style={{
        background: "radial-gradient(circle, #8b5cf6, #06b6d4)",
        bottom: "-10%",
        right: "-5%",
      }}
    />
  </div>

  <div className="relative z-10 min-h-screen flex justify-center pt-12">

    <div className="w-full max-w-4xl text-center mt-8">

      {/* Badge */}
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-6">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        Your AI Generated Roadmap
      </span>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
        Review your{' '}
        <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          roadmap
        </span>
      </h1>

      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-xl mx-auto">
        Take a quick look before saving.
      </p>

      {/* Roadmap Card */}
      <div className="relative p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-indigo-500/10 text-left">

        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scroll">
          <pre className="whitespace-pre-wrap text-sm md:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
            {roadmap?.roadmap || "No roadmap generated..."}
          </pre>
        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

        {/* Back */}
        <button
          onClick={() => navigate("/get-started")}
          className="px-8 py-4 rounded-2xl font-bold border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-400 hover:text-red-600 transition-all duration-300 hover:scale-105"
        >
          ← Back
        </button>

        {/* Save */}
        <button
          disabled={loading}
          onClick={handleSaveRoadmap}
          className={`group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 ${
            loading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "hover:scale-105 shadow-lg shadow-indigo-500/25"
          }`}
          style={!loading ? { background: "linear-gradient(135deg, #6366f1, #3b82f6)" } : {}}
        >
          <span className="relative z-10 flex items-center gap-2 justify-center min-w-[140px]">
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Save & Continue
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </span>

          {!loading && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #2563eb)",
              }}
            />
          )}
        </button>

      </div>

    </div>
  </div>

  {/* Optional scrollbar styling */}
  <style>{`
    .custom-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #6366f1;
      border-radius: 10px;
    }
  `}</style>
</div>

  );
};

export default Roadmap;
