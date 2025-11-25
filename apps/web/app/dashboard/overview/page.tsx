import { Box, Grid, Typography } from "@mui/material";
import TrustScoreCardMini from "../../../components/Cards/TrustScoreMini";
import QuickActionCard from "../../../components/Cards/QuickActionCard";
import BalanceCard from "../../../components/Cards/BalanceCard";
import CashflowCard from "../../../components/Cards/CashflowCard";
import GoalsCard from "../../../components/Cards/GoalsCard";
import ActivationWidget from "../../../components/ActivationWidget";
import { getLoggedInUser } from "@/lib/actions";

export default async function Overview() {
  const userData = await getLoggedInUser();

  const rentPower =
    userData?.accounts.find((acc) => acc.isCreditLine)?.balance || 0;

  // Helper boolean to switch layouts
  const isActivated = rentPower > 0;

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      {/* Header Greeting */}
      <Box
        sx={{
          position: "relative",
          mb: 3,
          minHeight: "60px",
          display: "flex",
          alignItems: isActivated ? "center" : "start",
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Overview
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Welcome, {userData?.firstName}! Your rent is covered for{" "}
            <strong>8 months</strong>.
          </Typography>
        </Box>

        {/* Trust Score Card (Absolute Positioned as requested previously) */}
        {isActivated ? <TrustScoreCardMini score="A+" /> : <></>}
      </Box>

      {/* MAIN GRID LAYOUT */}
      <Grid container spacing={3}>
        {!isActivated ? (
          <>
            {/* 1. Activation Wizard (Full Width) */}
            <Grid size={{ xs: 12 }}>
              <ActivationWidget />
            </Grid>

            {/* 2. Quick Actions (Half Width) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <QuickActionCard />
            </Grid>

            {/* 3. Goals (Half Width) - Good to keep them motivated */}
            <Grid size={{ xs: 12, md: 6 }}>
              <GoalsCard goals={userData?.goals || []} />
            </Grid>
          </>
        ) : (
          /**
           * -------------------------------------------------------
           * LAYOUT B: DASHBOARD MODE (Active User)
           * Focus: Data, Balances, and Cashflow
           * -------------------------------------------------------
           */
          <>
            {/* 1. Quick Actions */}
            <Grid size={{ xs: 12, md: 6 }}>
              <QuickActionCard />
            </Grid>

            {/* 2. Funding Health (Replaces Widget) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <BalanceCard
                title="Funding Health"
                accountLabel="Linked Sources"
                accounts={userData?.accounts || []}
              />
            </Grid>

            {/* 3. Recent Activity */}
            <Grid size={{ xs: 12, md: 6 }}>
              <CashflowCard
                title="Recent Activity"
                accountLabel="Net after Housing"
                transactions={userData?.transactions || []}
              />
            </Grid>

            {/* 4. Goals */}
            <Grid size={{ xs: 12, md: 6 }}>
              <GoalsCard goals={userData?.goals || []} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
