import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoadmap } from "../../utils/repository/getStarted";
import { useAtom } from "jotai";
import { roadmapAtom } from "../../store/other";
import { errorNotification } from "../../utils/toast";

const GetStarted = () => {
  // const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useAtom(roadmapAtom);

  const handleProceed = async () => {
    setLoading(true);

    const response = await generateRoadmap(roadmap?.topic?.trim());
    setLoading(false);

    if (response) {
      const data = response?.data || "";

      if (
        data == "Request rejected: topic not allowed." ||
        data == "Out of scope: I cannot generate a roadmap for this topic."
      ) {
        errorNotification({
          title: "Topic not allowed",
          message: "Please change the topic",
        });
        return;
      }

      setRoadmap((prev) => ({
        ...prev,
        roadmap: data,
      }));
      navigate("/get-started/roadmap");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200 px-4">
      {/* Content Wrapper */}
      <div className="max-w-3xl mx-auto pt-24 text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800">
          What do you want to learn? 🚀
        </h1>

        {/* Subtext */}
        <p className="mt-2 text-gray-600">
          Enter a topic and get a personalized roadmap instantly.
        </p>

        {/* Input */}
        <div className="mt-8 flex gap-2 bg-white p-2 rounded-2xl shadow-md max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="e.g. React, Machine Learning..."
            value={roadmap?.topic}
            onChange={(e) => {
              setRoadmap((prev) => ({
                ...prev,
                topic: e?.target?.value,
              }));
            }}
            onKeyDown={(e) => e.key === "Enter" && handleProceed()}
            className="flex-1 px-4 py-3 rounded-xl focus:outline-none"
          />
          {/* 
      <button
        disabled={loading}
        onClick={handleProceed}
        className={`px-6 py-3 ${loading ? "bg-gray-400" :"bg-blue-600"} text-white rounded-xl ${!loading && "hover:bg-blue-700"} transition`}
      >
        Proceed
      </button> */}

          <button
            disabled={loading}
            onClick={handleProceed}
            className={`px-6 py-3 flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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
  );
};

export default GetStarted;
