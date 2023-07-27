import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async';
import {
	addUser,
	getUserById,
	getUserByUsername,
} from '../services/postgres/users-service';
import UsersValidator from '../validators/users';
import { InvariantError } from '../errors/invariant-error';
import { NotFoundError } from '../errors/notfound-error';

interface Payload {
	username: string;
	password: string;
	fullname: string;
}

const addUserHandler = asyncWrapper(async (req: Request, res: Response) => {
	const { username, password, fullname }: Payload = req.body;

	UsersValidator.validateUserPayload({ username, password, fullname });
	const addedUser = await addUser({ username, password, fullname });

	res.status(201).json({ status: 'success', data: { addedUser } });
});

const getUserByUsernameHandler = asyncWrapper(
	async (req: Request, res: Response) => {
		const { username } = req.query;
		let users;

		if (username && typeof username === 'string') {
			users = await getUserByUsername({ username });
		} else {
			throw new InvariantError('Username is undefined');
		}

		res.json({ status: 'success', data: { users } });
	},
);

const getUserByIdHandler = asyncWrapper(async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await getUserById({ id });

	if (!user) {
		throw new NotFoundError(`User with id '${id}' not found`);
	}

	res.json({ status: 'success', data: { user } });
});

export { addUserHandler, getUserByUsernameHandler, getUserByIdHandler };
