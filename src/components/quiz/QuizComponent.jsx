import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";

const QuizComponent = ({ questions = [], onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
   const [isDark, setIsDark] = useState(
      document.documentElement.classList.contains("dark")
    );
  

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const getScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    return score;
  };

  const submitQuiz = () =>{
      const quizBreak = (questions || []).some(
        (q, i) => q.answer !== answers[i],
      );

      if(quizBreak){
        return;
      }
      onComplete();
      questions = [];
  }

  const progress = (Object.keys(answers).length / questions.length) * 100;

  
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

//    <Box
//   sx={{
//     p: 3,
//     maxWidth: 800,
//     mx: "auto",
//     color: isDark ? "#f3f4f6" : "#111827",
//   }}
// >
//   {/* Header */}
//   <Typography
//     variant="h4"
//     sx={{
//       mb: 3,
//       fontWeight: "bold",
//       color: isDark ? "#f9fafb" : "#111827",
//     }}
//   >
//     Quiz
//   </Typography>

//   {/* Progress */}
//   <Box sx={{ mb: 4 }}>
//     <LinearProgress
//       variant="determinate"
//       value={progress}
//       sx={{
//         height: 8,
//         borderRadius: 10,
//         backgroundColor: isDark ? "#374151" : "#e5e7eb",
//         "& .MuiLinearProgress-bar": {
//           background: "linear-gradient(90deg, #6366f1, #3b82f6)",
//         },
//       }}
//     />
//     <Typography
//       variant="body2"
//       sx={{ mt: 1, color: isDark ? "#9ca3af" : "#4b5563" }}
//     >
//       {Object.keys(answers).length} / {questions.length} answered
//     </Typography>
//   </Box>

//   {/* Questions */}
//   {questions.map((q, index) => {
//     const isCorrect = answers[index] === q.answer;

//     return (
//       <Card
//         key={index}
//         sx={{
//           mb: 3,
//           borderRadius: 4,
//           backdropFilter: "blur(12px)",
//           background: isDark
//             ? "rgba(31, 41, 55, 0.8)"
//             : "rgba(255,255,255,0.9)",
//           border: showResult
//             ? isCorrect
//               ? "2px solid #22c55e"
//               : "2px solid #ef4444"
//             : isDark
//             ? "1px solid #374151"
//             : "1px solid #e5e7eb",
//           boxShadow: isDark
//             ? "0 10px 30px rgba(0,0,0,0.4)"
//             : "0 10px 25px rgba(0,0,0,0.08)",
//         }}
//       >
//         <CardContent>
//           <Typography
//             sx={{
//               mb: 2,
//               fontWeight: 600,
//               color: isDark ? "#f3f4f6" : "#111827",
//             }}
//           >
//             {index + 1}. {q.question}
//           </Typography>

//           <RadioGroup
//             value={answers[index] ?? ""}
//             onChange={(e) => handleChange(index, e.target.value)}
//           >
//             {q.options.map((opt, i) => (
//               <FormControlLabel
//                 key={i}
//                 value={opt}
//                 control={
//                   <Radio
//                     sx={{
//                       color: isDark ? "#9ca3af" : "#6b7280",
//                       "&.Mui-checked": {
//                         color: "#6366f1",
//                       },
//                     }}
//                   />
//                 }
//                 label={
//                   <Typography
//                     sx={{
//                       color: isDark ? "#e5e7eb" : "#374151",
//                     }}
//                   >
//                     {opt}
//                   </Typography>
//                 }
//               />
//             ))}
//           </RadioGroup>

//           {showResult && (
//             <Typography
//               sx={{
//                 mt: 2,
//                 fontWeight: 600,
//                 color: isCorrect ? "#22c55e" : "#ef4444",
//               }}
//             >
//               {isCorrect
//                 ? "Correct ✅"
//                 : `Wrong ❌ | Correct: ${q.answer}`}
//             </Typography>
//           )}
//         </CardContent>
//       </Card>
//     );
//   })}

//   {/* Submit */}
//   <Button
//     variant="contained"
//     fullWidth
//     sx={{
//       py: 1.5,
//       borderRadius: 3,
//       fontWeight: "bold",
//       background: "linear-gradient(135deg, #6366f1, #3b82f6)",
//       boxShadow: "0 10px 20px rgba(99,102,241,0.3)",
//       "&:hover": {
//         background: "linear-gradient(135deg, #4f46e5, #2563eb)",
//       },
//       "&.Mui-disabled": {
//         background: isDark ? "#374151" : "#d1d5db",
//         color: isDark ? "#6b7280" : "#9ca3af",
//       },
//     }}
//     disabled={Object.keys(answers).length !== questions.length}
//     onClick={() => {
//       setShowResult(true);
//       submitQuiz();
//     }}
//   >
//     Submit
//   </Button>

//   {/* Score */}
//   {showResult && (
//     <Typography
//       variant="h6"
//       sx={{
//         mt: 4,
//         textAlign: "center",
//         fontWeight: "bold",
//         color: isDark ? "#f9fafb" : "#111827",
//       }}
//     >
//       Score: {getScore()} / {questions.length}
//     </Typography>
//   )}
// </Box>

<Box
  sx={{
    p: { xs: 2, sm: 3 },
    maxWidth: 800,
    mx: "auto",
    color: isDark ? "#f3f4f6" : "#111827",
  }}
>
  {/* Header */}
  <Typography
    variant="h4"
    sx={{
      mb: { xs: 2, sm: 3 },
      fontWeight: "bold",
      fontSize: { xs: "1.5rem", sm: "2rem" },
      color: isDark ? "#f9fafb" : "#111827",
    }}
  >
    Quiz
  </Typography>

  {/* Progress */}
  <Box sx={{ mb: { xs: 3, sm: 4 } }}>
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        height: 8,
        borderRadius: 10,
        backgroundColor: isDark ? "#374151" : "#e5e7eb",
        "& .MuiLinearProgress-bar": {
          background: "linear-gradient(90deg, #6366f1, #3b82f6)",
        },
      }}
    />

    <Typography
      variant="body2"
      sx={{
        mt: 1,
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        color: isDark ? "#9ca3af" : "#4b5563",
      }}
    >
      {Object.keys(answers).length} / {questions.length} answered
    </Typography>
  </Box>

  {/* Questions */}
  {questions.map((q, index) => {
    const isCorrect = answers[index] === q.answer;

    return (
      <Card
        key={index}
        sx={{
          mb: { xs: 2, sm: 3 },
          borderRadius: { xs: 3, sm: 4 },
          backdropFilter: "blur(12px)",
          background: isDark
            ? "rgba(31, 41, 55, 0.8)"
            : "rgba(255,255,255,0.9)",
          border: showResult
            ? isCorrect
              ? "2px solid #22c55e"
              : "2px solid #ef4444"
            : isDark
            ? "1px solid #374151"
            : "1px solid #e5e7eb",
          boxShadow: isDark
            ? "0 10px 30px rgba(0,0,0,0.4)"
            : "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Question */}
          <Typography
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: { xs: "0.95rem", sm: "1rem" },
              color: isDark ? "#f3f4f6" : "#111827",
            }}
          >
            {index + 1}. {q.question}
          </Typography>

          {/* Options */}
          <RadioGroup
            value={answers[index] ?? ""}
            onChange={(e) => handleChange(index, e.target.value)}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={opt}
                control={
                  <Radio
                    sx={{
                      color: isDark ? "#9ca3af" : "#6b7280",
                      "&.Mui-checked": {
                        color: "#6366f1",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: { xs: "0.85rem", sm: "0.95rem" },
                      color: isDark ? "#e5e7eb" : "#374151",
                    }}
                  >
                    {opt}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>

          {/* Result */}
          {showResult && (
            <Typography
              sx={{
                mt: 2,
                fontWeight: 600,
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                color: isCorrect ? "#22c55e" : "#ef4444",
              }}
            >
              {isCorrect
                ? "Correct ✅"
                : `Wrong ❌ | Correct: ${q.answer}`}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  })}

  {/* Submit */}
  <Button
    variant="contained"
    fullWidth
    sx={{
      py: { xs: 1.2, sm: 1.5 },
      borderRadius: 3,
      fontWeight: "bold",
      fontSize: { xs: "0.9rem", sm: "1rem" },
      background: "linear-gradient(135deg, #6366f1, #3b82f6)",
      boxShadow: "0 10px 20px rgba(99,102,241,0.3)",
      "&:hover": {
        background: "linear-gradient(135deg, #4f46e5, #2563eb)",
      },
      "&.Mui-disabled": {
        background: isDark ? "#374151" : "#d1d5db",
        color: isDark ? "#6b7280" : "#9ca3af",
      },
    }}
    disabled={Object.keys(answers).length !== questions.length}
    onClick={() => {
      setShowResult(true);
      submitQuiz();
    }}
  >
    Submit
  </Button>

  {/* Score */}
  {showResult && (
    <Typography
      variant="h6"
      sx={{
        mt: { xs: 3, sm: 4 },
        textAlign: "center",
        fontWeight: "bold",
        fontSize: { xs: "1rem", sm: "1.25rem" },
        color: isDark ? "#f9fafb" : "#111827",
      }}
    >
      Score: {getScore()} / {questions.length}
    </Typography>
  )}
</Box>

  );
};

export default QuizComponent;
