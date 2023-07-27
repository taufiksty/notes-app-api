import jwt, { Secret } from 'jsonwebtoken';
import config from '../../config';
import { InvariantError } from '../../errors/invariant-error';
import { AuthenticationError } from '../../errors/authentication-error';

interface TokenManager {
	generateAccessToken: (payload: { id: string }) => string;
	generateRefreshToken: (payload: { id: string }) => string;
	verifyAccessToken: (payload: { accessToken: string }) => any;
	verifyRefreshToken: (payload: { refreshToken: string }) => any;
}

export const TokenManager: TokenManager = {
	generateAccessToken: (payload) =>
		jwt.sign(payload, config.jwt.accessToken as Secret, { expiresIn: '3h' }),
	generateRefreshToken: (payload) =>
		jwt.sign(payload, config.jwt.refreshToken as Secret),
	verifyAccessToken: (payload) => {
		try {
			const decodedToken = jwt.verify(
				payload.accessToken,
				config.jwt.accessToken as Secret,
			);
			return decodedToken;
		} catch (error) {
			throw new AuthenticationError('Token tidak valid');
		}
	},
	verifyRefreshToken: (payload) => {
		try {
			const decodedToken = jwt.verify(
				payload.refreshToken,
				config.jwt.refreshToken as Secret,
			);
			return decodedToken;
		} catch (error) {
			throw new InvariantError('Refresh token tidak valid');
		}
	},
};
