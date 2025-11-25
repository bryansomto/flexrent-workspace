"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";

export default function NavbarClientHome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }
  return (
    <Box sx={{ flexGrow: 0, bgcolor: "background.default" }}>
      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: `1px solid palette.divider`,
          py: 0,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="text.primary"
                  sx={{
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Flex
                  <Box component="span" sx={{ color: "primary.main" }}>
                    Rent
                  </Box>
                </Typography>
              </Link>
            </Box>

            {/* Auth Actions */}
            <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }}>
              <Button
                component={Link}
                href="/auth/login"
                variant="text"
                color="inherit"
              >
                Sign in
              </Button>
              <Button
                component={Link}
                href="/auth/signup"
                variant="contained"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Get Started
              </Button>
              <ThemeToggleButton />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
