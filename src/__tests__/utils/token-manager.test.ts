import { AuthenticationError } from '../../errors/authentication-error';
import { InvariantError } from '../../errors/invariant-error';
import { TokenManager } from '../../utils/token/token-manager';
import jwt from 'jsonwebtoken';

// Mock the jsonwebtoken library
jest.mock('jsonwebtoken', () => ({
	sign: jest.fn(),
	verify: jest.fn(),
}));

describe('Token manager', () => {
	describe('generateAccessToken function/property', () => {
		it('should generate access token correctly', () => {
			// Arrange
			const payload = { id: 'userId' };
			(jwt.sign as jest.Mock).mockReturnValue('mockAccessToken');

			// Action
			const accessToken = TokenManager.generateAccessToken(payload);

			// Assert
			expect(jwt.sign).toBeCalledWith(payload, expect.anything(), {
				expiresIn: '3h',
			});
			expect(accessToken).toEqual('mockAccessToken');
		});
	});

	describe('generateRefreshToken function/property', () => {
		it('should generate refresh token correctly', () => {
			// Arrange
			const payload = { id: 'userId' };
			(jwt.sign as jest.Mock).mockReturnValue('mockRefreshToken');

			// Action
			const refreshToken = TokenManager.generateRefreshToken(payload);

			// Assert
			expect(jwt.sign).toBeCalledWith(payload, expect.anything());
			expect(refreshToken).toEqual('mockRefreshToken');
		});
	});

	describe('verifyAccessToken function/property', () => {
		it('should throw authentication error when verification failed', () => {
			// Arrange
			const accessToken = TokenManager.generateAccessToken({
				id: 'userId',
			});

			(jwt.verify as jest.Mock).mockImplementation(() => {
				throw new AuthenticationError('Unvalid token');
			});

			// Action & Assert
			expect(() => TokenManager.verifyAccessToken({ accessToken })).toThrow(
				AuthenticationError,
			);
		});

		it('should not throw error and return the decoded token', () => {
			// Arrange
			const accessToken = TokenManager.generateAccessToken({
				id: 'userId',
			});
			const decodedToken = { id: 'user-123' };

			(jwt.verify as jest.Mock).mockReturnValue(decodedToken);

			// Action
			const result = TokenManager.verifyAccessToken({ accessToken });

			// Assert
			expect(jwt.verify).toHaveBeenCalledWith(accessToken, expect.anything());
			expect(result).toEqual(decodedToken);
		});
	});

	describe('verifyRefreshToken function/property', () => {
		it('should throw invariant error when verification failed', () => {
			// Arrange
			const refreshToken = TokenManager.generateRefreshToken({
				id: 'userId',
			});

			(jwt.verify as jest.Mock).mockImplementation(() => {
				throw new InvariantError('Unvalid refresh token');
			});

			// Action & Assert
			expect(() => TokenManager.verifyRefreshToken({ refreshToken })).toThrow(
				InvariantError,
			);
		});

		it('should not throw error and return the decoded token', () => {
			// Arrange
			const refreshToken = TokenManager.generateRefreshToken({
				id: 'userId',
			});
			const decodedToken = { id: 'user-123' };

			(jwt.verify as jest.Mock).mockReturnValue(decodedToken);

			// Action
			const result = TokenManager.verifyRefreshToken({ refreshToken });

			// Assert
			expect(jwt.verify).toHaveBeenCalledWith(refreshToken, expect.anything());
			expect(result).toEqual(decodedToken);
		});
	});
});
