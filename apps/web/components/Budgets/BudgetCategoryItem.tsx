"use client";

import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  IconButton,
  Avatar,
  Stack,
  useTheme,
} from "@mui/material";
import { getCategoryIcon, TransactionCategory } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import BudgetStatusChip from "./BudgetStatusChip";
import MoreVert from "@mui/icons-material/MoreVert";
import ChevronRight from "@mui/icons-material/ChevronRight";

interface BudgetCategoryItemProps {
  category: TransactionCategory;
  spent: number;
  limit: number;
}

export default function BudgetCategoryItem({
  category,
  spent,
  limit,
}: BudgetCategoryItemProps) {
  const theme = useTheme();
  const percentSpent = limit > 0 ? (spent / limit) * 100 : 0;

  const getProgressBarColor = () => {
    if (percentSpent > 100) return "error";
    if (percentSpent > 70) return "warning";
    return "primary";
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
        "&:hover": { boxShadow: 4 },
      }}
    >
      <Avatar
        sx={{
          bgcolor:
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
          color: "text.primary",
        }}
      >
        {getCategoryIcon(category)}
      </Avatar>

      <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
        {/* Top Row: Title and Amount */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={500} textTransform="capitalize">
            {category}
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {formatCurrency(spent)}
            <Typography
              component="span"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              / {formatCurrency(limit)}
            </Typography>
          </Typography>
        </Box>
        {/* Middle Row: Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={Math.min(percentSpent, 100)}
          color={getProgressBarColor()}
          sx={{ height: 8, borderRadius: 5 }}
        />
        {/* Bottom Row: Status */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <BudgetStatusChip percent={percentSpent} />
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {percentSpent.toFixed(0)}%
          </Typography>
        </Box>
      </Stack>

      <IconButton size="small" onClick={() => alert(`Edit ${category}`)}>
        <MoreVert />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
        }}
        onClick={() => alert(`View ${category} details`)}
      >
        <ChevronRight />
      </IconButton>
    </Paper>
  );
}
