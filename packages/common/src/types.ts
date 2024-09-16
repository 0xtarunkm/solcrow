import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, 'Username must be 3 character log')
    .max(20, 'Username must be no longer than 20 characters'),
  lastName: z
    .string()
    .min(3, 'Username must be 3 character log')
    .max(20, 'Username must be no longer than 20 characters'),
  email: z.string().includes('@').email('This is not a valid email'),
  password: z.string().min(6, "Password can't be less than 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email().includes('@').min(3).max(20),
  password: z.string().min(6).max(20),
});

export type userSignupInputType = z.infer<typeof registerSchema>;
export type userLoginInputType = z.infer<typeof loginSchema>;
