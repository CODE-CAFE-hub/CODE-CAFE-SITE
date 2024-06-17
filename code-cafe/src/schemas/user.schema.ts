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
export const UsernameValidation = z.string().min(3).max(50);

// Validation for email
export const EmailValidation = z
  .string()
  .email({ message: "Invalid email address" });

// Role validation
const roles = ["admin", "user", "guest"] as const; // Define your roles here
export const RoleValidation = z.enum(roles, { message: "Invalid role" });
