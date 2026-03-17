import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    // if (!topic.trim()) return;
    // navigate("/learn", { state: { topic } });
    console.log('topic - ',topic)
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
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleProceed()}
        className="flex-1 px-4 py-3 rounded-xl focus:outline-none"
      />

      <button
        onClick={handleProceed}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Proceed
      </button>
    </div>

  </div>
</div>
  );
};

export default GetStarted;