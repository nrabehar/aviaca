import { getUserById } from '@/data/user';
import authConfig from '@/lib/auth.config';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/login',
		error: '/auth/error',
	},
	events: {
		async signIn({ user, account }) {
			// Allow OAuth email verification
			if (account?.provider !== 'credentials') return;
			if (!user || !user.id) return;
			const existingUser = await getUserById(user.id);
			if (!existingUser?.emailVerified) return;
		},
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: {
					emailVerified: new Date(),
					username:
						user.email?.split('@')[0] ||
						`${user.name?.replaceAll(' ', '')}${new Date().getTime()}`,
				},
			});
		},
	},
	callbacks: {
		async session({ token, session }) {
			console.log('Session callback', token);
			if (session.user && token.sub) session.user.id = token.sub;
			if (session.user && token.role) session.user.role = token.role;
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			token.role = existingUser.role;
			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},
	...authConfig,
});
