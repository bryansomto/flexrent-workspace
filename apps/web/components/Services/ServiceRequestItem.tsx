"use client";

import { Paper, Box, Typography, Chip, useTheme } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { ServiceRequest } from "@/app/dashboard/services/services";

interface ItemProps {
  request: ServiceRequest;
}

export default function ServiceRequestItem({ request }: ItemProps) {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "In Progress":
        return "info";
      case "Completed":
        return "success";
      case "Approved":
        return "primary";
      case "Cancelled":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
        transition: "background-color 0.2s",
        "&:hover": {
          bgcolor: "action.hover",
          cursor: "pointer",
        },
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {request.category}
          </Typography>
          <Chip
            label={request.status}
            color={getStatusColor(request.status) as any}
            size="small"
            sx={{ height: 20, fontSize: "0.65rem", fontWeight: 600 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {request.description}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 14, color: "text.disabled" }} />
            <Typography variant="caption" color="text.disabled">
              {new Date(request.date).toLocaleDateString()}
            </Typography>
          </Box>
          {request.artisanName && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: 14, color: "text.disabled" }} />
              <Typography variant="caption" color="text.disabled">
                {request.artisanName}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {request.cost && (
        <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
          <Typography variant="caption" display="block" color="text.secondary">
            Cost
          </Typography>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            ₦{request.cost.toLocaleString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
