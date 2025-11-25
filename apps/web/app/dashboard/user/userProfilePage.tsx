"use client";

import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WorkIcon from "@mui/icons-material/Work";
import SecurityIcon from "@mui/icons-material/Security";
import { UserPageProps } from "../../../lib/definitions";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import TrustScoreCard from "../../../components/Cards/TrustScore";
import BankStatementUpload from "@/components/BankStatementUpload";

export default function UserProfilePage({ accounts = [] }: UserPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const rentPower = accounts.find((acc) => acc.isCreditLine)?.balance || 0;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: isMobile ? 2 : 4,
        minHeight: "100vh",
      }}
    >
      <TrustScoreCard score="A" />

      {/* 2. THE "SECRET SAUCE" (Verification Section) */}
      <Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "text.secondary", mb: 2 }}
        >
          Verification Status
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Row 1: Identity */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: "#dcfce7", color: "#16a34a" }}>
                <CheckCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Identity Verified
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  NIN: 112****990
                </Typography>
              </Box>
            </Stack>
          </Stack>

          <Divider />

          {/* Row 2: PENSION (THE KEY ROW) - Highlighted for Leadway */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 2,
              bgcolor: "#fff7ed", // Light Orange Background
              borderLeft: "4px solid #f97316", // Orange Accent Border
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: "#ffedd5", color: "#f97316" }}>
                <SecurityIcon />
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#1a202c"
                >
                  Pension History Verified
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Provider:{" "}
                  <Typography
                    component="span"
                    variant="body2"
                    fontWeight="bold"
                    sx={{ color: "#ea580c" }} // Leadway Orange Text
                  >
                    Leadway Pensure
                  </Typography>
                </Typography>
              </Box>
            </Stack>

            <Chip
              label="24 MO. STREAK"
              size="small"
              sx={{
                bgcolor: "#dcfce7",
                color: "#15803d",
                fontWeight: "bold",
                borderRadius: 1,
              }}
            />
          </Stack>

          <Divider />

          {/* Row 3: Employment */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: "#dcfce7", color: "#16a34a" }}>
                <WorkIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Employment Active
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Nestlé Nigeria • Full Time
                </Typography>
              </Box>
            </Stack>
            <VerifiedUserIcon sx={{ color: "#cbd5e1" }} />
          </Stack>
        </Paper>
        <Paper>
          <BankStatementUpload />
        </Paper>
      </Box>
    </Box>
  );
}
