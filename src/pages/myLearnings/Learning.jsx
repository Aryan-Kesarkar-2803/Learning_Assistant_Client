import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { activeLearningAtom } from "../../store/other";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/globalComponents/Loader";
import { getVideoForTopic } from "../../utils/repository/learnings";
import { saveRoadmap } from "../../utils/repository/getStarted";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  const videoIdMatch = url.match(/(?:youtube\.com.*v=|youtu\.be\/)([^&?/]+)/);
  const videoId = videoIdMatch?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

const LearningPage = () => {
  const [learning] = useAtom(activeLearningAtom);
  const [data, setData] = useState(learning);
  const [loading, setLoading] = useState(false);
  const [textForLoading, setTextForLoading] = useState([]);

  const [activeStep, setActiveStep] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const [currentStep, setCurrentStep] = useState({});
  const [currentTopic, setCurrentTopic] = useState({});
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  if (!data) {
    navigate("/my-learnings");
    return;
  }

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
    if (index == 0 && !data?.roadmap[0]?.isCompleted) return true;

    if (data?.roadmap[index]?.isCompleted) return true;

    if (
      !data?.roadmap[index]?.isCompleted &&
      data?.roadmap[index - 1]?.isCompleted
    ) {
      return true;
    }

    return false;
  };

  const fetchVideo = async (topic) => {
    setLoading(true);
    setTextForLoading([
      "...please wait",
      "...fetching video",
      "...this may take some time",
    ]);

    const res = await getVideoForTopic(`${topic} in ${data?.topic}` || "");
    const plainUrl = res?.data?.videoLink || "";
    const url = getYouTubeEmbedUrl(plainUrl);

    let temp = [...data?.roadmap];

    temp[activeStep].topics[activeTopic].videoLink = url || "";

    let dataToSend = {
      ...data,
      roadmap: temp,
    };

    const response = await saveRoadmap(dataToSend);

    setVideoUrl(url);

    setLoading(false);
  };

  useEffect(() => {
    if (data && data?.roadmap?.length > 0) {
      setCurrentStep(data.roadmap[activeStep] || {});
    }
  }, [data,activeStep]);

  useEffect(() => {
    if (Object.keys(currentStep)?.length > 0) {
      setCurrentTopic(currentStep.topics[activeTopic] || {});
    }
  }, [currentStep, activeTopic]);

  useEffect(() => {
    if (Object.keys(currentTopic)?.length > 0) {
      if (currentTopic?.videoLink && currentTopic?.videoLink?.length > 0) {
        setVideoUrl(currentTopic?.videoLink);
        return;
      }
      fetchVideo(currentTopic?.topicName);
    }
  }, [currentTopic]);



  return loading ? (
    <Loader texts={textForLoading} />
  ) : (
    <div className="min-h-screen flex bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200">
      {/* LEFT SIDEBAR - STEPS */}
      <div className="w-64 bg-white border-r p-4 space-y-3">
        <h2 className="text-lg font-bold mb-4">Steps</h2>

        {(data?.roadmap ?? [])?.map((step, index) => (
          <div
            key={index}
            onClick={() => {
              if (!isEnabled(index)) return; // ❌ prevent click
              setActiveStep(index);
              setActiveTopic(0);
            }}
            className={`p-3 rounded-xl transition ${
              isEnabled(index)
                ? activeStep === index
                  ? "bg-blue-100 text-blue-700 cursor-pointer"
                  : "hover:bg-gray-100 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
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

            {(currentStep?.topics ?? []).map((topic, index) => (
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
                  // width="560" height="315"
                  className="w-full aspect-video"
                  src={videoUrl}
                  // src={"https://www.youtube.com/embed/uPkjgVv5Ioc"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
