import { z } from 'zod';

export const LoginSchema = z.object({
	identifier: z.string().min(1, {
		message: 'Please enter your email or username',
	}),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters long',
	}),
});

export const RegisterSchema = z.object({
	name: z.string().min(1, {
		message: 'Please enter your name',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address',
	}),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters long',
	}),
});

export const ResetSchema = z.object({
	email: z.string().email({
		message: 'Please enter a valid email address',
	}),
});

export const PasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters long',
	}),
	confirmPassword: z.string().min(6, {
		message: 'Password must be at least 6 characters long',
	}),
	token: z.string().min(1, {
		message: 'Token not found',
	}),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;
type RegisterSchemaType = z.infer<typeof RegisterSchema>;
type ResetSchemaType = z.infer<typeof ResetSchema>;
type PasswordSchemaType = z.infer<typeof PasswordSchema>;

export type {
	LoginSchemaType,
	PasswordSchemaType,
	RegisterSchemaType,
	ResetSchemaType
};
