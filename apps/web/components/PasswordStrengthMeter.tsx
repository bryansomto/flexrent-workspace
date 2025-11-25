import { Box, LinearProgress, Typography, Stack } from "@mui/material";

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps) {
  // 1. Calculate Score based on your Zod rules
  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: "", color: "transparent" };

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++; // Has Uppercase
    if (/[0-9]/.test(pass)) score++; // Has Number
    if (/[^A-Za-z0-9]/.test(pass)) score++; // Has Special Char (Bonus)

    // Map score to UI properties
    switch (score) {
      case 0:
      case 1:
        return { score: 25, label: "Weak", color: "#f44336" }; // Red
      case 2:
        return { score: 50, label: "Fair", color: "#ff9800" }; // Orange
      case 3:
        return { score: 75, label: "Good", color: "#2196f3" }; // Blue
      case 4:
        return { score: 100, label: "Strong", color: "#4caf50" }; // Green
      default:
        return { score: 0, label: "", color: "transparent" };
    }
  };

  const strength = getStrength(password);

  return (
    <Box sx={{ mt: 1 }}>
      {/* The Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={strength.score}
        sx={{
          height: 6,
          borderRadius: 5,
          bgcolor: "rgba(255,255,255,0.1)", // Subtle background track
          "& .MuiLinearProgress-bar": {
            bgcolor: strength.color, // Dynamic color
            borderRadius: 5,
            transition: "background-color 0.3s ease",
          },
        }}
      />

      {/* The Helper Text */}
      <Stack direction="row" justifyContent="space-between" mt={0.5}>
        <Typography
          variant="caption"
          sx={{ color: strength.color, fontWeight: 600 }}
        >
          {strength.label}
        </Typography>

        {/* Optional: Show missing requirements */}
        {password && strength.score < 4 && (
          <Typography variant="caption" color="text.secondary">
            Must contain 8+ chars, 1 Uppercase, 1 Number
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
