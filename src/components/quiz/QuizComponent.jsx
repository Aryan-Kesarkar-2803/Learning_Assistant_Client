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
    
  }, [showResult]);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Quiz
      </Typography>

      {/* Progress */}
      <Box sx={{ mb: 3 }}>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="body2" sx={{ mt: 1 }}>
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
              mb: 3,
              borderRadius: 3,
              boxShadow: 2,
              border: showResult
                ? isCorrect
                  ? "2px solid green"
                  : "2px solid red"
                : "1px solid #eee",
            }}
          >
            <CardContent>
              <Typography sx={{ mb: 2, fontWeight: 500 }}>
                {index + 1}. {q.question}
              </Typography>

              <RadioGroup
                value={answers[index] ?? ""}
                onChange={(e) => handleChange(index, e.target.value)}
              >
                {q.options.map((opt, i) => (
                  <FormControlLabel
                    key={i}
                    value={opt}
                    control={<Radio />}
                    label={opt}
                  />
                ))}
              </RadioGroup>

              {showResult && (
                <Typography
                  sx={{
                    mt: 2,
                    fontWeight: 500,
                    color: isCorrect ? "green" : "red",
                  }}
                >
                  {isCorrect ? "Correct ✅" : `Wrong ❌ | Correct: ${q.answer}`}
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
        sx={{ py: 1.5, borderRadius: 2 }}
        disabled={Object.keys(answers).length !== questions.length}
        // onClick={onComplete}
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
          sx={{ mt: 3, textAlign: "center", fontWeight: "bold" }}
        >
          Score: {getScore()} / {questions.length}
        </Typography>
      )}
    </Box>
  );
};

export default QuizComponent;
