"use client";

import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const theme = useTheme();
  // const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      className={cn("h-full mx-auto w-full", className)}
      maxWidth={"lg"}
      sx={{
        backgroundColor: theme.palette.background.default,
        transition: "background-color 0.3s ease",
      }}
    >
      {children}
    </Box>
  );
};

export default MaxWidthWrapper;
