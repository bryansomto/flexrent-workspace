"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  alpha,
  Snackbar,
} from "@mui/material";
import { QuickActionsList } from "../../lib/mockData";

export type ValidColorKey = "primary" | "warning" | "success" | "info";

export default function QuickActionCard() {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleActionClick = (actionName: string) => {
    setSnackbarMessage(`Action triggered: ${actionName}`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        p: { xs: 2 },
        borderRadius: 3,
        boxShadow: 6,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          sx={{ color: theme.palette.text.primary, mb: 2 }}
        >
          Quick Actions
        </Typography>

        {/* THE GRID CONTAINER */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            flexGrow: 1,
          }}
        >
          {QuickActionsList.map((action, index) => {
            const [colorKey] = action.color.split(".");
            const paletteKey = colorKey as ValidColorKey;
            const paletteObject = theme.palette[paletteKey];
            const resolvedColor = (paletteObject as { main: string }).main;

            return (
              <Button
                key={index}
                onClick={() => handleActionClick(action.name)}
                fullWidth
                variant="outlined"
                sx={{
                  // GRID ITEM STYLING
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  p: 2.5,
                  borderRadius: 3,
                  textTransform: "none",
                  height: "100%",
                  minHeight: "140px",
                  borderColor: alpha(theme.palette.divider, 0.1),
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: alpha(resolvedColor, 0.1),
                    borderColor: resolvedColor,
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                  },
                }}
              >
                {/* ICON BUBBLE */}
                <Box
                  sx={{
                    color: action.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1.5,
                    borderRadius: "50%",
                    backgroundColor: alpha(resolvedColor, 0.15),
                    mb: 2,
                  }}
                >
                  {action.icon}
                </Box>

                {/* TEXT CONTENT */}
                <Box sx={{ textAlign: "left", width: "100%" }}>
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    color="text.primary"
                    sx={{ lineHeight: 1.2, mb: 0.5 }}
                  >
                    {action.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {action.description}
                  </Typography>
                </Box>
              </Button>
            );
          })}
        </Box>
      </CardContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
}
