import React, { useEffect, useState } from "react";
import { getLearningById, getUsersLearnings } from "../../utils/repository/learnings";
import { useAtom } from "jotai";
import { activeLearningAtom, authUserAtom } from "../../store/other";
import Loader from "../../components/globalComponents/Loader";
import { useLocation, useNavigate } from "react-router-dom";

const MyLearnings = () => {
  const [tab, setTab] = useState("active");
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const [learning, setLearning] = useAtom(activeLearningAtom);
  const [data, setData] = useState([]);
  const [activeLearnings, setActiveLearnings] = useState([]);
  const [completedLearnings, setCompletedLearnings] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsersLearning = async () => {
    setLoading(true);
    const userId = authUser?.userDetails?.id;
    const response = await getUsersLearnings(userId);
    setLoading(false);
    const data = response?.data || [];
    const temp = (data ?? []).filter(item => !item?.isCompleted );
    const temp1 = (data ?? []).filter(item => item?.isCompleted );
    
    setActiveLearnings(temp);
    setCompletedLearnings(temp1);
  };

  const handleSelectLearning = async(id = "") => {
    if(id == null || id == "")return;

    const response = await getLearningById(id);
    if(!response) return;

    if(response && response?.data){
      setLearning(response?.data || {});
      navigate(`${location?.pathname}/learning`);
    }
    
  }

  useEffect(() => {
    if (authUser?.userDetails?.id) {
      fetchUsersLearning();
    }
  }, [authUser]);

  return (

    <>
  {loading ? (
    <Loader />
  ) : (

    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950 px-6 md:px-0 py-16">

  {/* Background (same system) */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
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

  <div className="relative z-10 max-w-7xl mx-auto">

    {/* Header */}
    <div className="mb-10">
      <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
        My{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Learnings
        </span>{" "}
        📚
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Track your progress and continue your learning journey.
      </p>
    </div>

    {/* Tabs */}
    <div className="flex gap-4 mb-10">
      <button
        onClick={() => setTab("active")}
        className={`px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 ${
          tab === "active"
            ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/25"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300"
        }`}
      >
        Active
      </button>

      <button
        onClick={() => setTab("completed")}
        className={`px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 ${
          tab === "completed"
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-300"
        }`}
      >
        Completed
      </button>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {(tab === "active" ? activeLearnings : completedLearnings)?.map((item, index) => (
        <div
          key={index}
          className="group relative p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
        >

          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl" />

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {item?.topic || ""}
          </h2>

          {/* Progress */}
          <div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                style={{ width: `${item?.progress || 0}%` }}
              />
            </div>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              {item?.progress || 0}% completed
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => handleSelectLearning(item?.id)}
            className="mt-6 w-full group relative px-4 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {tab === "active"
                ? item.isStarted
                  ? "Continue"
                  : "Start Learning"
                : "View"}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
              style={{ background: "linear-gradient(135deg, #4f46e5, #2563eb)" }}
            />
          </button>

        </div>
      ))}

    </div>
  </div>
</div>



  )}
</>


  );
};

export default MyLearnings;
