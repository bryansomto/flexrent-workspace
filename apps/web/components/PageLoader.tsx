import { Box, CircularProgress, Typography } from "@mui/material";

export default function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default", // Matches your theme automatically
        gap: 3,
      }}
    >
      {/* Your Logo Animation */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ animation: "pulse 2s infinite" }}
      >
        Flex
        <Box component="span" sx={{ color: "primary.main" }}>
          Rent
        </Box>
      </Typography>

      <CircularProgress
        size={50}
        thickness={4}
        sx={{
          color: "primary.main",
          // Adds a subtle glow effect
          filter: "drop-shadow(0 0 8px rgba(0, 200, 83, 0.4))",
        }}
      />

      {/* Optional CSS animation definition for the logo */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
}
