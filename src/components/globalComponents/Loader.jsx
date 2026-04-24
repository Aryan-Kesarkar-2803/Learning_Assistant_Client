import { useState, useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = ({
  size = 80,
  color = "primary",
  texts = [],
  interval = 2000,
}) => {
  const [index, setIndex] = useState(0);
  const textForLoader = [...texts, "...Please wait"];

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % textForLoader.length);
    }, interval);
    return () => clearInterval(timer);
  }, [textForLoader, interval]);

  return (
    // <Box
    //   sx={{
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     width: "100%",
    //     height: "100%",
    //     bgcolor: "rgba(0,0,0,0.6)", // fade-out effect
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     zIndex: 10,
    //     transition: "opacity 0.4s ease",
    //   }}
    // >
    //   <CircularProgress size={size} color={color} />

    //   <Typography
    //     variant="body1"
    //     className="text-base"
    //     sx={{ mt: 2, color: "#fff", fontWeight: 500 }}
    //   >
    //     {textForLoader[index]}
    //   </Typography>
    // </Box>

    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: isDark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)", // slightly deeper in dark mode
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        transition: "opacity 0.4s ease",
      }}
    >
      <CircularProgress size={size} color={color} />

      <Typography
        variant="body1"
        className="text-base"
        sx={{ mt: 2, color: "#fff", fontWeight: 500 }}
      >
        {textForLoader[index]}
      </Typography>
    </Box>
  );
};

export default Loader;
