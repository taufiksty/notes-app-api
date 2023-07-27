import { NextFunction, Response } from 'express';
import { AuthenticationError } from '../errors/authentication-error';
import { TokenManager } from '../utils/token/token-manager';
import RequestWithAuth from '../types/request-with-auth';

const auth = (req: RequestWithAuth, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.split(' ')[1];

	if (!token) {
		throw new AuthenticationError('Token tidak ada, harap masukkan token');
	}

	try {
		const decodedToken = TokenManager.verifyAccessToken({ accessToken: token });
		req.auth = decodedToken;
		next();
	} catch (error) {
		throw new AuthenticationError('Token tidak valid');
	}
};

export default auth;
