'use server';

import { getUserByEmail, getUserByUsername } from '@/data/user';
import { getPasswordResetTokenByToken } from '@/data/verification-token';
import { signIn } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';
import {
	generatePasswordResetToken,
	generateVerificationToken,
} from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {
	LoginSchema,
	LoginSchemaType,
	PasswordSchema,
	PasswordSchemaType,
	RegisterSchema,
	RegisterSchemaType,
	ResetSchema,
	ResetSchemaType,
} from '@/schemas/auth.schema';
import { isEmail } from '@/utils/isEmail';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export const socialLogin = async (provider: 'google' | 'github') => {
	console.log('Signing in with', provider);
	await signIn(provider, {
		redirectTo: DEFAULT_LOGIN_REDIRECT,
	});
};

export const login = async (data: LoginSchemaType) => {
	const validatedData = LoginSchema.safeParse(data);

	if (!validatedData.success)
		return {
			message: 'Invalid fields',
			success: false,
		};

	const { identifier, password } = validatedData.data;

	const user = isEmail(identifier)
		? await getUserByEmail(identifier)
		: await getUserByUsername(identifier);
	if (!user || !user.password || !user.email)
		return {
			message: 'Email does not exist',
			success: false,
		};

	if (!user.emailVerified) {
		const verificationToken = await generateVerificationToken(user.email);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);
		return {
			message:
				'An email has been sent to your email address to verify your account',
			success: true,
		};
	}

	try {
		await signIn('credentials', {
			identifier,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {
						message: 'Wrong account information',
						success: false,
					};
				default:
					return {
						message: 'Something went wrong',
						success: false,
					};
			}
		}
		throw error;
	}
};

export const register = async (data: RegisterSchemaType) => {
	console.log('Registering user');
	const validatedData = RegisterSchema.safeParse(data);

	if (!validatedData.success)
		return {
			message: 'Invalid fields',
			success: false,
		};
	const { name, email, password } = validatedData.data;
	const hasedPassword = await bcrypt.hash(password, 12);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		console.log('User already exists');
		return {
			message: 'Email already in use!',
			success: false,
		};
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hasedPassword,
		},
	});
	const username = email.split('@')[0];
	await db.user.update({
		where: { email },
		data: {
			username: username,
		},
	});
	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);
	return {
		message: 'Confirm your email to complete registration',
		success: true,
	};
};

export const reset = async (data: ResetSchemaType) => {
	const validatedData = ResetSchema.safeParse(data);

	if (!validatedData.success)
		return {
			message: 'Invalid email!',
			success: false,
		};

	const { email } = validatedData.data;

	const user = await getUserByEmail(email);
	if (!user) {
		return {
			message: 'Email does not exist',
			success: false,
		};
	}

	const verificationToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(
		verificationToken.email,
		verificationToken.token,
	);
	return {
		message: 'Check your email for the reset link',
		success: true,
	};
};

export const newPassword = async (data: PasswordSchemaType) => {
	const validatedData = PasswordSchema.safeParse(data);
	if (!validatedData.success)
		return {
			message: 'Invalid fields',
			success: false,
		};
	const { password, confirmPassword, token } = validatedData.data;

	if (password !== confirmPassword)
		return {
			message: 'Passwords do not match',
			success: false,
		};

	const existToken = await getPasswordResetTokenByToken(token);
	if (!existToken)
		return {
			message: 'Token does not exist',
			success: false,
		};
	const existingUser = await getUserByEmail(existToken.email);
	if (!existingUser)
		return {
			message: 'User does not exist',
			success: false,
		};
	const hashedPassword = await bcrypt.hash(password, 12);
	await db.user.update({
		where: { email: existToken.email },
		data: {
			password: hashedPassword,
		},
	});
	await db.passwordResetToken.delete({
		where: { id: existToken.id },
	});
	return {
		message: 'Password updated successfully',
		success: true,
	};
};
