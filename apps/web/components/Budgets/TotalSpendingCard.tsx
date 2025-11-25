"use client";

import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { formatCurrency } from "@/lib/utils";
import BudgetStatusChip from "./BudgetStatusChip";

interface TotalSpendingCardProps {
  totalSpent: number;
  totalBudget: number;
  selectedMonth: string;
  availableMonths: string[];
  onMonthChange: (newMonth: string) => void;
  formatMonth: (monthStr: string) => string;
}

export default function TotalSpendingCard({
  totalSpent,
  totalBudget,
  selectedMonth,
  availableMonths,
  onMonthChange,
  formatMonth,
}: TotalSpendingCardProps) {
  const percentSpent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const getProgressBarColor = () => {
    if (percentSpent > 100) return "error";
    if (percentSpent > 70) return "warning";
    return "primary";
  };

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={500} color="text.secondary">
          Total Monthly Spending
        </Typography>
        <FormControl size="small" variant="standard">
          <Select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
          >
            {availableMonths.map((month) => (
              <MenuItem key={month} value={month}>
                {formatMonth(month)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
        <Typography variant="h3" fontWeight={600} color="text.primary">
          {formatCurrency(totalSpent)}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          / {formatCurrency(totalBudget)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={Math.min(percentSpent, 100)} // Cap at 100% for the bar
        color={getProgressBarColor()}
        sx={{ height: 10, borderRadius: 5, my: 1.5 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <BudgetStatusChip percent={percentSpent} />
        <Typography variant="body2" fontWeight={600}>
          {percentSpent.toFixed(0)}% spent
        </Typography>
      </Box>
    </Paper>
  );
}
