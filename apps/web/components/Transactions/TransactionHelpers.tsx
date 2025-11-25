import {
  ShoppingCart,
  Theaters,
  Bolt,
  DirectionsBus,
  Redeem,
  House,
  Build,
  AttachMoney,
  Favorite,
  Category,
} from "@mui/icons-material";
import { TransactionCategory } from "@prisma/client";

// Helper to get the list of categories directly from the Prisma Enum
export const transactionCategories = Object.values(TransactionCategory);

// Map Prisma Enums to Icons
export const getCategoryIcon = (category: TransactionCategory | string) => {
  switch (category) {
    case "GROCERIES":
      return <ShoppingCart />;
    case "ENTERTAINMENT":
      return <Theaters />;
    case "UTILITIES":
      return <Bolt />;
    case "TRANSPORT":
      return <DirectionsBus />;
    case "SHOPPING":
      return <Redeem />;
    case "RENT_PAYMENT":
      return <House />;
    case "SERVICE_CHARGE":
      return <Build />;
    case "SALARY": // Corresponds to 'Income' usually
      return <AttachMoney />;
    case "DONATION":
      return <Favorite />;
    default:
      return <Category />;
  }
};
