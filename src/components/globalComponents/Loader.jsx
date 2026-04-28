import { useState, useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = ({
  size = 80,
  color = "primary",
  texts = [],
  interval = 2000,
}) => {
  const [index, setIndex] = useState(0);
  const textForLoader = [...texts, "...please wait"];

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
 <Box
  sx={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    bgcolor: isDark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.55)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  }}
>
  {/* Wave Loader */}
  <Box sx={{ display: "flex", gap: 0.8, alignItems: "flex-end", height: 60 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <Box
        key={i}
        sx={{
          width: 6,
          height: 20,
          borderRadius: 2,
          background: isDark ? "#818cf8" : "#ffffff",
          animation: "wave 1.2s infinite ease-in-out",
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ))}
  </Box>

  {/* Text */}
  <Typography
    variant="h6"
    sx={{
      mt: 3,
      color: isDark ? "#e5e7eb" : "#ffffff",
      fontWeight: 600,
      textAlign: "center",
      letterSpacing: "0.4px",
    }}
  >
    {textForLoader[index]}
  </Typography>


  {/* Animation */}
  <style>
    {`
      @keyframes wave {
        0%, 100% {
          height: 10px;
          opacity: 0.4;
        }
        50% {
          height: 60px;
          opacity: 1;
        }
      }
    `}
  </style>
</Box>
  );
};

export default Loader;
