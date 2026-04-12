import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button ,IconButton } from "@mui/material";
import QuizComponent from "./QuizComponent";
import CloseIcon from "@mui/icons-material/Close";

const QuizModal = ({ questions = [], onComplete }) => {
  const [open, setOpen] = useState(questions?.length > 0);
  // const [quizCompleted, setQuizCompleted] = useState(false);

  return (
    <>
      {/* <Button variant="contained" onClick={() => setOpen(true)}>
        Open Quiz
      </Button> */}

      {/* <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Quiz</DialogTitle>
        <DialogContent>
          <QuizComponent questions={questions} />
        </DialogContent>
      </Dialog> */}

      <Dialog
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
      </Dialog>
    </>
  );
};

export default QuizModal;
