import { PrismaClient } from '@/prisma/generated';

const singletonPrisma = () => {
	return
}

const prisma = new PrismaClient();

export default prisma;
export const db = prisma;
