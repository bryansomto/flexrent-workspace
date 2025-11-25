"use client";

import {
  Box,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface TrustScoreCardProps {
  score?: string; // e.g. "A+", "B", "C"
}

// Helper to determine color based on score
const getScoreColor = (score: string) => {
  const s = score.charAt(0).toUpperCase();
  if (s === "A") return "#4ade80"; // Green
  if (s === "B") return "#60a5fa"; // Blue
  if (s === "C") return "#facc15"; // Yellow
  return "#f87171"; // Red
};

const getScoreLabel = (score: string) => {
  const s = score.charAt(0).toUpperCase();
  if (s === "A") return "Excellent Tenant";
  if (s === "B") return "Very Good";
  if (s === "C") return "Average";
  return "Needs Improvement";
};

const getScoreComment = (score: string) => {
  const s = score.charAt(0).toUpperCase();
  if (s === "A" || s === "B" || s === "C") return "You represent low risk";
  return "You represent high risk";
};

export default function TrustScoreCardMini({
  score = "A+",
}: TrustScoreCardProps) {
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);
  const scoreComment = getScoreComment(score);

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#1e3a8a",
        color: "white",
        borderRadius: 4,
        py: 1,
        px: { xs: 1, md: 2 },
        minHeight: "60px",
        background: "linear-gradient(135deg, #1e3a8a 0%, #172554 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Blur */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 150,
          height: 100,
          bgcolor: scoreColor,
          opacity: 0.1,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      <Tooltip title={`Trust score: ${scoreLabel}`}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}
        >
          {/* Circular Indicator Wrapper */}
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            {/* Background Ring */}
            <CircularProgress
              variant="determinate"
              value={100}
              size={50}
              thickness={4}
              sx={{ color: "rgba(255,255,255,0.1)" }}
            />
            {/* Active Ring (Static 85% for aesthetics, or dynamic based on score) */}
            <CircularProgress
              variant="determinate"
              value={score === "A+" ? 100 : 75}
              size={50}
              thickness={4}
              sx={{
                color: scoreColor,
                position: "absolute",
                left: 0,
                strokeLinecap: "round",
              }}
            />
            {/* Centered Text */}
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" fontWeight="700" sx={{ color: "white" }}>
                {score}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: scoreColor }}
            >
              {scoreLabel}
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    </Paper>
  );
}
