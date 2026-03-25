// import { useAtom } from "jotai";

// import React, { useEffect, useState } from "react";
// import { activeLearningAtom } from "../../store/other";

// const getYouTubeEmbedUrl = (url) => {
//   if (!url) return "";
//   const videoIdMatch = url.match(/(?:youtube\.com.*v=|youtu\.be\/)([^&?/]+)/);
//   const videoId = videoIdMatch?.[1];
//   return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
// };

// const LearningPage = () => {
//   const [learning] = useAtom(activeLearningAtom);
//   const [data, setData] = useState(learning);
//   const [activeStep, setActiveStep] = useState(0);
//   const [openTopic, setOpenTopic] = useState(null);

//   useEffect(() => {
//     setData(learning);
//   }, [learning]);

//   const toggleTopic = (stepIndex, topicIndex) => {
//     const updated = structuredClone(data);

//     updated.roadmap[stepIndex].topics[topicIndex].isCompleted =
//       !updated.roadmap[stepIndex].topics[topicIndex].isCompleted;

//     updated.roadmap[stepIndex].isCompleted =
//       updated.roadmap[stepIndex].topics.every((t) => t.isCompleted);

//     setData(updated);
//   };

//   if (!data) return null;

//   const currentStep = data.roadmap[activeStep];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-200 px-6 py-10">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         {data.topic} 📘
//       </h1>

//       {/* Step Tabs */}
//       <div className="flex flex-wrap gap-3 mb-8">
//         {data.roadmap.map((step, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               setActiveStep(index);
//               setOpenTopic(null);
//             }}
//             className={`px-5 py-2 rounded-xl border transition ${
//               activeStep === index
//                 ? "bg-blue-600 text-white border-blue-600"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             {step.stepName}
//           </button>
//         ))}
//       </div>

//       {/* Topics Accordion */}
//       <div className="space-y-4">
//         {currentStep.topics.map((topic, topicIndex) => {
//           const isOpen = openTopic === topicIndex;
//           const embedUrl = getYouTubeEmbedUrl(topic.videoLink);

//           return (
//             <div
//               key={topicIndex}
//               className="bg-white rounded-2xl shadow-md overflow-hidden"
//             >
//               <button
//                 onClick={() =>
//                   setOpenTopic(isOpen ? null : topicIndex)
//                 }
//                 className="w-full flex items-center justify-between px-5 py-4 text-left"
//               >
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     checked={topic.isCompleted}
//                     onChange={(e) => {
//                       e.stopPropagation();
//                       toggleTopic(activeStep, topicIndex);
//                     }}
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                   <span
//                     className={`font-medium ${
//                       topic.isCompleted
//                         ? "line-through text-gray-400"
//                         : "text-gray-800"
//                     }`}
//                   >
//                     {topic.topicName}
//                   </span>
//                 </div>

//                 <span className="text-gray-500 text-sm">
//                   {isOpen ? "Hide" : "Show"}
//                 </span>
//               </button>

//               {isOpen && (
//                 <div className="px-5 pb-5">
//                   <div className="mt-3 rounded-xl overflow-hidden border">
//                     {embedUrl ? (
//                       <iframe
//                         className="w-full aspect-video"
//                         src={embedUrl}
//                         title={topic.topicName}
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                       />
//                     ) : (
//                       <div className="p-6 text-gray-500">
//                         No video link available
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default LearningPage;

import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { activeLearningAtom } from "../../store/other";
import { useNavigate } from "react-router-dom";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  const videoIdMatch = url.match(/(?:youtube\.com.*v=|youtu\.be\/)([^&?/]+)/);
  const videoId = videoIdMatch?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

const LearningPage = () => {
  const [learning] = useAtom(activeLearningAtom);
  const [data, setData] = useState(learning);

  const [activeStep, setActiveStep] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (learning && Object.keys(learning || {}).length > 0) {
      setData(learning);
    } else {
      navigate("/my-learnings");
    }
  }, [learning]);

  const toggleTopic = (stepIndex, topicIndex) => {
    const updated = structuredClone(data);

    updated.roadmap[stepIndex].topics[topicIndex].isCompleted =
      !updated.roadmap[stepIndex].topics[topicIndex].isCompleted;

    updated.roadmap[stepIndex].isCompleted = updated.roadmap[
      stepIndex
    ].topics.every((t) => t.isCompleted);

    setData(updated);
  };

  const isEnabled = (index) => {
    if(index == 0 && !data?.roadmap[0]?.isCompleted) return true;

    if(data?.roadmap[index]?.isCompleted) return true;

    if(!data?.roadmap[index]?.isCompleted && data?.roadmap[index-1]?.isCompleted){
        return true;
    }

    return false;
  }

  if (!data) return null;

  const currentStep = data.roadmap[activeStep];
  const currentTopic = currentStep.topics[activeTopic];
  const videoUrl = getYouTubeEmbedUrl(currentTopic.videoLink);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200">
      {/* LEFT SIDEBAR - STEPS */}
      <div className="w-64 bg-white border-r p-4 space-y-3">
        <h2 className="text-lg font-bold mb-4">Steps</h2>

        {data.roadmap.map((step, index) => (
          <div
            key={index}
            onClick={() => {
              if (!isEnabled(index)) return; // ❌ prevent click
              setActiveStep(index);
              setActiveTopic(0);
            }}
            className={`p-3 rounded-xl transition ${
              isEnabled(index)
              ?
              activeStep === index
                  ? "bg-blue-100 text-blue-700 cursor-pointer"
                  : "hover:bg-gray-100 cursor-pointer"
                  :
               "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {step.stepName}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 p-6">
        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-4">{data.topic}</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* TOPICS LIST */}
          <div className="col-span-1 bg-white rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="font-semibold mb-2">Topics</h3>

            {currentStep.topics.map((topic, index) => (
              <div
                key={index}
                onClick={() => setActiveTopic(index)}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                  activeTopic === index ? "bg-blue-50" : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={topic.isCompleted}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleTopic(activeStep, index);
                  }}
                />

                <span
                  className={`text-sm ${
                    topic.isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  {topic.topicName}
                </span>
              </div>
            ))}
          </div>

          {/* VIDEO + CONTENT */}
          <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-3">{currentTopic.topicName}</h3>

            <div className="rounded-lg overflow-hidden border">
              {videoUrl ? (
                <iframe
                  className="w-full aspect-video"
                  src={videoUrl}
                  title="video"
                  allowFullScreen
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">
                  No video available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
