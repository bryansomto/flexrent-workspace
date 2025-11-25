import { Typography } from "@mui/material";

interface BudgetStatusChipProps {
  percent: number;
}

export default function BudgetStatusChip({ percent }: BudgetStatusChipProps) {
  if (percent > 100) {
    return (
      <Typography variant="body2" fontWeight={600} color="error.main">
        Over
      </Typography>
    );
  }
  if (percent > 70) {
    return (
      <Typography variant="body2" fontWeight={600} color="warning.main">
        At Risk
      </Typography>
    );
  }
  return (
    <Typography variant="body2" fontWeight={600} color="success.main">
      On Track
    </Typography>
  );
}
