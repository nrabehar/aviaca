export const isEmail = (identifier: string) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(identifier);
};
