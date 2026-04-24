import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { solveDoubt } from "../utils/repository/learnings";
import { alertNotification, errorNotification } from "../utils/toast";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { useAtom } from "jotai";
import { activeLearningAtom } from "../store/other";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatSize, setChatSize] = useState("normal"); // "normal" | "expanded"
  const [expanded, setExpanded] = useState(false);
  const [learningAtom] = useAtom(activeLearningAtom)

  const isMobile = window.innerWidth < 640;

  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 How can I help you learn today?" },
  ]);

  const [input, setInput] = useState("");

  const formatText = (text) => {
    return text.replace(/\\n/g, "\n");
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    setLoading(true);
    const baseTopic = learningAtom?.topic || "";
    const res = await solveDoubt(`${input} in context with ${baseTopic}`);

    if (!res) {
      errorNotification({
        message: "Error in Solving Doubt",
      });
      setLoading(false);
      return;
    }

    // const message = formatText(res?.data || "");
    const message = res?.data || '';

    setMessages((prev) => [...prev, { role: "bot", text: message || "" }]);

    setLoading(false);
  };

  

  const toggleSize = () => {
    setChatSize((prev) => (prev === "normal" ? "expanded" : "normal"));
  };

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, loading]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition z-50"
      >
        <FiMessageCircle size={20} />
        <span className="text-sm font-medium">AI Tutor</span>
      </button>

      <div
        className={`
          fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden
          bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
          shadow-2xl rounded-2xl
          transition-all duration-300 ease-out origin-bottom-right

          ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-90 translate-y-6 pointer-events-none"
          }

          ${expanded && !isMobile  ? "w-[500px] h-[640px]" : "w-[340px] h-[520px]"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
          <div className="font-semibold text-sm">Ask Doubts</div>

          <div className="flex items-center gap-2">
            {
              !isMobile &&
              <button onClick={() => setExpanded((p) => !p)}>
              {expanded ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
            </button>
            }
            

            <button onClick={() => setOpen(false)}>
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gray-50 dark:bg-gray-950">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-2xl break-words
      ${
        m.role === "user"
          ? "ml-auto bg-indigo-500 text-white rounded-br-none max-w-[70%]"
          : "mr-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none shadow-sm max-w-[90%]"
      }
    `}
            >
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </div>
          ))}

          {loading && (
            <div className="mr-auto flex gap-1 px-3 py-2 bg-white dark:bg-gray-800 rounded-2xl w-fit">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 bg-white dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something..."
            className="flex-1 px-3 py-2 dark:text-white text-sm rounded-xl bg-gray-100 dark:bg-gray-800 outline-none"
          />

          <button
            onClick={handleSend}
            className="px-4 py-2 text-sm rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
