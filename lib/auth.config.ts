import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { getUserByEmail, getUserByUsername } from '@/data/user';
import { LoginSchema } from '@/schemas/auth.schema';
import { isEmail } from '@/utils/isEmail';
import bcrypt from 'bcryptjs';


export default {
	providers: [
		Google,
		Github,
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { identifier, password } = validatedFields.data;
					const user = isEmail(identifier)
						? await getUserByEmail(identifier)
						: await getUserByUsername(identifier);
					if (!user || !user.password) {
						return null;
					}
					const passwordMatch = await bcrypt.compare(password, user.password);
					if (!passwordMatch) {
						return null;
					}
					return user;
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
