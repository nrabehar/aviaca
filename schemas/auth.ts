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

type LoginSchemaType = z.infer<typeof LoginSchema>;
type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export type { LoginSchemaType, RegisterSchemaType };
