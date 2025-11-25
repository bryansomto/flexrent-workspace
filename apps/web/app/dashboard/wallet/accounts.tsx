"use client";

import { useState } from "react";
import {
  Autocomplete,
  Box,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  LinearProgress,
  Chip,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  CheckCircle,
  Visibility,
  VisibilityOff,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
} from "@mui/icons-material";
import { SerializedAccount, UserPageProps } from "../../../lib/definitions";
import { useTransactions } from "../../../lib/hooks/useTransactions";
import { useGlobalVisibility } from "../../../lib/hooks/useGlobalVisibility";
import { formatCurrency } from "../../../lib/utils";
import TransactionList from "../../../components/Transactions/TransactionList";

export default function Accounts({
  accounts = [],
  transactions = [],
  annualRent = 0,
}: UserPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedAccount, setSelectedAccount] =
    useState<SerializedAccount | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const { filteredTransactions, filters, setFilters, handleUpdateCategory } =
    useTransactions(transactions);

  const {
    isGloballyVisible: isVisible,
    toggleGlobalVisibility: toggleBalanceVisibility,
  } = useGlobalVisibility("finTrack:global_visibility", false);

  // --- Handlers ---
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAccountSelection = (account: SerializedAccount | null) => {
    setSelectedAccount(account);
    setFilters({
      accountId: account ? account.id : "All",
    });
    handleCloseMenu();
  };

  // --- Data Logic ---
  const rentPower = accounts.find((acc) => acc.isCreditLine)?.balance || 0;

  const cashOnHand = accounts
    .filter(
      (acc) =>
        !acc.isCreditLine &&
        (acc.bank === "FlexRent Wallet" || acc.bank === "FLEXRENT_WALLET")
    )
    .reduce((acc, account) => acc + account.balance, 0);

  const targetRent = annualRent > 0 ? annualRent : 1;
  const coveragePercentage = Math.min((rentPower / targetRent) * 100, 100);

  const filteredAccounts = selectedAccount ? [selectedAccount] : accounts;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        p: isMobile ? 1 : 3,
      }}
    >
      {/* PAGE HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Wallet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your rent power, funding sources, and credit limit.
          </Typography>
        </Box>
      </Box>

      {/* RENT POWER SUMMARY CARD */}
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          p: isMobile ? 2 : 3,
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={500} color="text.secondary">
            Rent Power
          </Typography>
          <Tooltip title={isVisible ? "Hide Values" : "Show Values"}>
            <IconButton onClick={() => toggleBalanceVisibility()} size="small">
              {isVisible ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            fontWeight={500}
            color="text.primary"
            sx={{
              filter: isVisible ? "none" : "blur(12px)",
              transition: "filter 0.3s ease",
              userSelect: isVisible ? "auto" : "none",
            }}
          >
            {formatCurrency(rentPower)}
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="caption" color="text.secondary">
              Annual Rent Coverage
            </Typography>
            <Typography
              variant="caption"
              fontWeight="bold"
              color={coveragePercentage > 50 ? "success.main" : "warning.main"}
            >
              {coveragePercentage.toFixed(0)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={coveragePercentage}
            sx={{
              height: 8,
              borderRadius: 5,
              bgcolor: theme.palette.grey[200],
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                backgroundColor:
                  coveragePercentage > 50
                    ? theme.palette.success.main
                    : theme.palette.warning.main,
              },
            }}
          />
        </Box>
      </Paper>

      {/* ACCOUNTS LIST SECTION */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Controls Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: isMobile ? 1 : 2,
          }}
        >
          <Box>
            <Typography variant={isMobile ? "h4" : "h3"}>
              Funding Sources
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Linked cards & wallets
            </Typography>
          </Box>

          {/* Filter Logic (Kept existing) */}
          {isMobile ? (
            <>
              <IconButton onClick={handleOpenMenu} color="inherit">
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  onClick={() => handleAccountSelection(null)}
                  selected={filters.accountId === "All"}
                >
                  All Accounts
                </MenuItem>
                {accounts.map((account) => (
                  <MenuItem
                    key={account.id}
                    onClick={() => handleAccountSelection(account)}
                  >
                    {account.shortName}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Autocomplete
              options={accounts}
              getOptionLabel={(option) => option.shortName || option.bank}
              value={selectedAccount}
              onChange={(_, newValue) => handleAccountSelection(newValue)}
              sx={{ minWidth: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter Source"
                  variant="standard"
                />
              )}
            />
          )}
        </Box>

        {/* THE ADAPTED ACCOUNT CARDS */}
        {filteredAccounts.map((account, Index) => {
          // Logic: Show balance ONLY for Internal Wallet or Credit Line
          const showBalance =
            account.isCreditLine || account.bank === "FLEXRENT_WALLET";

          return (
            <Paper
              key={Index}
              elevation={2}
              sx={{
                width: "100%",
                minWidth: "240px",
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Left Border Color Indicator */}
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: showBalance ? "primary.main" : "secondary.main",
                }}
              />

              <Box sx={{ p: isMobile ? 2 : 3, pl: isMobile ? 3 : 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Icon & Name Group */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: theme.palette.action.hover,
                        borderRadius: "50%",
                        display: "flex",
                      }}
                    >
                      {showBalance ? (
                        <WalletIcon color="primary" />
                      ) : (
                        <CreditCardIcon color="secondary" />
                      )}
                    </Box>

                    <Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="h6" fontWeight="500">
                          {account.bank}
                        </Typography>
                        {account.isSalaryAccount && (
                          <Chip
                            label="Primary"
                            size="small"
                            color="primary"
                            sx={{ height: 20, fontSize: "0.65rem" }}
                          />
                        )}
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {account.shortName}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Status Badge (For Cards) */}
                  {!showBalance && (
                    <Chip
                      icon={
                        <CheckCircle sx={{ fontSize: "16px !important" }} />
                      }
                      label="Verified"
                      size="small"
                      variant="outlined"
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                </Box>

                {/* Value Section */}
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  {showBalance ? (
                    // INTERNAL WALLET: Show Money (Blurred)
                    <Box>
                      <Typography variant="caption" display="block" mb={0.5}>
                        Available Balance
                      </Typography>
                      <Typography
                        variant={isMobile ? "h5" : "h4"}
                        fontWeight="600"
                        sx={{
                          filter: isVisible ? "none" : "blur(8px)",
                          transition: "filter 0.3s ease",
                          userSelect: isVisible ? "auto" : "none",
                        }}
                      >
                        {formatCurrency(account.balance)}
                      </Typography>
                    </Box>
                  ) : (
                    // EXTERNAL CARD: Show Masked Number
                    <Box>
                      <Typography variant="caption" display="block" mb={0.5}>
                        Card Number
                      </Typography>
                      <Typography
                        variant={isMobile ? "h5" : "h4"}
                        fontWeight="500"
                        sx={{ letterSpacing: 3, opacity: 0.8 }}
                      >
                        •••• {account.accountNumber.slice(-4)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>
          );
        })}

        {/* LINK NEW BUTTON */}
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            width: "100%",
            p: 3,
            borderStyle: "dashed",
            borderColor: "text.secondary",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "rgba(25, 118, 210, 0.04)",
            },
          }}
          onClick={() => console.log("Trigger Paystack/Widget")}
        >
          <Typography color="primary" fontWeight={500}>
            + Link New Payment Method
          </Typography>
        </Paper>
      </Box>

      {/* TRANSACTIONS */}
      <Stack spacing={3} p={isMobile ? 1 : 3}>
        <TransactionList
          transactions={filteredTransactions}
          onUpdateCategory={handleUpdateCategory}
        />
      </Stack>
    </Box>
  );
}
