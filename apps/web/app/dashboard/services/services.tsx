"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  Build,
  Bolt,
  Plumbing,
  AcUnit,
  CleaningServices,
  Security,
} from "@mui/icons-material";
import ServiceCategoryCard from "../../../components/Services/ServiceCategoryCard";
import ServiceRequestItem from "../../../components/Services/ServiceRequestItem";

// --- MOCK DATA ---
export interface ServiceRequest {
  id: string;
  category: string;
  description: string;
  date: string;
  status: "Pending" | "Approved" | "In Progress" | "Completed" | "Cancelled";
  cost?: number;
  artisanName?: string;
}

export const mockRequests: ServiceRequest[] = [
  {
    id: "SR-001",
    category: "Plumbing",
    description: "Kitchen sink leaking into the cabinet.",
    date: "2025-11-18T09:00:00",
    status: "In Progress",
    artisanName: "Sunday Plumber",
  },
  {
    id: "SR-002",
    category: "AC Repair",
    description: "Master bedroom AC not cooling (needs gas).",
    date: "2025-11-15T14:30:00",
    status: "Pending",
  },
  {
    id: "SR-003",
    category: "Generator",
    description: "Change oil and filters (Monthly Service).",
    date: "2025-10-28T10:00:00",
    status: "Completed",
    cost: 15000,
    artisanName: "Mr. Tunde Gen",
  },
];

const categories = [
  { name: "Plumbing", icon: <Plumbing />, color: "#42a5f5" },
  { name: "Electrical", icon: <Bolt />, color: "#ffa726" },
  { name: "AC Repair", icon: <AcUnit />, color: "#66bb6a" },
  { name: "Generator", icon: <Build />, color: "#7e57c2" },
  { name: "Cleaning", icon: <CleaningServices />, color: "#ec407a" },
  { name: "Security", icon: <Security />, color: "#5c6bc0" },
];

export default function Services() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Filter logic: 0 = Active, 1 = History
  const displayRequests = mockRequests.filter((req) => {
    if (tabValue === 0) {
      return ["Pending", "Approved", "In Progress"].includes(req.status);
    }
    return ["Completed", "Cancelled"].includes(req.status);
  });

  return (
    <Stack spacing={4} p={isMobile ? 2 : 3}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Services
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Request maintenance and track repairs.
          </Typography>
        </Box>
        {!isMobile && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            New Request
          </Button>
        )}
      </Box>

      {/* Quick Actions Grid */}
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          I need help with...
        </Typography>
        <Grid container spacing={2}>
          {categories.map((cat) => (
            <Grid size={{ xs: 4, sm: 4, md: 2 }} key={cat.name}>
              <ServiceCategoryCard
                name={cat.name}
                icon={cat.icon}
                color={cat.color}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Request List */}
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="service tabs"
          >
            <Tab label="Active Requests" />
            <Tab label="History" />
          </Tabs>
        </Box>

        <Stack spacing={2}>
          {displayRequests.length > 0 ? (
            displayRequests.map((req) => (
              <ServiceRequestItem key={req.id} request={req} />
            ))
          ) : (
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: "background.paper",
                borderRadius: 2,
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <Typography color="text.secondary">No requests found.</Typography>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Mobile FAB (Floating Action Button) */}
      {isMobile && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            borderRadius: 8,
            p: 2,
            minWidth: "auto",
            boxShadow: 4,
          }}
        >
          <AddIcon />
        </Button>
      )}
    </Stack>
  );
}
