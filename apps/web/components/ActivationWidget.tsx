"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";

// Define the steps for the wizard
const STEPS = [
  { id: 1, label: "Create Account", status: "completed" },
  { id: 2, label: "Verify Identity (KYC)", status: "pending" },
  { id: 3, label: "Link Bank Account", status: "pending" },
  { id: 4, label: "Unlock Rent Power", status: "locked" }, // The Reward
];

export default function ActivationWidget() {
  const theme = useTheme();

  // Calculate progress (e.g., 1 step done out of 4 = 25%)
  const completedSteps = STEPS.filter((s) => s.status === "completed").length;
  const progress = (completedSteps / (STEPS.length - 1)) * 100; // Exclude final reward step from calculation logic if desired, or keep it simple

  // Find the next actionable step
  const currentStep = STEPS.find((s) => s.status === "pending");

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 6,
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #0f172a 100%)`,
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decoration (Glow) */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          bgcolor: theme.palette.primary.main,
          opacity: 0.15,
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      <CardContent sx={{ p: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
        >
          {/* LEFT SIDE: Call to Action */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="overline"
              sx={{ color: theme.palette.primary.light, letterSpacing: 1 }}
            >
              Get Started
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
              Unlock your Rent Power
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey.400", mb: 3, maxWidth: 400 }}
            >
              Complete these 3 simple steps to qualify for up to ₦5,000,000 in
              rent financing.
            </Typography>

            {/* The Big Action Button */}
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
              onClick={() => console.log(`Maps to: ${currentStep?.label}`)}
            >
              {currentStep ? `Start: ${currentStep.label}` : "Complete Setup"}
            </Button>
          </Box>

          {/* RIGHT SIDE: Progress List */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Setup Progress
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
              >
                {Math.round(progress)}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: alpha(theme.palette.common.white, 0.1),
                mb: 3,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  bgcolor: theme.palette.primary.main,
                },
              }}
            />

            <Stack spacing={2}>
              {STEPS.map((step, index) => {
                const isCompleted = step.status === "completed";
                const isLocked = step.status === "locked";
                const isCurrent = step.status === "pending";

                return (
                  <Box
                    key={step.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: isCurrent
                        ? alpha(theme.palette.primary.main, 0.1)
                        : "transparent",
                      border: isCurrent
                        ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                        : "1px solid transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {/* Icon Logic */}
                    <Box
                      sx={{
                        mr: 2,
                        display: "flex",
                        color: isCompleted ? "success.main" : "grey.600",
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon />
                      ) : isLocked ? (
                        <LockIcon sx={{ fontSize: 20, opacity: 0.5 }} />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "primary.main" }}
                        />
                      )}
                    </Box>

                    {/* Text Logic */}
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={isCurrent ? 700 : 500}
                        sx={{
                          color: isCompleted
                            ? "white"
                            : isLocked
                            ? "grey.600"
                            : "white",
                          opacity: isLocked ? 0.7 : 1,
                        }}
                      >
                        {step.label}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
