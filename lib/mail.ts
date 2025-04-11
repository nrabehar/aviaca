import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, subject: string, html: string) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject,
		html,
		text: html.replace(/<[^>]+>/g, ''),
	})
}

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
	const html = `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`;
	const text = `Click here to confirm your email: ${confirmLink}`;
	await sendEmail(email, 'Confirm your email', html);
};


export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
	const html = `<p>Click <a href="${resetLink}">here</a> reset your password</p>`;
	const text = `Click here to confirm your email: ${resetLink}`;
	await sendEmail(email, 'Reset your password', html);
};
