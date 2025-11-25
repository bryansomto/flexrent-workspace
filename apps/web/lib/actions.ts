'use server';
import { auth } from '@/auth';
import { cache } from 'react';
import { prisma } from './prisma';
import { SignupFormData, signupSchema } from './validations/zodAuth';
import bcrypt from "bcrypt";

// This function is cached for the duration of the request
export const getLoggedInUser = cache(async () => {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      tenantProfile: true,
      accounts: true,
      transactions: { take: 5, orderBy: { date: "desc" } },
      goals: true,
    },
  });

  if (!user) return null;

  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    tenantProfile: user.tenantProfile
      ? { ...user.tenantProfile, currentRent: Number(user.tenantProfile.currentRent) }
      : null,
    accounts: user.accounts.map((acc) => ({
      ...acc,
      balance: Number(acc.balance),
    })),
    transactions: user.transactions.map((t) => ({
      ...t,
      amount: Number(t.amount),
    })),
    goals: user.goals.map((g) => ({
          ...g,
          currentAmount: Number(g.currentAmount),
          targetAmount: Number(g.targetAmount),
          contributionAmount: Number(g.contributionAmount || 0),
        })),
  };
});

export async function registerUser(data: SignupFormData) {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields" };
  }

  const { email, password, firstName, lastName } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { success: false, message: "Email already in use." };
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword, 
      },
    });
    return { success: true, message: "Account created successfully!" };
  } catch (error) {
    return { success: false, message: "Database error: Failed to create user." };
  }
}