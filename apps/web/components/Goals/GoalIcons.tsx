import {
  House,
  Build,
  Storefront,
  VerifiedUser,
  Savings,
} from "@mui/icons-material";

// 1. The list of special housing goals
export const HOUSING_GOAL_TYPES = [
  "RentRenewal",
  "Furniture",
  "ServiceCharge",
  "SecurityDeposit",
];

// 2. The Mapper Function
export const getGoalIcon = (iconKey: string) => {
  switch (iconKey) {
    case "RentRenewal":
      return <House />;
    case "ServiceCharge":
      return <Build />;
    case "Furniture":
      return <Storefront />;
    case "SecurityDeposit":
      return <VerifiedUser />;
    default:
      // Fallback for any other string
      return <Savings />;
  }
};
