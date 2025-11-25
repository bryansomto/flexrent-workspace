import { z } from "zod";

// --- Login Schema ---
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.union([z.boolean(), z.string()]).optional(),
});

// Extract the Type automatically from the schema
export type LoginFormData = z.infer<typeof loginSchema>;

// --- Signup Schema ---
export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;

// --- KYC Schema ---
export const kycSchema = z.object({
  middleName: z.string().optional(), // or required if KYC provider insists
  dateOfBirth: z.date(),
  bvn: z.string().length(11),
  address: z.string(),
});

export type KYCFormData = z.infer<typeof kycSchema>;