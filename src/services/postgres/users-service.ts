import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import prisma from '../../database/prisma';

import { AuthenticationError } from '../../errors/authentication-error';
import { InvariantError } from '../../errors/invariant-error';

import { User } from '@prisma/client';

interface Payload {
	username: string;
	password: string;
	fullname: string;
}

const addUser = async ({ username, password, fullname }: Payload) => {
	await verifyNewUsername({ username });

	const id: string = `user-${nanoid(16)}`;
	const hashedPassword: string = await bcrypt.hash(password, 10);

	const createdUser: User = await prisma.user.create({
		data: { id, username, password: hashedPassword, fullname },
	});

	return createdUser;
};

const verifyNewUsername = async ({ username }: { username: string }) => {
	const verifyUsername = await prisma.user.findFirst({ where: { username } });

	if (verifyUsername) {
		throw new InvariantError(
			'Gagal menambahkan user. Username sudah digunakan',
		);
	}
};

const getUserByUsername = async ({ username }: { username: string }) => {
	const users: object[] = await prisma.user.findMany({
		where: {
			username: { contains: username },
		},
		select: { id: true, username: true, fullname: true },
	});

	return users;
};

const getUserById = async ({ id }: { id: string }) => {
	const user: object | null = await prisma.user.findFirst({
		where: { id },
		select: { id: true, username: true, fullname: true },
	});

	return user;
};

const verifyUserCredential = async ({
	username,
	password,
}: {
	username: string;
	password: string;
}): Promise<string> => {
	const user: User | null = await prisma.user.findFirst({
		where: { username },
	});

	if (!user) {
		throw new AuthenticationError('Kredensial yang Anda berikan salah');
	}

	const { id, password: hashedPassword } = user;

	const match = await bcrypt.compare(password, hashedPassword);

	if (!match) {
		throw new AuthenticationError('Kredensial yang Anda berikan salah');
	}

	return id;
};

export { addUser, getUserByUsername, getUserById, verifyUserCredential };
