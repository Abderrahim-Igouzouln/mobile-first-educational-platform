import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email invalide.').toLowerCase().trim(),
  password: z.string().min(10, 'Minimum 10 caractères.').regex(/[A-Z]/, 'Doit contenir une majuscule.').regex(/[0-9]/, 'Doit contenir un chiffre.').regex(/[^a-zA-Z0-9]/, 'Doit contenir un caractère spécial.'),
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export const resendVerificationSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(10, 'Minimum 10 caractères.').regex(/[A-Z]/, 'Doit contenir une majuscule.').regex(/[0-9]/, 'Doit contenir un chiffre.'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(10, 'Minimum 10 caractères.').regex(/[A-Z]/, 'Doit contenir une majuscule.').regex(/[0-9]/, 'Doit contenir un chiffre.'),
});
