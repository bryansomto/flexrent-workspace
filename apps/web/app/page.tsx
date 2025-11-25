// app/page.tsx
"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
  AppBar,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NavbarClientHome from "../components/NavbarClientHome";

export default function LandingPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <NavbarClientHome />
      {/* 2. Hero Section */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 }, mb: 10 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          spacing={6}
        >
          {/* Left Content */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h1"
              fontWeight="900"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                lineHeight: 1.1,
                mb: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pay Rent on Your Terms.
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6, maxWidth: 600 }}
            >
              Stop stressing about yearly rent. FlexRent breaks it down into
              manageable monthly payments while boosting your credit score.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <Button
                component={Link}
                href="/signup"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Check My Rent Power
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                How it Works
              </Button>
            </Stack>
          </Box>

          {/* Right Visual (Abstract representation of the app) */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              width: "100%",
              maxWidth: 500,
            }}
          >
            {/* Simple visual placeholder - replace with App Screenshot */}
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 4,
                boxShadow: theme.shadows[10],
                p: 3,
                transform: "rotate(-3deg)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Total Rent Power
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ₦ 2,500,000
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    bgcolor: "success.light",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                  }}
                />
              </Stack>
              <Box sx={{ height: 150, bgcolor: "grey.100", borderRadius: 2 }} />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
