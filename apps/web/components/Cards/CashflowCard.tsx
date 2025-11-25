"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { SerializedTransaction, TX_CATEGORIES } from "../../lib/definitions";
import { chartData } from "../../lib/mockData";
import { formatCurrency } from "../../lib/utils";

interface CashflowCardProps {
  title?: string;
  accountLabel?: string;
  transactions: SerializedTransaction[];
}

export default function CashflowCard({
  title = "Disposable Income",
  accountLabel = "Net after Housing",
  transactions = [],
}: CashflowCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isBelowLG = useMediaQuery(theme.breakpoints.down("lg"));

  // --- DYNAMIC NET CASH FLOW CALCULATION ---
  const { netIncome, totalHousingCost } = useMemo(() => {
    let income = 0;
    let housingCost = 0;

    transactions.forEach((tx) => {
      if (tx.type === "INCOME") {
        income += tx.amount;
      }
      if (tx.type === "EXPENSE" && TX_CATEGORIES.includes(tx.category)) {
        housingCost += Math.abs(tx.amount);
      }
    });

    return { netIncome: income, totalHousingCost: housingCost };
  }, [transactions]);

  const disposableIncome = netIncome - totalHousingCost;

  const formattedIncome = chartData.map((item) => item.income);
  const formattedHousing = chartData.map((item) => item.housing);
  const chartLabels = chartData.map((item) => item.day);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        minWidth: { xs: "90%", sm: "350px" },
        width: "100%",
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {accountLabel}
          </Typography>
        </Stack>

        {/* Main Disposable Income Indicator */}
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight={700}
          color={disposableIncome > 0 ? "success.main" : "error.main"}
          mb={1}
        >
          {formatCurrency(disposableIncome)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Remaining after rent payments.
        </Typography>

        {/* Bar Chart Visualization */}
        <Box height={isBelowLG ? 200 : 260} mt={2}>
          <BarChart
            series={[
              {
                data: formattedIncome,
                label: "Income",
                stack: "A",
                color: theme.palette.success.light,
              },
              {
                data: formattedHousing,
                label: "Housing Cost",
                stack: "A",
                color: theme.palette.error.light,
              },
            ]}
            sx={{ width: { xs: "240", sm: "300", md: "400" } }}
            borderRadius={10}
            xAxis={[{ data: chartLabels, scaleType: "band" }]}
            yAxis={[{ label: "Amount (₦)" }]}
            margin={{ top: 20, right: 10, bottom: 20, left: 10 }}
            slotProps={{
              legend: {
                direction: "horizontal",
                position: { vertical: "bottom", horizontal: "center" },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
