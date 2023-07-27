import { Authentication } from '@prisma/client';
import prisma from '../../database/prisma';

import { InvariantError } from '../../errors/invariant-error';

interface Payload {
	refreshToken: string;
}

const addRefreshToken = async ({ refreshToken }: Payload): Promise<void> => {
	await prisma.authentication.create({ data: { token: refreshToken } });
};

const verifyRefreshToken = async ({ refreshToken }: Payload) => {
	const token: Authentication | null = await prisma.authentication.findFirst({
		where: { token: refreshToken },
	});

	if (!token) {
		throw new InvariantError('Refresh token tidak valid');
	}
};

const deleteRefreshToken = async ({ refreshToken }: Payload): Promise<void> => {
	await prisma.authentication.delete({ where: { token: refreshToken } });
};

export { addRefreshToken, verifyRefreshToken, deleteRefreshToken };
