import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const LearningAccordian = ({ text }) => {
  const formattedText = text.replace(/\\n/g, "\n");
  return (
    <Accordion defaultExpanded sx={{ borderRadius: "12px", boxShadow: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>
          Notes
        </Typography>
      </AccordionSummary>

      <AccordionDetails>

      <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-3 mb-1" {...props} />,
        
        p: ({node, ...props}) => <p className="mb-2" {...props} />,
        
        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-2" {...props} />,
        li: ({node, ...props}) => <li className="mb-1" {...props} />,
        
        code({inline, className, children, ...props}) {
          return !inline ? (
            <pre className="bg-gray-800 text-white p-3 rounded-lg overflow-auto my-3">
              <code {...props}>{children}</code>
            </pre>
          ) : (
            <code className="bg-gray-200 px-1 rounded">{children}</code>
          );
        }
      }}
    >
      {formattedText}
    </ReactMarkdown>

      </AccordionDetails>


     
    </Accordion>

    
  );
};

export default LearningAccordian;