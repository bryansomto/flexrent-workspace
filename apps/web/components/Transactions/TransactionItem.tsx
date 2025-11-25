"use client";

import { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { TransactionCategory } from "@prisma/client";
import { getCategoryIcon, transactionCategories } from "./TransactionHelpers";
import { SerializedTransaction } from "../../lib/definitions";
import { formatCurrency } from "../../lib/utils";

interface ItemProps {
  transaction: SerializedTransaction;
  onUpdateCategory: (txId: string, newCategory: TransactionCategory) => void;
}

export default function TransactionItem({
  transaction,
  onUpdateCategory,
}: ItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const isIncome = transaction.type === "INCOME";
  const amountColor = isIncome ? "success.main" : "error.main";

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category: TransactionCategory) => {
    onUpdateCategory(transaction.id, category);
    handleCloseMenu();
  };

  const handleItemClick = () => {
    // Optional: Navigation logic here
    console.log(`Opening details for ${transaction.id}`);
  };

  return (
    <>
      <ListItem
        onClick={handleItemClick}
        secondaryAction={
          <IconButton edge="end" aria-label="details">
            <ChevronRight />
          </IconButton>
        }
        sx={{
          "&:hover": {
            backgroundColor: "action.hover",
          },
          cursor: "pointer",
        }}
      >
        <ListItemAvatar>
          <Avatar>{getCategoryIcon(transaction.category)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body1" component="div">
              {transaction.name}
            </Typography>
          }
          secondary={
            <Box component="div" sx={{ mt: 0.5 }}>
              <Chip
                label={transaction.category.replace(/_/g, " ")}
                size="small"
                onClick={handleOpenMenu}
                aria-controls={isMenuOpen ? "category-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                sx={{ cursor: "pointer", fontSize: "0.7rem" }}
              />
            </Box>
          }
        />
        <Box sx={{ textAlign: "right", mr: { xs: 0.5, sm: 2, md: 4 } }}>
          <Typography variant="body1" fontWeight={600} color={amountColor}>
            {isIncome && "+"}
            {formatCurrency(transaction.amount)}
          </Typography>
        </Box>
      </ListItem>

      {/* The Menu for changing category */}
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
      >
        {transactionCategories.map((category) => (
          <MenuItem
            key={category}
            onClick={() => handleCategorySelect(category)}
            selected={category === transaction.category}
          >
            {/* Format enum for display (e.g. SERVICE_CHARGE -> Service Charge) */}
            {category
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
