"use client";

import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  IconButton,
  Avatar,
  Stack,
  useTheme,
  Button,
} from "@mui/material";
import { Goal, getGoalIcon } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import MoreVert from "@mui/icons-material/MoreVert";

interface GoalCardProps {
  goal: Goal;
}

// --- Helper for "Saving" goal text (e.g., ₦10,000 / ₦50,000) ---
const SavingGoalContent: React.FC<{ goal: Goal }> = ({ goal }) => (
  <Box>
    <Typography variant="h5" fontWeight={600} color="text.primary">
      {formatCurrency(goal.currentAmount)}
      <Typography
        component="span"
        variant="h6"
        color="text.secondary"
        sx={{ ml: 0.5 }}
      >
        / {formatCurrency(goal.targetAmount)}
      </Typography>
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {((goal.currentAmount / goal.targetAmount) * 100).toFixed(0)}% complete
    </Typography>
  </Box>
);

// --- Helper for "Contribution" goal text (e.g., Contribute ₦500/mo) ---
const ContributionGoalContent: React.FC<{ goal: Goal }> = ({ goal }) => (
  <Box>
    <Typography variant="h6" color="text.secondary">
      Contribute {formatCurrency(goal.contributionAmount || 0)}/mo
    </Typography>
    <Typography variant="h5" fontWeight={600} color="text.primary">
      Total: {formatCurrency(goal.currentAmount)}
    </Typography>
  </Box>
);

export default function GoalCard({ goal }: GoalCardProps) {
  const theme = useTheme();

  // Calculate percentage (handle 0 target for contribution goals)
  const percent =
    goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        width: "100%",
        "&:hover": { boxShadow: 4 },
        opacity: goal.completed ? 0.6 : 1,
      }}
    >
      <Stack spacing={1.5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              bgcolor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
              color: "text.primary",
            }}
          >
            {getGoalIcon(goal.icon)}
          </Avatar>
          <Typography
            variant="h6"
            fontWeight={500}
            sx={{ flexGrow: 1, textTransform: "capitalize", mt: 1 }}
          >
            {goal.title}
          </Typography>
          {!goal.completed && (
            <IconButton size="small" sx={{ mt: 0.5 }}>
              <MoreVert />
            </IconButton>
          )}
        </Box>
        {goal.type === "Saving" ? (
          <SavingGoalContent goal={goal} />
        ) : (
          <ContributionGoalContent goal={goal} />
        )}
        {goal.type === "Saving" && (
          <LinearProgress
            variant="determinate"
            value={percent}
            color={percent > 70 ? "warning" : "primary"}
            sx={{ height: 8, borderRadius: 5 }}
          />
        )}
        {!goal.completed && (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {goal.type === "Saving" ? (
              <Button variant="contained" size="small">
                Add Money
              </Button>
            ) : (
              <Button variant="contained" size="small">
                View History
              </Button>
            )}
            <Button variant="outlined" size="small">
              Details
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
