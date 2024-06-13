import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[a-zA-Z0-9@#$%^&*!]/),
  role: z.string(),
  // Add more fields as needed
});
export const UsernameValidation = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
});

// Validation for email
export const EmailValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// Role validation
const roles = ["admin", "user", "guest"] as const; // Define your roles here
export const RoleValidation = z.object({
  role: z.enum(roles, { message: "Invalid role" }),
});
