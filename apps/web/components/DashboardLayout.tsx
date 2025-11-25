"use client";

import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import NavbarClient from "./NavbarClient";
import { useSidebar } from "../lib/hooks/useSidebar";
import { SerializedUserData } from "../lib/definitions";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function DashboardLayout({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: SerializedUserData | null;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    isOpen: sidebarOpen,
    toggle: handleSidebarToggle,
    close: handleSidebarClose,
  } = useSidebar();
  //   if (pathname === "/dashboard" || pathname === "/") return "Overview";
  //   if (pathname === "/dashboard/wallet" || pathname === "/wallet")
  //     return "My Wallet";

  //   const segments = pathname.split("/").filter(Boolean);
  //   const lastSegment = segments[segments.length - 1];

  //   return (
  //     lastSegment
  //       ?.replace(/-/g, " ")
  //       .replace(/\b\w/g, (char) => char.toUpperCase()) || "Dashboard"
  //   );
  // }, [pathname]);

  return (
    <Box>
      <NavbarClient onMenuToggle={handleSidebarToggle} userData={userData} />
      <MaxWidthWrapper>
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
          }}
        >
          {/* Fixed Sidebar for desktop */}
          {!isMobile && (
            <Sidebar
              open={false}
              onClose={() => {}}
              onToggle={handleSidebarToggle}
            />
          )}
          {/* Mobile Sidebar */}
          {isMobile && (
            <Sidebar
              open={sidebarOpen}
              onClose={handleSidebarClose}
              onToggle={handleSidebarToggle}
            />
          )}

          {/* Main content area */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              minWidth: 0,
            }}
          >
            {/* Page content */}
            <Box
              sx={{
                flexGrow: 1,
                p: { xs: 2, sm: 0 },
                marginTop: 0.3,
                marginLeft: 0.3,
                // borderTop: `1px solid ${theme.palette.divider}`,
                // borderLeft: `1px solid ${theme.palette.divider}`,
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </MaxWidthWrapper>
    </Box>
  );
}
