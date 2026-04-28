import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoadmap } from "../../utils/repository/getStarted";
import { useAtom } from "jotai";
import { roadmapAtom } from "../../store/other";
import { errorNotification } from "../../utils/toast";

const GetStarted = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useAtom(roadmapAtom);

  const handleProceed = async () => {
    if (roadmap?.topic == null || roadmap?.topic == "") return;

    setLoading(true);

    const response = await generateRoadmap(roadmap?.topic?.trim());
    setLoading(false);

    if (response) {
      const data = response?.data || "";

      if (
        data.includes("Request rejected") ||
        data.includes("Out of scope") ||
        data.includes("Invalid input")
      ) {
        errorNotification({
          title: "Topic not supported",
          message: "Try different or more specific topic",
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
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950 px-4  transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #6366f1, #3b82f6)",
            top: "-12%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full opacity-15 dark:opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #8b5cf6, #06b6d4)",
            bottom: "-10%",
            right: "-6%",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex justify-center pt-16 ">
        <div className="w-full max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            AI-Powered Learning Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-black leading-tight text-gray-900 dark:text-white">
            What do you want to{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                learn
              </span>
              <span
                className="absolute bottom-1 left-0 w-full h-3 opacity-20 rounded"
                style={{
                  background: "linear-gradient(90deg, #6366f1, #06b6d4)",
                }}
              />
            </span>{" "}
            today? 🚀
          </h1>

          <p className="mt-5 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Enter any topic and get a personalized roadmap with smart guidance,
            progress tracking, and learning support.
          </p>

          <div className="mt-12 max-w-3xl mx-auto p-3 md:p-4 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-indigo-500/10">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="e.g. React, Machine Learning, System Design..."
                  value={roadmap?.topic}
                  onChange={(e) => {
                    setRoadmap((prev) => ({
                      ...prev,
                      topic: e.target.value,
                    }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setRoadmap((prev) => ({
                        ...prev,
                        topic: prev.topic.trim(),
                      }));
                      handleProceed();
                    }
                  }}
                  className="w-full px-5 py-4 rounded-2xl bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                />
              </div>

              <button
                disabled={loading}
                onClick={handleProceed}
                className={`group relative px-7 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "hover:scale-[1.02] shadow-lg shadow-indigo-500/25"
                }`}
                style={
                  !loading
                    ? {
                        background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                      }
                    : {}
                }
              >
                <span className="relative z-10 flex items-center justify-center gap-2 min-w-[120px]">
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Proceed
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
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

          <p className="mt-5 text-sm text-gray-400 dark:text-gray-500">
            Try: DSA, Java, Spring Boot, Web Development, AI, Cloud Computing
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
