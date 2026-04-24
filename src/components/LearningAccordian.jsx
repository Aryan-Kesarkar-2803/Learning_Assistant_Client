import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

const LearningAccordian = ({ text = "" }) => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const formattedText = text
    ?.replace(/\\n/g, "\n")
    .replace(/ +\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (

    <Accordion
  defaultExpanded
  sx={{
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid",
    borderColor: isDark ? "rgba(55, 65, 81, 0.9)" : "rgba(229, 231, 235, 1)",
    boxShadow: isDark
      ? "0 12px 30px rgba(0,0,0,0.35)"
      : "0 12px 30px rgba(15, 23, 42, 0.08)",
    background: isDark
      ? "linear-gradient(180deg, #111827 0%, #0f172a 100%)"
      : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    color: isDark ? "#f3f4f6" : "#111827",
    "&:before": {
      display: "none",
    },
    "& .MuiAccordionSummary-root": {
      minHeight: "72px",
      px: 2,
      backgroundColor: "transparent",
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
    "& .MuiAccordionDetails-root": {
      px: 2.5,
      pb: 2.5,
      pt: 0,
      backgroundColor: "transparent",
    },
    "& .MuiSvgIcon-root": {
      color: isDark ? "#cbd5e1" : "#475569",
    },
  }}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #4f46e5, #2563eb)"
            : "linear-gradient(135deg, #6366f1, #3b82f6)",
        }}
      >
        <span className="text-white text-lg font-bold">N</span>
      </div>

      <div>
        <Typography
          fontWeight={700}
          sx={{ color: isDark ? "#f3f4f6" : "#111827", lineHeight: 1.2 }}
        >
          Notes
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
        >
          Read the full explanation below
        </Typography>
      </div>
    </div>
  </AccordionSummary>

  <AccordionDetails>
    <div
      className="prose max-w-none break-words leading-relaxed"
      style={{
        color: isDark ? "#d1d5db" : "#334155",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-black mt-6 mb-3 text-gray-900 dark:text-gray-100">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mt-5 mb-2 text-gray-900 dark:text-gray-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 leading-8 text-gray-700 dark:text-gray-300">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-1 text-gray-700 dark:text-gray-300">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-3 rounded-r-xl text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          code({ node, inline, className, children, ...props }) {
            const isCodeBlock = className?.startsWith("language-");
            return isCodeBlock ? (
              <pre className="my-4 p-4 bg-gray-100 dark:bg-gray-950 rounded-2xl overflow-auto border border-gray-200 dark:border-gray-800 shadow-sm">
                <code
                  className={`${className} text-gray-800 dark:text-gray-200`}
                  {...props}
                >
                  {children}
                </code>
              </pre>
            ) : (
              <code
                className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-lg border border-indigo-100 dark:border-indigo-900 break-words"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {formattedText}
      </ReactMarkdown>
    </div>
  </AccordionDetails>
</Accordion>
  );
};

export default LearningAccordian;
