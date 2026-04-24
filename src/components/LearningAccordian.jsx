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
        borderRadius: "12px",
        boxShadow: 2,
        backgroundColor: isDark ? "#1f2937" : "#ffffff", // gray-800 : white
        color: isDark ? "#f3f4f6" : "#111827", // gray-100 : gray-900
        "& .MuiAccordionSummary-root": {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderRadius: "12px",
        },
        "& .MuiAccordionDetails-root": {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderRadius: "12px",
        },
        "& .MuiSvgIcon-root": {
          color: isDark ? "#9ca3af" : "#374151", // gray-400 : gray-700
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          fontWeight={600}
          sx={{ color: isDark ? "#f3f4f6" : "#111827" }}
        >
          Notes
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <div className="prose max-w-none break-words leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium mt-3 mb-2 text-gray-800 dark:text-gray-200">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-2 leading-7 text-gray-700 dark:text-gray-300">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-2 text-gray-700 dark:text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-2 text-gray-700 dark:text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="mb-1 text-gray-700 dark:text-gray-300">
                  {children}
                </li>
              ),
              code({ node, inline, className, children, ...props }) {
                const isCodeBlock = className?.startsWith("language-");
                return isCodeBlock ? (
                  <pre className="p-3 bg-gray-100 dark:bg-gray-900 rounded overflow-auto border border-gray-200 dark:border-gray-700">
                    <code
                      className={`${className} text-gray-800 dark:text-gray-200`}
                      {...props}
                    >
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code
                    className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-1 rounded break-words border border-gray-200 dark:border-gray-700"
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
