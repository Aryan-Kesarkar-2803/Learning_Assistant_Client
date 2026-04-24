import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button ,IconButton } from "@mui/material";
import QuizComponent from "./QuizComponent";
import CloseIcon from "@mui/icons-material/Close";

const QuizModal = ({ questions = [], onComplete }) => {
  const [open, setOpen] = useState(questions?.length > 0);
  // const [quizCompleted, setQuizCompleted] = useState(false);


  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

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
    <>

      {/* <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Quiz
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <QuizComponent questions={questions} onComplete={onComplete} />
        </DialogContent>
      </Dialog> */}

      <Dialog
  open={open}
  onClose={() => setOpen(false)}
  fullWidth
  maxWidth="md"
  PaperProps={{
    sx: {
      borderRadius: "20px",
      overflow: "hidden",
      border: "1px solid",
      borderColor: isDark ? "rgba(55,65,81,0.9)" : "rgba(229,231,235,1)",
      background: isDark
        ? "linear-gradient(180deg, #111827 0%, #0f172a 100%)"
        : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      boxShadow: isDark
        ? "0 20px 50px rgba(0,0,0,0.5)"
        : "0 20px 50px rgba(15,23,42,0.12)",
      backdropFilter: "blur(12px)",
    },
  }}
>
  {/* HEADER */}
  <DialogTitle
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      px: 3,
      py: 2,
      borderBottom: "1px solid",
      borderColor: isDark ? "rgba(55,65,81,0.8)" : "rgba(229,231,235,1)",
      background: isDark
        ? "linear-gradient(135deg, #1e293b, #111827)"
        : "linear-gradient(135deg, #eef2ff, #f1f5f9)",
    }}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #6366f1, #3b82f6)",
        }}
      >
        <span className="text-white font-bold text-lg">Q</span>
      </div>

      <div>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Quiz
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Test your understanding
        </p>
      </div>
    </div>

    <IconButton
      onClick={() => setOpen(false)}
      sx={{
        color: isDark ? "#cbd5e1" : "#374151",
        "&:hover": {
          backgroundColor: isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.05)",
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  {/* CONTENT */}
  <DialogContent
    sx={{
      px: 3,
      py: 3,
      backgroundColor: "transparent",
    }}
  >
    <div className="rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-gray-200 dark:border-gray-800 p-4">
      <QuizComponent questions={questions} onComplete={onComplete} />
    </div>
  </DialogContent>
</Dialog>
    </>
  );
};

export default QuizModal;
