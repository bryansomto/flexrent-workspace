"use client";

import { useState } from "react";
import { Stack, useTheme, useMediaQuery, Box, Typography } from "@mui/material";
import {
  Filters,
  SerializedTransaction,
  TX_CATEGORIES,
  TX_TYPES,
  UserPageProps,
} from "../../../lib/definitions";
import { TransactionCategory } from "@prisma/client";
import TransactionFilterBar from "../../../components/Transactions/TransactionFilterBar";
import TransactionList from "../../../components/Transactions/TransactionList";

export default function Transactions({
  accounts = [],
  transactions: dbtransactions = [],
}: UserPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [transactions, setTransactions] =
    useState<SerializedTransaction[]>(dbtransactions);

  const [filters, setFilters] = useState<Filters>({
    dateRange: "This Month",
    accountId: "All",
    type: "All",
    category: "All",
    searchQuery: "",
  });

  // This logic applies the filters to the master list
  const filteredTransactions = transactions.filter((tx) => {
    // 1. STRICT SYSTEM FILTER: Only show relevant categories
    // If it's not Rent, Salary, or Service Charge, hide it immediately.
    if (!TX_CATEGORIES.includes(tx.category)) {
      return false;
    }

    // Account filter
    if (filters.accountId !== "All" && tx.accountId !== filters.accountId) {
      return false;
    }

    // Date range filter
    const txDate = new Date(tx.date);
    const now = new Date();

    if (filters.dateRange === "This Month") {
      if (
        txDate.getMonth() !== now.getMonth() ||
        txDate.getFullYear() !== now.getFullYear()
      ) {
        return false;
      }
    } else if (filters.dateRange === "Last Month") {
      const lastMonth = new Date();
      lastMonth.setMonth(now.getMonth() - 1);
      if (
        txDate.getMonth() !== lastMonth.getMonth() ||
        txDate.getFullYear() !== lastMonth.getFullYear()
      ) {
        return false;
      }
    } else if (filters.dateRange === "Last 90 Days") {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(now.getDate() - 90);
      if (txDate < ninetyDaysAgo) {
        return false;
      }
    } else if (filters.dateRange === "This Year") {
      if (txDate.getFullYear() !== now.getFullYear()) {
        return false;
      }
    }

    // Type filter
    if (filters.type !== "All" && tx.type !== filters.type) {
      return false;
    }

    // Category filter
    if (filters.category !== "All" && tx.category !== filters.category) {
      return false;
    }

    // Search query filter
    if (
      filters.searchQuery &&
      !tx.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // function passed to the TransactionItem to update the main state
  const handleUpdateCategory = (
    txId: string,
    newCategory: TransactionCategory
  ) => {
    setTransactions((prevTxs) =>
      prevTxs.map((tx) =>
        tx.id === txId ? { ...tx, category: newCategory } : tx
      )
    );
  };

  return (
    <Stack spacing={3} sx={{ p: { xs: 1, md: 3 } }}>
      <Box>
        <Typography variant="h3" fontWeight="bold">
          History
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your rent payments and verified income sources.
        </Typography>
      </Box>

      <TransactionFilterBar
        filters={filters}
        setFilters={setFilters}
        accounts={accounts}
        txType={TX_TYPES}
        categories={TX_CATEGORIES}
      />

      <TransactionList
        transactions={filteredTransactions}
        onUpdateCategory={handleUpdateCategory}
      />
    </Stack>
  );
}
