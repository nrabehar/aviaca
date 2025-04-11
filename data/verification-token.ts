import { db } from '@/lib/db';

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await db.verificationToken.findFirst({
			where: {
				email,
			},
		});
		return verificationToken;
	} catch (error) {
		console.error('Error fetching verification token:', error);
		return null;
	}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await db.verificationToken.findFirst({
			where: {
				token,
			},
		});
		return verificationToken;
	} catch (error) {
		console.error('Error fetching verification token:', error);
		return null;
	}
};

export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const passwordResetToken = await db.passwordResetToken.findUnique({
			where: {
				token,
			},
		});
		return passwordResetToken;
	} catch (error) {
		console.error('Error fetching password reset token:', error);
		return null;
	}
};

export const getPasswordResetTokenByEmail = async (email: string) => {
	try {
		const passwordResetToken = await db.passwordResetToken.findFirst({
			where: {
				email,
			},
		});
		return passwordResetToken;
	} catch (error) {
		console.error('Error fetching password reset token:', error);
		return null;
	}
};
