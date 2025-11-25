"use client";

import { Box, Paper, Stack, Typography, CircularProgress } from "@mui/material";
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

export default function TrustScoreCard({ score = "A+" }: TrustScoreCardProps) {
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
        py: 3,
        px: 5,
        height: "100%",
        minHeight: "180px",
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
          height: 150,
          bgcolor: scoreColor,
          opacity: 0.1,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography variant="body2" sx={{ color: "#bfdbfe", mb: 0.5 }}>
            Trust Score
          </Typography>
          <Typography variant="caption" sx={{ color: "#bfdbfe", opacity: 0.7 }}>
            Based on payment history
          </Typography>
        </Box>
        <InfoOutlinedIcon
          sx={{ color: "#bfdbfe", opacity: 0.5, fontSize: 20 }}
        />
      </Stack>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2 }}>
        {/* Circular Indicator Wrapper */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          {/* Background Ring */}
          <CircularProgress
            variant="determinate"
            value={100}
            size={80}
            thickness={4}
            sx={{ color: "rgba(255,255,255,0.1)" }}
          />
          {/* Active Ring (Static 85% for aesthetics, or dynamic based on score) */}
          <CircularProgress
            variant="determinate"
            value={score === "A+" ? 100 : 75}
            size={80}
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
            <Typography variant="h4" fontWeight="800" sx={{ color: "white" }}>
              {score}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: scoreColor }}>
            {scoreLabel}
          </Typography>
          <Typography variant="caption" sx={{ color: "#bfdbfe" }}>
            {scoreComment}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
