/**
 * An array of routes that are public and do not require authentication.
 * These routes are accessible to all users, regardless of their authentication status.
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings.
 * @type {string[]}
 */
export const authRoutes = [
	'/login',
	'/register',
	'/auth/error',
	'/auth/reset',
	'/auth/new-password',
];

/**
 * The prefix for API authentication routes.
 * This prefix is used to group all authentication-related API routes under a common path.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
