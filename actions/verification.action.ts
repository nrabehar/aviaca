'use server';

import { getUserByEmail } from '@/data/user';
import { getPasswordResetTokenByToken, getVerificationTokenByToken } from '@/data/verification-token';
import { db } from '@/lib/db';

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);
	if (!existingToken) {
		return {
			message: 'Token does not exist',
			success: false,
		};
	}
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return {
			message: 'Token has expired',
			success: false,
		};
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return {
			message: 'User does not exist',
			success: false,
		};
	}

	await db.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	});
	await db.verificationToken.delete({
		where: {
			id: existingToken.id,
		},
	});
	return {
		message: 'Email verified successfully',
		success: true,
	};
};

export const passwordResetVerification = async (token: string) => {
	const existingToken = await getPasswordResetTokenByToken(token);
	if (!existingToken) {
		return {
			message: 'Token does not exist',
			success: false,
		};
	}
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return {
			message: 'Token has expired',
			success: false,
		};
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return {
			message: 'User does not exist',
			success: false,
		};
	}
	return {
		message: 'Token verified successfully',
		success: true,
	};
};
