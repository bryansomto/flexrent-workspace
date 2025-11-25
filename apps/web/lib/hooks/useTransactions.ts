import { useState, useMemo, useCallback } from "react";
import { TransactionCategory } from "@prisma/client";
import { SerializedTransaction } from "@/lib/definitions";

// Define the shape of your filters
export interface TransactionFilters {
  accountId: number | string | "All";
}

/**
 * A custom hook to manage transaction state, filtering, and updates.
 * Now accepts initial data from the database.
 */
export function useTransactions(
  initialTransactions: SerializedTransaction[] = [], // ✅ Accept real data
  defaultFilters: TransactionFilters = { accountId: "All" }
) {
  // Initialize state with the data passed from the Server Component
  const [transactions, setTransactions] = useState<SerializedTransaction[]>(initialTransactions);

  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters);

  // Memoize derived state for performance
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Account ID filter
      if (filters.accountId !== "All" && tx.accountId !== filters.accountId) {
        return false;
      }
      return true;
    });
  }, [transactions, filters]);

  // Wrap handlers in useCallback for stable function identity
  const handleUpdateCategory = useCallback(
    (txId: string, newCategory: TransactionCategory) => {
      // Optimistic update: Update local state immediately
      setTransactions((prevTxs) =>
        prevTxs.map((tx) =>
          tx.id === txId ? { ...tx, category: newCategory } : tx
        )
      );
      
      // TODO: In the future, trigger a Server Action here to update the DB
      console.log(`Transaction ${txId} category changed to ${newCategory}`);
    },
    []
  );

  return {
    transactions,
    filteredTransactions,
    filters,
    setFilters,
    handleUpdateCategory,
  };
}