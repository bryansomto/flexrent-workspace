"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home,
  Close,
  Wallet,
  Receipt,
  MiscellaneousServices,
  AccountBalance,
} from "@mui/icons-material";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ThemeToggleButton from "./ThemeToggleButton";
import Link from "next/link";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const menuItems = [
  { text: "Overview", icon: <Home />, path: "/dashboard/overview" },
  { text: "Wallet", icon: <Wallet />, path: "/dashboard/wallet" },
  { text: "History", icon: <Receipt />, path: "/dashboard/history" },
  {
    text: "Services",
    icon: <MiscellaneousServices />,
    path: "/dashboard/services",
  },
  { text: "Documents", icon: <AccountBalance />, path: "/dashboard/documents" },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      onClose();
    }
  };

  // Desktop fixed sidebar
  if (!isMobile) {
    return (
      <Box
        sx={{
          width: 260,
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          marginTop: 0.3,
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: 2,
            borderRight: `1px solid ${theme.palette.divider}`,
            // borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Menu Items */}
          <List sx={{ px: 1, flex: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  suppressHydrationWarning={true}
                  sx={{
                    borderRadius: 0.5,
                    mb: 0.5,
                    mx: 1.5,
                    "&.Mui-selected": {
                      backgroundColor: "background.paper",
                      boxShadow: 3,
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "background.default",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "inherit",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Footer */}
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="body2" color="text.secondary" align="center">
              FlexRent v1.0
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  // Mobile drawer
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 280,
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <MaxWidthWrapper className="h-full flex flex-col">
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: { xs: 52, sm: 58 },
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Typography variant="h6" component="div">
                Flex
                <Box component="span" sx={{ color: "primary.main" }}>
                  Rent
                </Box>
              </Typography>
            </Link>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>

          <Divider />

          {/* Menu Items */}
          <List sx={{ px: 1, flex: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 0.5,
                    mb: 0.5,
                    mx: 1.5,
                    "&.Mui-selected": {
                      backgroundColor: "background.paper",
                      boxShadow: 3,
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "background.default",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "inherit",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Footer */}
          <Box
            sx={{
              py: 1,
              pr: 3,
              pl: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <ThemeToggleButton />
            <Typography variant="body2" color="text.secondary">
              FlexRent v1.0
            </Typography>
          </Box>
        </MaxWidthWrapper>
      </Box>
    </Drawer>
  );
}
