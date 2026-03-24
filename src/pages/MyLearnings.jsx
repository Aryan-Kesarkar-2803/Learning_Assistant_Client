import React, { useEffect, useState } from "react";
import { getUsersLearnings } from "../utils/repository/learnings";
import { useAtom } from "jotai";
import { authUserAtom } from "../store/other";
import Loader from "../components/globalComponents/Loader";

const MyLearnings = () => {
  const [tab, setTab] = useState("active");
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const [data, setData] = useState([]);
  const [activeLearnings, setActiveLearnings] = useState([]);
  const [completedLearnings, setCompletedLearnings] = useState([])
  const [loading, setLoading] = useState(false);

  // const activeLearnings = [
  //   { title: "React", progress: 60, steps: 6 },
  //   { title: "Machine Learning", progress: 30, steps: 8 },
  // ];

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
        <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200 px-6 py-10">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            My Learnings 📚
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setTab("active")}
              className={`px-5 py-2 rounded-xl ${
                tab === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setTab("completed")}
              className={`px-5 py-2 rounded-xl ${
                tab === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Cards */}

          {tab == "active" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeLearnings ?? []).map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-5">
                  <h2 className="text-xl font-semibold">{item?.topic || ""}</h2>
                  <p className="text-sm text-gray-500">
                    {(item?.roadmap ?? [])?.length} Steps
                  </p>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          tab === "completed" ? "bg-green-600" : "bg-blue-600"
                        }`}
                        style={{ width: `${item?.progress || 10}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                      {item?.progress || 0}% completed
                    </p>
                  </div>

                  <button className="mt-5 w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                    Continue
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(completedLearnings ?? []).map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-5">
                  <h2 className="text-xl font-semibold">{item?.topic || ""}</h2>
                  <p className="text-sm text-gray-500">
                    {(item?.roadmap ?? [])?.length} Steps
                  </p>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          tab === "completed" ? "bg-green-600" : "bg-blue-600"
                        }`}
                        style={{ width: `${item?.progress || 10}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                      {item?.progress || 0}% completed
                    </p>
                  </div>

                  <button className="mt-5 w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyLearnings;
