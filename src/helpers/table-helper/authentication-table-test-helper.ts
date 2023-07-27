/** istanbul ignore file */
import { Authentication } from '@prisma/client';
import prisma from '../../database/prisma';

const AuthenticationTableTestHelper = {
	async addToken(refreshToken: string): Promise<void> {
		await prisma.authentication.create({ data: { token: refreshToken } });
	},
	async findToken(refreshToken: string): Promise<object | null> {
		const token: Authentication | null = await prisma.authentication.findFirst({
			where: { token: refreshToken },
		});

		return token;
	},

	async cleanTable(): Promise<void> {
		await prisma.authentication.deleteMany();
	},
};

export default AuthenticationTableTestHelper;
