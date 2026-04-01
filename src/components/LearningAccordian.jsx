import React from "react";
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
  const formattedText = text
    ?.replace(/\\n/g, "\n") 
    .replace(/ +\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return (
    <Accordion defaultExpanded sx={{ borderRadius: "12px", boxShadow: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Notes</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <div className="prose max-w-none break-words leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-4 mb-2">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mt-4 mb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium mt-3 mb-2">{children}</h3>
              ),
              p: ({ children }) => <p className="mb-2 leading-7">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-2">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              code({ node, inline, className, children, ...props }) {
                const isCodeBlock = className?.startsWith("language-");

                return isCodeBlock ? (
                  <pre className="p-3 bg-gray-100 rounded overflow-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code
                    className="bg-gray-100 px-1 rounded break-words"
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
