"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Article,
  Receipt,
  CreditCard,
  PermIdentity,
  FolderOpen,
  CloudUpload,
  Download,
  PictureAsPdf,
  Image,
} from "@mui/icons-material";

// --- MOCK DATA & INTERFACE (Define locally for simplicity) ---
export interface TenantDocument {
  id: string;
  name: string;
  category: "Tenancy" | "Receipts" | "Identity" | "Property";
  dateUploaded: string;
  fileType: "PDF" | "JPG";
  size: string;
}

const mockDocuments: TenantDocument[] = [
  {
    id: "d1",
    name: "2025 Tenancy Agreement",
    category: "Tenancy",
    dateUploaded: "2025-01-15",
    fileType: "PDF",
    size: "3.2 MB",
  },
  {
    id: "d2",
    name: "November 2025 Rent Receipt",
    category: "Receipts",
    dateUploaded: "2025-11-25",
    fileType: "PDF",
    size: "250 KB",
  },
  {
    id: "d3",
    name: "National Identity Card (NIN)",
    category: "Identity",
    dateUploaded: "2025-01-10",
    fileType: "JPG",
    size: "1.1 MB",
  },
  {
    id: "d4",
    name: "October 2025 Rent Receipt",
    category: "Receipts",
    dateUploaded: "2025-10-25",
    fileType: "PDF",
    size: "240 KB",
  },
  {
    id: "d5",
    name: "Apartment Inventory Checklist",
    category: "Property",
    dateUploaded: "2025-01-20",
    fileType: "PDF",
    size: "500 KB",
  },
  {
    id: "d6",
    name: "Bank Verification Number (BVN)",
    category: "Identity",
    dateUploaded: "2025-01-10",
    fileType: "JPG",
    size: "800 KB",
  },
];

const docCategories = [
  { label: "All", value: "All", icon: <FolderOpen /> },
  { label: "Tenancy", value: "Tenancy", icon: <Article /> },
  { label: "Receipts", value: "Receipts", icon: <Receipt /> },
  { label: "Identity", value: "Identity", icon: <PermIdentity /> },
  { label: "Property", value: "Property", icon: <CreditCard /> }, // Reusing CreditCard icon for Property Docs
];

// Helper to get the correct file icon
const getFileIcon = (fileType: string) => {
  if (fileType === "PDF") return <PictureAsPdf color="error" />;
  if (fileType === "JPG") return <Image color="primary" />;
  return <Article color="action" />;
};
// --- END MOCK DATA ---

export default function Documents() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeCategory, setActiveCategory] = useState(docCategories[0].value);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
  };

  const filteredDocuments = mockDocuments.filter(
    (doc) => activeCategory === "All" || doc.category === activeCategory
  );

  return (
    <Stack spacing={4} p={isMobile ? 2 : 3}>
      {/* Header & Upload Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Document Vault
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Secure storage for your tenancy agreements and receipts.
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<CloudUpload />}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          onClick={() => alert("Opening Document Upload Modal")}
        >
          {isMobile ? "Upload" : "New Document"}
        </Button>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeCategory}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="document categories"
        >
          {docCategories.map((category) => (
            <Tab
              key={category.value}
              label={category.label}
              value={category.value}
              icon={category.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Document List */}
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {filteredDocuments.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="text.secondary">
              No {activeCategory.toLowerCase()} documents found.
            </Typography>
          </Box>
        ) : (
          filteredDocuments.map((doc, index) => (
            <Box key={doc.id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="download"
                    onClick={() => console.log(`Downloading ${doc.name}`)}
                  >
                    <Download />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.grey[100] }}>
                    {getFileIcon(doc.fileType)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={doc.name}
                  secondary={`${doc.dateUploaded} • ${doc.size}`}
                />
              </ListItem>
              {index < filteredDocuments.length - 1 && (
                <Divider component="li" />
              )}
            </Box>
          ))
        )}
      </List>
    </Stack>
  );
}
