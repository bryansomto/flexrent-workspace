import {
  ShoppingCart,
  AttachMoney,
  Theaters,
  Bolt,
  DirectionsBus,
  Redeem,
  House,
  Savings,
  CreditCardOff,
  AccountBalance,
  FlightTakeoff,
  Storefront,
  Favorite,
  Build, // For Maintenance/Service
  VerifiedUser, // For the Credit Line
} from "@mui/icons-material";

export const spentData = [
  { label: "Service Charge", percent: 15.5, color: "#FF7043" },
  { label: "Utilities", percent: 12.9, color: "#FFA726" },
  { label: "Groceries", percent: 20.9, color: "#66BB6A" },
  { label: "FlexRent Monthly", percent: 45.5, color: "#1976D2" }, // Dominant expense
  { label: "Lifestyle", percent: 5.2, color: "#7E57C2" },
];

// Net income interface definition
interface WeeklyData {
  day: string;
  netIncome: number;
  outcome: number;
}

// Weekly Cashflow (Salary vs Spending)
export const weeklyData: WeeklyData[] = [
  { day: "Mon", netIncome: 0, outcome: 2000 },
  { day: "Tue", netIncome: 0, outcome: 1500 },
  { day: "Wed", netIncome: 0, outcome: 4500 },
  { day: "Thu", netIncome: 0, outcome: 1200 },
  { day: "Fri", netIncome: 850000, outcome: 5000 }, // Salary Day
  { day: "Sat", netIncome: 0, outcome: 15000 },
  { day: "Sun", netIncome: 0, outcome: 8000 },
  // Note: High income spike on Friday simulates Salary
];

// Goals interface definition
export type GoalType = "Saving" | "Contribution";
export interface Goal {
  id: string;
  title: string;
  icon: string;
  type: GoalType;
  currentAmount: number;
  targetAmount: number;
  contributionAmount?: number;
  completed: boolean;
}

// Goal icon helper function
export const getGoalIcon = (iconName: string) => {
  switch (iconName) {
    case "RentRenewal":
      return <House />;
    case "ServiceCharge":
      return <Build />;
    case "Furniture":
      return <Storefront />;
    case "SecurityDeposit":
      return <VerifiedUser />;
    default:
      return <Savings />;
  }
};

// Goals data (Focused on Housing)
export const mockGoals: Goal[] = [
  {
    id: "g1",
    title: "2026 Rent Renewal",
    icon: "RentRenewal",
    type: "Saving",
    currentAmount: 450000,
    targetAmount: 3000000,
    completed: false,
  },
  {
    id: "g2",
    title: "Furniture Upgrade",
    icon: "Furniture",
    type: "Saving",
    currentAmount: 150000,
    targetAmount: 600000,
    completed: false,
  },
  {
    id: "g3",
    title: "Annual Service Charge",
    icon: "ServiceCharge",
    type: "Contribution",
    currentAmount: 200000,
    targetAmount: 450000,
    contributionAmount: 50000,
    completed: false,
  },
];

// Customer accounts interface definition
export interface CustomerAccount {
  bank: string;
  shortName: string;
  accountNumber: number | string; // Changed to allow string for "Credit Line"
  balance: number;
  isSalaryAccount?: boolean; // New field for logic
  isCreditLine?: boolean; // New field to identify the App's contribution
  colorScheme?: keyof typeof colorSchemes;
}

// Customer accounts data
export const customerAccounts: CustomerAccount[] = [
  {
    bank: "FlexRent Pre-Approved",
    shortName: "Credit Limit",
    accountNumber: "FLEX-ID-001",
    balance: 3000000, // This boosts the Rent Power significantly
    isCreditLine: true,
    colorScheme: "blue", // Represents the App
  },
  {
    bank: "Guaranty Trust Bank",
    shortName: "GTBank",
    accountNumber: 2074606070,
    balance: 850400,
    isSalaryAccount: true, // This is the source
    colorScheme: "orange",
  },
  {
    bank: "Cowrywise (Savings)",
    shortName: "Cowrywise",
    accountNumber: 5677567019,
    balance: 450000,
    isSalaryAccount: false,
    colorScheme: "green",
  },
];

// Color schemes
export const colorSchemes = {
  green: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  blue: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  orange: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
};

// Categories type definition
export type TransactionCategory =
  | "Groceries"
  | "Entertainment"
  | "Utilities"
  | "Transport"
  | "Shopping"
  | "Rent Payment" // Specific to app
  | "Salary"
  | "Service Charge" // Specific to app
  | "Donation"
  | "Other";

// A list of categories for filter dropdowns
export const transactionCategories: TransactionCategory[] = [
  "Rent Payment",
  "Service Charge",
  "Salary",
  // "Groceries",
  // "Utilities",
  // "Transport",
  // "Entertainment",
  // "Other",
];

// Icon mapping helper
export const getCategoryIcon = (category: TransactionCategory) => {
  switch (category) {
    case "Groceries":
      return <ShoppingCart />;
    case "Entertainment":
      return <Theaters />;
    case "Utilities":
      return <Bolt />;
    case "Transport":
      return <DirectionsBus />;
    case "Shopping":
      return <Redeem />;
    case "Rent Payment":
      return <House />;
    case "Service Charge":
      return <Build />;
    case "Salary":
      return <AttachMoney />;
    case "Donation":
      return <Favorite />;
    default:
      return <ShoppingCart />;
  }
};

// Transaction interface definition
export interface Transaction {
  id: string;
  date: string;
  name: string;
  description?: string;
  amount: number;
  type: "Income" | "Expense";
  category: TransactionCategory;
  accountId: number | string;
}

// Transaction data
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    date: "2025-11-25T09:00:00Z",
    name: "FlexRent Monthly Debit",
    description: "Rent for November (Month 3/12)",
    amount: -210000,
    type: "Expense",
    category: "Rent Payment",
    accountId: 2074606070, // Deducted from Salary Account
  },
  {
    id: "t2",
    date: "2025-11-24T15:00:00Z",
    name: "Nestlé Nigeria PLC",
    description: "NIP Credit - Nov Salary",
    amount: 850000,
    type: "Income",
    category: "Salary",
    accountId: 2074606070,
  },
  {
    id: "t3",
    date: "2025-11-15T10:00:00Z",
    name: "Ikeja Electric (IE)",
    description: "Meter Token",
    amount: -25000,
    type: "Expense",
    category: "Utilities",
    accountId: 2074606070,
  },
  {
    id: "t4",
    date: "2025-11-10T08:15:00Z",
    name: "Estate Service Charge",
    description: "Waste & Security Levy",
    amount: -45000,
    type: "Expense",
    category: "Service Charge",
    accountId: 5677567019,
  },
  {
    id: "t5",
    date: "2025-11-05T18:00:00Z",
    name: "Shoprite Ikeja City Mall",
    amount: -35000,
    type: "Expense",
    category: "Groceries",
    accountId: 2074606070,
  },
  {
    id: "t6",
    date: "2025-11-02T10:00:00Z",
    name: "DSTV Premium",
    amount: -29000,
    type: "Expense",
    category: "Entertainment",
    accountId: 2074606070,
  },
];

// Budget interface definition
export interface Budget {
  id: string;
  category: TransactionCategory;
  limit: number;
  month: string;
}
// Budget data
export const mockBudgets: Budget[] = [
  {
    id: "b1",
    category: "Rent Payment",
    limit: 210000, // Fixed monthly
    month: "2025-11",
  },
  {
    id: "b2",
    category: "Service Charge",
    limit: 50000,
    month: "2025-11",
  },
  {
    id: "b3",
    category: "Groceries",
    limit: 100000,
    month: "2025-11",
  },
];

export const MOCK_ANNUAL_RENT_GOAL = 5000000; // 5 Million Naira Rent Goal

// --- MOCK CHART DATA GENERATION (Focusing on a 7-day flow) ---
// In a real app, this would be grouped by week/day
export const chartData = [
  { day: "Wk 1", income: 150000, housing: 0 },
  { day: "Wk 2", income: 0, housing: 150000 }, // Rent payment mock
  { day: "Wk 3", income: 50000, housing: 25000 },
  { day: "Wk 4", income: 100000, housing: 10000 },
];

// Define Housing Categories to calculate the net impact
export const HOUSING_CATEGORIES = [
  "Rent Payment",
  "Service Charge",
  "Utilities",
];

// 1. Define the interface for a Quick Action item
export interface QuickAction {
  name: string;
  icon: React.ReactElement;
  color: string;
  description: string;
  actionId: string;
}

export const QuickActionsList: QuickAction[] = [
  {
    name: "Pay Rent Now",
    icon: <House />,
    color: "primary.main",
    description: "Initiate monthly repayment or full balance settlement.",
    actionId: "payment",
  },
  {
    name: "New Repair Request",
    icon: <Build />,
    color: "warning.main",
    description: "Book verified artisans and pay via escrow.",
    actionId: "repair",
  },
  {
    name: "Boost Credit Power",
    icon: <VerifiedUser />,
    color: "success.main",
    description: "Link a new salary account or high-value asset.",
    actionId: "credit",
  },
  {
    name: "Access Documents",
    icon: <AccountBalance />,
    color: "info.main",
    description: "View your tenancy agreement and payment receipts.",
    actionId: "documents",
  },
];

// Filter the goals to only show relevant housing goals
export const HOUSING_GOAL_TYPES = [
  "RentRenewal",
  "Furniture",
  "ServiceCharge",
  "SecurityDeposit",
];

export const userProfile = {
  name: "Somtochukwu Ike-Adinnu",
  email: "bryansomto@gmail.com",
  status: "VERIFIED",
  pensionProvider: "Leadway Pensure",
  pensionStatus: "Active - 26 Remittances Found", // This is the Money Shot
  rentStatus: "Up to Date",
};
