"use client";

import { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import {
  AccountCircle,
  Settings,
  ExitToApp,
  Person,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export interface SimpleUserProfile {
  name: string;
  email: string;
  image?: string | null;
}

interface UserAvatarProps {
  size?: number;
  showMenu?: boolean;
  userData: SimpleUserProfile | null;
}

export default function UserAvatar({
  size = 36,
  showMenu = true,
  userData,
}: UserAvatarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (showMenu) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log("Navigate to profile");
    router.push("/dashboard/user");
    handleClose();
  };

  const handleSettings = () => {
    console.log("Navigate to settings");
    handleClose();
  };

  const handleLogout = async () => {
    console.log("Logout user");
    await signOut({ callbackUrl: "/auth/login" });
    handleClose();
  };

  return (
    <>
      <Tooltip title="User menu">
        <IconButton
          onClick={handleClick}
          suppressHydrationWarning={true}
          sx={{
            padding: 0.5,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <Avatar
            sx={{
              width: size,
              height: size,
              bgcolor: "primary.main",
              border: `2px solid`,
              borderColor: "primary.light",
              cursor: showMenu ? "pointer" : "default",
              "&:hover": showMenu
                ? {
                    transform: "scale(1.05)",
                    transition: "transform 0.2s ease-in-out",
                  }
                : {},
            }}
          >
            {userData?.image || <Person sx={{ fontSize: size * 0.5 }} />}
          </Avatar>
        </IconButton>
      </Tooltip>

      {showMenu && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              elevation: 3,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1,
                minWidth: 160,
                borderRadius: 1,
              },
            },
          }}
        >
          {/* Compact User Info Section */}
          <Box sx={{ px: 1.5, py: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold" noWrap>
              {userData?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {userData?.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 0.5 }} />

          {/* Compact Menu Items */}
          <MenuItem
            onClick={handleProfile}
            sx={{ py: 0.75, minHeight: "auto" }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AccountCircle fontSize="small" sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">Profile</Typography>}
            />
          </MenuItem>

          <MenuItem
            onClick={handleSettings}
            sx={{ py: 0.75, minHeight: "auto" }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Settings fontSize="small" sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">Settings</Typography>}
            />
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={handleLogout} sx={{ py: 0.75, minHeight: "auto" }}>
            <ListItemIcon sx={{ minWidth: 36, color: "error.main" }}>
              <ExitToApp fontSize="small" sx={{ fontSize: "1rem" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="error">
                  Logout
                </Typography>
              }
            />
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
