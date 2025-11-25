"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  LinearProgress,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getGoalIcon } from "../Goals/GoalIcons";
import { SerializedGoal } from "../../lib/definitions";
import { formatCurrency } from "../../lib/utils";

interface GoalItemProps {
  goal: SerializedGoal;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const isCompleted = goal.completed || progress >= 100;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ color: isCompleted ? "success.main" : "primary.main" }}>
            {getGoalIcon(goal.icon)}
          </Box>
          <Typography variant="body1" fontWeight={500}>
            {goal.title}
          </Typography>
        </Stack>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {formatCurrency(goal.currentAmount)}
        </Typography>
      </Stack>

      <Box sx={{ mt: 1, mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          color={isCompleted ? "success" : "primary"}
          sx={{ height: 8, borderRadius: 5 }}
        />
      </Box>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption" color="text.secondary">
          Target: {formatCurrency(goal.targetAmount)}
        </Typography>
        <Typography
          variant="caption"
          fontWeight="bold"
          color={isCompleted ? "success.main" : "text.secondary"}
        >
          {isCompleted ? "Completed!" : `${progress.toFixed(0)}%`}
        </Typography>
      </Stack>
    </Box>
  );
};

interface GoalsCardProps {
  goals?: SerializedGoal[];
}

export default function GoalsCard({ goals = [] }: GoalsCardProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log("Goals received in Card:", goals);
  }, [goals]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const activeGoals = goals.filter((goal) => !goal.completed);
  const completedGoals = goals.filter((goal) => goal.completed);
  const goalsToDisplay = activeGoals.slice(0, 3);

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
          <Typography variant="h6" fontWeight={600}>
            Savings Goals
          </Typography>
          <IconButton onClick={handleMenuClick} size="small">
            <MoreVertIcon />
          </IconButton>
        </Stack>

        <Stack spacing={3}>
          {/* RENDER ACTIVE GOALS */}
          {goalsToDisplay.length > 0 ? (
            goalsToDisplay.map((goal) => <GoalItem key={goal.id} goal={goal} />)
          ) : (
            // EMPTY STATE
            <Box
              sx={{
                p: 2,
                textAlign: "center",
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Start saving for next year's rent renewal!
              </Typography>
              <Button variant="text" size="small" sx={{ mt: 1 }}>
                Create Goal
              </Button>
            </Box>
          )}

          {/* RENDER COMPLETED SUMMARY */}
          {completedGoals.length > 0 && (
            <Typography
              variant="caption"
              color="success.main"
              textAlign="center"
              sx={{ display: "block", mt: 2 }}
            >
              🎉 {completedGoals.length} Goal(s) Completed!
            </Typography>
          )}
        </Stack>

        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>New Goal</MenuItem>
          <MenuItem onClick={handleMenuClose}>View All Goals</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}
