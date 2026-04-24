import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { activeLearningAtom } from "../../store/other";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/globalComponents/Loader";
import {
  generateNotesForTopic,
  generateQuizForTopic,
  getNotesById,
  getVideoForTopic,
} from "../../utils/repository/learnings";
import { saveRoadmap } from "../../utils/repository/getStarted";
import LearningAccordion from "../../components/LearningAccordian";
import QuizModal from "../../components/quiz/QuizModal";
import MemoizedIframe from "../../components/globalComponents/MemoizedIframe";

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
  const [activeTopicForQuiz, setActiveTopicForQuiz] = useState({});
  const [currentStep, setCurrentStep] = useState({});
  const [currentTopic, setCurrentTopic] = useState({});
  const [questionsForQuiz, setQuestionsForQuiz] = useState([]);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [subtopicCount, setSubtopicCount] = useState(0);
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

  const toggleTopic = async (stepIndex, topicIndex) => {
    const updated = structuredClone(data);

    if (updated.roadmap[stepIndex].topics[topicIndex].isCompleted) return;

    setLoading(true);
    setTextForLoading((prev) => [...prev, "...Generating quiz"]);
    const res = await generateQuizForTopic(
      `${currentTopic?.topicName} in ${data?.topic}`,
    );
    const obj = JSON.parse(res?.data);
    setQuestionsForQuiz(obj?.questions || []);
    setOpenQuiz(true);
    setActiveTopicForQuiz({ stepIndex, topicIndex });
    setLoading(false);
    setTextForLoading([]);
  };

  const handleQuizComplete = async () => {
    setLoading(true);

    const updated = structuredClone(data);

    updated.roadmap[activeTopicForQuiz?.stepIndex].topics[
      activeTopicForQuiz?.topicIndex
    ].isCompleted = true;
   
    updated.roadmap[activeTopicForQuiz?.stepIndex].isCompleted =
      updated.roadmap[activeTopicForQuiz?.stepIndex].topics.every(
        (t) => t.isCompleted,
      );

    // check count is near 100
    let temp = Math.floor((1 / subtopicCount) * 100 * 100) / 100;

    if ((updated?.progress + (2 * temp)) > 100) {
      updated.progress = 100;
      updated.isCompleted = true;
    } else {
      updated.progress = Math.floor((updated.progress + temp) * 100) / 100;
    }

    const response = await saveRoadmap(updated);
    setData(updated);
    setOpenQuiz(false);
    setQuestionsForQuiz([]);
    setLoading(false);
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
    setTextForLoading((prev) => [
      ...prev,
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
    setTextForLoading([]);
  };

  const fetchNotes = async (id) => {
    setLoading(true);
    setTextForLoading((prev) => [...prev, "...Fetching Notes"]);
    const response = await getNotesById(id);

    setNotes(response?.data?.data || "");

    setLoading(false);
    setTextForLoading([]);
  };

  const generateNotes = async (topic) => {
    setLoading(true);
    setTextForLoading((prev) => [
      ...prev,
      "...generating Notes",
      "...this may take some time",
    ]);

    const response = await generateNotesForTopic(`${topic} in ${data?.topic}`);

    if (response && response?.data && Object.keys(response?.data).length > 0) {
      setNotes(response?.data?.data || "");
    }

    let temp = [...data?.roadmap];

    temp[activeStep].topics[activeTopic].docId = response?.data?.id || "";

    let dataToSend = {
      ...data,
      roadmap: temp,
    };

    const response1 = await saveRoadmap(dataToSend);
    setLoading(false);
    setTextForLoading([]);
  };

  useEffect(() => {
    if (data && data?.roadmap?.length > 0) {
      setCurrentStep(data.roadmap[activeStep] || {});
    }
  }, [data, activeStep]);

  useEffect(() => {
    if (Object.keys(currentStep)?.length > 0) {
      setCurrentTopic(currentStep.topics[activeTopic] || {});
    }
  }, [currentStep, activeTopic]);

  useEffect(() => {
    if (Object.keys(currentTopic)?.length > 0) {
      if (currentTopic?.videoLink && currentTopic?.videoLink?.length > 0) {
        setVideoUrl(currentTopic?.videoLink);
      } else {
        setVideoUrl("");
        fetchVideo(currentTopic?.topicName);
      }

      if (currentTopic?.docId && currentTopic?.docId?.length > 0) {
        setNotes("");
        fetchNotes(currentTopic?.docId);
      } else {
        setNotes("");
        generateNotes(currentTopic?.topicName);
      }
    }
  }, [currentTopic]);

  useEffect(() => {
    if (
      data?.roadmap &&
      (data?.roadmap || [])?.length > 0 &&
      subtopicCount == 0
    ) {
      let count = 0;
      (data?.roadmap || [])?.forEach((item) => {
        count += (item?.topics || [])?.length;
      });
      setSubtopicCount(count || 0);
    }
  }, [data]);

  return loading ? (
    <Loader texts={[...textForLoading]} />
  ) : (

<div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  <div className="flex flex-col md:flex-row min-h-screen">

    {/* LEFT SIDEBAR */}
    <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl md:sticky top-0 md:h-screen overflow-x-auto md:overflow-y-auto">
      
      <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg md:text-xl font-black">Steps</h2>
      </div>

      <div className="p-3 md:p-4 flex md:block gap-3 md:space-y-3 overflow-x-auto">
        {(data?.roadmap ?? []).map((step, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isEnabled(index)) return;
              setActiveStep(index);
              setActiveTopic(0);
            }}
            className={`min-w-[160px] md:w-full text-left p-3 md:p-4 rounded-2xl border transition-all duration-300 ${
              activeStep === index
                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg"
                : isEnabled(index)
                  ? "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-indigo-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            }`}
          >
            {step?.stepName}
          </button>
        ))}
      </div>
    </aside>

    {/* MAIN */}
    <main className="flex-1 p-4 md:p-6">

      <h1 className="text-2xl md:text-3xl font-black mb-4 md:mb-6">
        {data?.topic}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">

        {/* TOPICS */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl md:rounded-3xl p-3 md:p-4">
            
            <h3 className="font-bold mb-3">Topics</h3>

            <div className="space-y-2">
              {(currentStep?.topics ?? []).map((topic, index) => (
                <div
                  key={index}
                  onClick={() => setActiveTopic(index)}
                  className={`p-3 rounded-xl cursor-pointer transition ${
                    activeTopic === index
                      ? "bg-indigo-50 dark:bg-indigo-900/40"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      disabled={topic?.videoLink == "" || topic?.docId == ""}
                      checked={topic.isCompleted}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleTopic(activeStep, index);
                      }}
                      className="accent-indigo-600"
                    />
                    <span
                      className={`text-sm ${
                        topic.isCompleted
                          ? "text-gray-400"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {topic.topicName}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* VIDEO */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl md:rounded-3xl p-3 md:p-4">
            
            <h3 className="font-bold mb-3">
              {currentTopic?.topicName}
            </h3>

            <div className="rounded-xl overflow-hidden border dark:border-gray-700">
              {videoUrl ? (
                <MemoizedIframe src={videoUrl || ""} />
              ) : (
                <div className="h-48 md:h-64 flex items-center justify-center text-gray-500">
                  Loading...
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* ACCORDION FULL WIDTH */}
      <div className="mt-5 md:mt-8">
        <LearningAccordion text={notes} />
      </div>

      <QuizModal
        questions={questionsForQuiz || []}
        onComplete={handleQuizComplete}
      />

    </main>
  </div>
</div>

  );
};

export default LearningPage;
