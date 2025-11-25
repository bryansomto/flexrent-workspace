"use client";

import { Box, Typography, List, Divider } from "@mui/material";
import TransactionItem from "./TransactionItem";
import { TransactionCategory } from "@prisma/client";
import { SerializedTransaction } from "../../lib/definitions";
import { formatDateHeading } from "../../lib/utils";

interface ListProps {
  transactions: SerializedTransaction[];
  onUpdateCategory: (txId: string, newCategory: TransactionCategory) => void;
}

export default function TransactionList({
  transactions,
  onUpdateCategory,
}: ListProps) {
  // --- Date Grouping Logic ---
  const groupedTransactions = transactions.reduce((acc, tx) => {
    // Ensure we handle both Date objects and ISO strings safely
    const dateObj = new Date(tx.date);
    const dateKey = dateObj.toISOString().split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(tx);
    return acc;
  }, {} as Record<string, SerializedTransaction[]>);

  // Get sorted date keys (most recent first)
  const sortedDateKeys = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  if (transactions.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <Typography color="text.secondary">No transactions found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={500} gutterBottom>
        All Transactions
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.default" }}>
        {sortedDateKeys.map((dateKey) => (
          <Box key={dateKey} sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ px: 2, pt: 1, fontWeight: 600 }}
            >
              {formatDateHeading(dateKey)}
            </Typography>
            {groupedTransactions[dateKey].map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onUpdateCategory={onUpdateCategory}
              />
            ))}
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </List>
    </Box>
  );
}
