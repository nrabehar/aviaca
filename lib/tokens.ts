import { getVerificationTokenByEmail } from '@/data/verification-token';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

	// Check if a token already exists for the email
	const existingToken = await getVerificationTokenByEmail(email);
	if (existingToken)
		await db.verificationToken.delete({ where: { id: existingToken.id } });
	// Create a new token
	const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return verificationToken;
};


export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

	// Check if a token already exists for the email
	const existingToken = await getVerificationTokenByEmail(email);
	if (existingToken)
		await db.passwordResetToken.delete({ where: { id: existingToken.id } });
	// Create a new token
	const passwordResetToken = await db.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return passwordResetToken;
}