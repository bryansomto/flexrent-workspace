import { Box, Paper, Stack, Typography } from "@mui/material";
import { formatCurrency } from "../../lib/utils";

interface RentPowerProps {
  rentPower: number;
}

export default function RentPower({ rentPower }: RentPowerProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#1e3a8a", // Dark Blue
        color: "white",
        borderRadius: 4,
        p: 3,
        background: "linear-gradient(135deg, #1e3a8a 0%, #172554 100%)",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="body2" sx={{ color: "#bfdbfe", mb: 1 }}>
            Pre-Approved Rent Limit
          </Typography>
          <Typography variant="h4" fontWeight="bold" component="div">
            {formatCurrency(rentPower)}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "normal", opacity: 0.8 }}
            >
              /yr
            </Typography>
          </Typography>
        </Box>

        {/* The Trust Score Badge */}
        <Box
          sx={{
            textAlign: "center",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            p: 1.5,
            borderRadius: 2,
            minWidth: 80,
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#4ade80" }}>
            A+
          </Typography>
          <Typography variant="caption" sx={{ color: "#bfdbfe" }}>
            Trust Score
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
