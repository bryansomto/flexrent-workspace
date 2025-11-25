import { User, Account, Transaction, Goal, TransactionCategory, TransactionType, TenantProfile } from "@prisma/client";

// Constant definition using the real Prisma Enum
export const TX_CATEGORIES: TransactionCategory[] = [
  "RENT_PAYMENT",
  "SERVICE_CHARGE",
  "UTILITIES"
];

export const TX_TYPES: TransactionType[] = [
  "INCOME",
  "EXPENSE"
];

export interface Filters {
  dateRange?: string;
  accountId?: string;
  type?: TransactionType | "All";
  category?: TransactionCategory | "All";
  searchQuery?: string;
}

// Account: Overwrite 'balance' (Decimal -> number)
export type SerializedAccount = Omit<Account, "balance"> & { 
  balance: number 
};

// Transaction: Overwrite 'amount' (Decimal -> number)
export type SerializedTransaction = Omit<Transaction, "amount"> & { 
  amount: number 
};

// Goal: Overwrite decimal fields
export type SerializedGoal = Omit<Goal, "currentAmount" | "targetAmount" | "contributionAmount"> & {
  currentAmount: number;
  targetAmount: number;
  contributionAmount: number | null;
};

// TenantProfile: Overwrite 'currentRent' (Decimal -> number)
export type SerializedTenantProfile = Omit<TenantProfile, "currentRent"> & {
  currentRent: number;
};

// Main User Data Type
export type SerializedUserData = Omit<User, "accounts" | "transactions" | "tenantProfile" // Remove the raw Prisma fields
> & {
  fullName: string;
  tenantProfile?: SerializedTenantProfile | null;
  accounts: SerializedAccount[];
  transactions?: SerializedTransaction[];
  goals?: SerializedGoal[];
};

export interface UserPageProps {
  accounts: SerializedUserData["accounts"];
  transactions?: SerializedTransaction[]; 
  annualRent?: number; 
}

