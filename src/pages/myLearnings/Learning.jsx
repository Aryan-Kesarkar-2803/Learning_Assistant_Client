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
    // <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200">
    //   {/* MAIN CONTENT */}
    //   <div className="flex flex-1">
    //     {/* LEFT SIDEBAR */}
    //     <div className="w-64 bg-white border-r p-4 space-y-3 h-[calc(100vh-0px)] sticky top-0">
    //       <h2 className="text-lg font-bold mb-4">Steps</h2>

    //       {(data?.roadmap ?? []).map((step, index) => (
    //         <div
    //           key={index}
    //           onClick={() => {
    //             if (!isEnabled(index)) return;
    //             setActiveStep(index);
    //             setActiveTopic(0);
    //           }}
    //           className={`p-3 rounded-xl transition ${
    //             isEnabled(index)
    //               ? activeStep === index
    //                 ? "bg-blue-100 text-blue-700 cursor-pointer"
    //                 : "hover:bg-gray-100 cursor-pointer"
    //               : "bg-gray-100 text-gray-400 cursor-not-allowed"
    //           }`}
    //         >
    //           {step?.stepName}
    //         </div>
    //       ))}
    //     </div>

    //     {/* RIGHT SIDE */}
    //     <div className="flex-1 p-6 overflow-auto">
    //       {/* HEADER */}
    //       <h1 className="text-2xl font-bold mb-6">{data.topic}</h1>

    //       <div className="grid grid-cols-3 gap-6 items-start">
    //         {/* TOPICS LIST */}
    //         <div className="col-span-1 bg-white rounded-xl p-4 shadow-sm space-y-3 h-fit">
    //           <h3 className="font-semibold mb-2">Topics</h3>

    //           {(currentStep?.topics ?? []).map((topic, index) => (
    //             <div
    //               key={index}
    //               onClick={() => setActiveTopic(index)}
    //               className={`flex items-center gap-2 p-2 rounded-lg ${
    //                 activeTopic === index ? "bg-blue-50" : "hover:bg-gray-100"
    //               }`}
    //             >
    //               <input
    //                 type="checkbox"
    //                 disabled={topic?.videoLink == '' || topic?.docId == ''}
    //                 className="h-4 w-4 cursor-pointer"
    //                 checked={topic.isCompleted}
    //                 onChange={(e) => {
    //                   e.stopPropagation();
    //                   toggleTopic(activeStep, index);
    //                 }}
    //               />

    //               <span
    //                 className={`text-sm cursor-default ${
    //                   topic.isCompleted ? " text-gray-400" : ""
    //                 }`}
    //               >
    //                 {topic.topicName}
    //               </span>
    //             </div>
    //           ))}
    //         </div>

    //         {/* VIDEO */}
    //         <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm h-fit">
    //           <h3 className="font-semibold mb-3">{currentTopic.topicName}</h3>

    //           <div className="rounded-lg overflow-hidden border">
    //             {videoUrl ? (
    //               // <iframe
    //               //   className="w-full aspect-video"
    //               //   src={videoUrl}
    //               //   loading="lazy"
    //               //   title="video"
    //               //   allowFullScreen
    //               // />
    //               <MemoizedIframe src={videoUrl || ""} />
    //             ) : (
    //               <div className="h-64 flex items-center justify-center text-gray-700">
    //                 ... Loading please wait 
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mt-8">
    //         <LearningAccordion text={notes} />
    //       </div>
    //     </div>

    //     <QuizModal
    //       questions={questionsForQuiz || []}
    //       onComplete={handleQuizComplete}
    //     />
    //   </div>
    // </div>

    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-200 via-pink-100 to-purple-200 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 transition-colors duration-300">
  {/* MAIN CONTENT */}
  <div className="flex flex-1">
    {/* LEFT SIDEBAR */}
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 space-y-3 h-[calc(100vh-0px)] sticky top-0 transition-colors duration-300">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Steps</h2>

      {(data?.roadmap ?? []).map((step, index) => (
        <div
          key={index}
          onClick={() => {
            if (!isEnabled(index)) return;
            setActiveStep(index);
            setActiveTopic(0);
          }}
          className={`p-3 rounded-xl transition ${
            isEnabled(index)
              ? activeStep === index
                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 cursor-pointer"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
              : "bg-gray-100 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          }`}
        >
          {step?.stepName}
        </div>
      ))}
    </div>

    {/* RIGHT SIDE */}
    <div className="flex-1 p-6 overflow-auto">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{data.topic}</h1>

      <div className="grid grid-cols-3 gap-6 items-start">
        {/* TOPICS LIST */}
        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm dark:shadow-gray-900 border border-transparent dark:border-gray-700 space-y-3 h-fit transition-colors duration-300">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Topics</h3>

          {(currentStep?.topics ?? []).map((topic, index) => (
            <div
              key={index}
              onClick={() => setActiveTopic(index)}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-150 ${
                activeTopic === index
                  ? "bg-blue-50 dark:bg-blue-900/40"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <input
                type="checkbox"
                disabled={topic?.videoLink == "" || topic?.docId == ""}
                className="h-4 w-4 cursor-pointer accent-blue-600 dark:accent-blue-400"
                checked={topic.isCompleted}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleTopic(activeStep, index);
                }}
              />
              <span
                className={`text-sm cursor-default ${
                  topic.isCompleted
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {topic.topicName}
              </span>
            </div>
          ))}
        </div>

        {/* VIDEO */}
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm dark:shadow-gray-900 border border-transparent dark:border-gray-700 h-fit transition-colors duration-300">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">{currentTopic.topicName}</h3>

          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {videoUrl ? (
              <MemoizedIframe src={videoUrl || ""} />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-700 dark:text-gray-400">
                ... Loading please wait
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <LearningAccordion text={notes} />
      </div>
    </div>

    <QuizModal
      questions={questionsForQuiz || []}
      onComplete={handleQuizComplete}
    />
  </div>
</div>
  );
};

export default LearningPage;
