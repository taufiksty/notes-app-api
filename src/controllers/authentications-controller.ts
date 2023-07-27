import { Request, Response } from 'express';

import asyncWrapper from '../middleware/async';

import AuthenticationsValidator from '../validators/authentications';

import { verifyUserCredential } from '../services/postgres/users-service';
import {
	addRefreshToken,
	deleteRefreshToken,
	verifyRefreshToken,
} from '../services/postgres/authentications-service';
import { TokenManager } from '../utils/token/token-manager';

const postAuthenticationHandler = asyncWrapper(
	async (req: Request, res: Response) => {
		const { username, password }: { username: string; password: string } =
			req.body;

		AuthenticationsValidator.validatePostAuthenticationPayload({
			username,
			password,
		});

		const id = await verifyUserCredential({ username, password });

		const accessToken = TokenManager.generateAccessToken({ id });
		const refreshToken = TokenManager.generateRefreshToken({ id });

		await addRefreshToken({ refreshToken });

		res.status(201).json({
			status: 'success',
			message: 'Autentikasi berhasil',
			data: { accessToken, refreshToken },
		});
	},
);

const putAuthenticationHandler = asyncWrapper(
	async (req: Request, res: Response) => {
		const { refreshToken }: { refreshToken: string } = req.body;

		AuthenticationsValidator.validatePutAuthenticationPayload({ refreshToken });

		await verifyRefreshToken({ refreshToken });

		const { id }: { id: string } = TokenManager.verifyRefreshToken({
			refreshToken,
		});

		const accessToken: string = TokenManager.generateAccessToken({ id });

		res.json({
			status: 'success',
			message: 'Access Token berhasil diperbarui',
			data: { accessToken },
		});
	},
);

const deleteAuthenticationHandler = asyncWrapper(
	async (req: Request, res: Response) => {
		const { refreshToken }: { refreshToken: string } = req.body;

		AuthenticationsValidator.validateDeleteAuthenticationPayload({
			refreshToken,
		});

		await verifyRefreshToken({ refreshToken });
		await deleteRefreshToken({ refreshToken });

		res.json({ status: 'success', message: 'Refresh Token berhasil dihapus' });
	},
);

export {
	postAuthenticationHandler,
	putAuthenticationHandler,
	deleteAuthenticationHandler,
};
