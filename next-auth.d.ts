import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
	role: UserRole;
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}

import 'next-auth/jwt';
import { UserRole } from './prisma/generated';

declare module 'next-auth/jwt' {
	interface JWT {
		role: UserRole;
	}
}
