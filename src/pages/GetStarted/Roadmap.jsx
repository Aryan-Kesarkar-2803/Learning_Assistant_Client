import { useAtom } from "jotai";
import React from "react";
import { authUserAtom, roadmapAtom } from "../../store/other";
import { TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveRoadmap } from "../../utils/repository/getStarted";

const Roadmap = () => {
  const [roadmap, setRoadmap] = useAtom(roadmapAtom);
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const navigate = useNavigate();

  if (!roadmap?.roadmap || roadmap?.roadmap == "") {
    navigate("/get-started");
  }

  const handleSaveRoadmap = async () => {
    const formattedRoadmap = convertToRoadmap(roadmap?.roadmap);
   
    const learning = {
      roadmap: formattedRoadmap || [],
      topic: roadmap?.topic || '',
      userId: authUser?.userDetails?.id || '',
    }
//  console.log(learning); return;
    const response = await saveRoadmap(learning);

    if(!response){
      return;
    }
    console.log(response);
  };

  const convertToRoadmap = (text) => {
    const steps = text.split("•").filter(Boolean);

    const roadmap = steps.map((stepBlock) => {
      const lines = stepBlock.trim().split("\n").filter(Boolean);

      const stepName = lines[0].replace(":", "").trim();

      const topics = lines.slice(1).map((line) => ({
        topicName: line.replace("-", "").trim(),
        videoLink: "",
        docLink: "",
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

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200 px-4">
      {/* Content Wrapper */}
      <div className="max-w-3xl mx-auto mt-4 text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800">Checkout RoadMap</h1>

        {/* Subtext */}
        {/* <p className="mt-2 text-gray-600">
      Enter a topic and get a personalized roadmap instantly.
    </p> */}

        {/* Input */}
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <div className="mt-8 w-full bg-white rounded-2xl shadow-md">
            <TextareaAutosize
              value={roadmap?.roadmap || ""}
              readOnly
              className="w-full h-80 p-4 border rounded-2xl focus:outline-none"
            />
          </div>
          <div className="w-full flex justify-between mt-2">
            <button
              className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl self-start hover:bg-red-700 transition"
              onClick={() => {
                navigate("/get-started");
              }}
            >
              Back
            </button>

            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl self-end hover:bg-blue-700 transition"
              onClick={handleSaveRoadmap}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
