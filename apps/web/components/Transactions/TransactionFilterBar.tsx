"use client";

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { TransactionCategory, TransactionType } from "@prisma/client";
import { SerializedAccount } from "../../lib/definitions";

interface FilterBarProps {
  filters: any;
  setFilters: (filters: any) => void;
  accounts: SerializedAccount[];
  txType: TransactionType[];
  categories: TransactionCategory[];
}

export default function TransactionFilterBar({
  filters,
  setFilters,
  accounts,
  txType,
  categories,
}: FilterBarProps) {
  // Generic handler to update any filter field
  const handleChange = (field: string, value: any) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  return (
    <Box component="form" sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        {/* Date Range (Simplified) */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={filters.dateRange}
              label="Date Range"
              onChange={(e) => handleChange("dateRange", e.target.value)}
            >
              <MenuItem value="This Month">This Month</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
              <MenuItem value="All Time">All Time</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Account Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Account</InputLabel>
            <Select
              value={filters.accountId}
              label="Account"
              onChange={(e) => handleChange("accountId", e.target.value)}
            >
              <MenuItem value="All">All Accounts</MenuItem>
              {accounts.map((acc) => (
                <MenuItem key={acc.accountNumber} value={acc.id}>
                  {acc.shortName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Type Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <MenuItem value="All">All Types</MenuItem>
              {txType.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Category Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Search Bar */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Transactions..."
            variant="outlined"
            value={filters.searchQuery}
            onChange={(e) => handleChange("searchQuery", e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
