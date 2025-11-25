"use client";

import { Paper, Box, Typography, alpha } from "@mui/material";
import { ReactNode } from "react";

interface CategoryCardProps {
  name: string;
  icon: ReactNode;
  color: string;
}

export default function ServiceCategoryCard({
  name,
  icon,
  color,
}: CategoryCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: color,
          backgroundColor: alpha(color, 0.04),
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          p: 1.5,
          borderRadius: "50%",
          color: color,
          bgcolor: alpha(color, 0.1),
          mb: 1,
        }}
      >
        {icon}
      </Box>
      <Typography variant="caption" display="block" fontWeight={600}>
        {name}
      </Typography>
    </Paper>
  );
}
