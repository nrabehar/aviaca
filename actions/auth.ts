'use server';

import { db } from '@/lib/db';
import {
	LoginSchema,
	LoginSchemaType,
	RegisterSchema,
	RegisterSchemaType,
} from '@/schemas/auth';
import bcrypt from 'bcryptjs';

export const login = async (data: LoginSchemaType) => {
	const validatedData = LoginSchema.safeParse(data);

	if (!validatedData.success)
		return {
			message: 'Invalid fields',
			success: false,
		};

	return {
		message: 'Login successful',
		success: true,
	};
};

export const register = async (data: RegisterSchemaType) => {
	const validatedData = RegisterSchema.safeParse(data);

	if (!validatedData.success)
		return {
			message: 'Invalid fields',
			success: false,
		};
	const { name, email, password } = validatedData.data;
	const hasedPassword = await bcrypt.hash(password, 12);

	const existingUser = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser)
		return {
			message: 'Email already in use!',
			success: false,
		};

	await db.user.create({
		data: {
			name,
			email,
		},
	});

	return {
		message: 'Registration successful',
		success: true,
	};
};
