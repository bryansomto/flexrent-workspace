"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  useTheme,
  Chip,
} from "@mui/material";
import {
  AccountBalanceWallet,
  CheckCircle,
  CreditCard,
} from "@mui/icons-material";
import { SerializedUserData } from "../../lib/definitions";
import { formatCurrency } from "../../lib/utils";

const colorSchemes: Record<string, string> = {
  green: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  blue: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  orange: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
};

interface BalanceCardProps {
  title?: string;
  accountLabel?: string;
  accounts: SerializedUserData["accounts"];
}

export default function BalanceCard({
  title = "Funding Health",
  accountLabel = "Sources linked for rent deduction",
  accounts = [],
}: BalanceCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        width: "100%",
        minWidth: { xs: "90%", sm: "350px" },
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Stack them vertically usually looks better for wallets
            gap: 2,
          }}
        >
          {accounts.map((account) => {
            // Logic: Only show balance if it is YOUR internal wallet/credit line
            // If it is an external bank card, we hide the balance logic.
            const showBalance =
              account.isCreditLine || account.bank === "FLEXRENT_WALLET";

            return (
              <Box
                key={account.id}
                sx={{
                  borderRadius: 2,
                  p: 2.5,
                  background:
                    "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", // Sleek dark card look
                  color: "white",
                  boxShadow: 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative circle for visual flair */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        display: "flex",
                      }}
                    >
                      {showBalance ? (
                        <AccountBalanceWallet sx={{ color: "#4ade80" }} />
                      ) : (
                        <CreditCard sx={{ color: "#60a5fa" }} />
                      )}
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="600">
                        {account.shortName}{" "}
                        {/* e.g. "GTBank Debit" or "FlexRent Credit" */}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {showBalance
                          ? "Available Limit"
                          : "Direct Debit Active"}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Status Chip */}
                  <Chip
                    label={showBalance ? "Active" : "Verified"}
                    size="small"
                    icon={<CheckCircle style={{ fill: "white" }} />}
                    sx={{
                      bgcolor: "rgba(74, 222, 128, 0.2)",
                      color: "#4ade80",
                      fontWeight: "bold",
                      border: "none",
                      "& .MuiChip-icon": { color: "inherit" },
                    }}
                  />
                </Stack>

                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  {/* MAIN DISPLAY AREA */}
                  <Box>
                    {showBalance ? (
                      // CASE 1: INTERNAL ACCOUNT (Show Money)
                      <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{ letterSpacing: -0.5 }}
                      >
                        {formatCurrency(account.balance)}
                      </Typography>
                    ) : (
                      // CASE 2: EXTERNAL CARD (Show Masked Number)
                      <Typography
                        variant="h4"
                        fontWeight="500"
                        sx={{ letterSpacing: 2, opacity: 0.9 }}
                      >
                        •••• {account.accountNumber.slice(-4)}
                      </Typography>
                    )}

                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.6, display: "block", mt: 0.5 }}
                    >
                      {showBalance ? "Monthly Rent Power" : "Expires 12/28"}
                    </Typography>
                  </Box>

                  {/* Brand Logo (Visa/Mastercard placeholder) */}
                  {!showBalance && (
                    <Typography
                      variant="h6"
                      fontWeight="800"
                      sx={{ fontStyle: "italic", opacity: 0.4 }}
                    >
                      VISA
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
