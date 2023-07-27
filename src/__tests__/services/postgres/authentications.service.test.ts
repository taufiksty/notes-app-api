import prisma from '../../../database/prisma';
import { InvariantError } from '../../../errors/invariant-error';
import AuthenticationTableTestHelper from '../../../helpers/table-helper/authentication-table-test-helper';
import {
	addRefreshToken,
	deleteRefreshToken,
	verifyRefreshToken,
} from '../../../services/postgres/authentications-service';

describe('Authentication service postgres', () => {
	afterEach(async () => {
		await AuthenticationTableTestHelper.cleanTable();
	});

	afterAll(async () => {
		await prisma.$disconnect();
	});

	describe('addRefreshToken function', () => {
		it('should add refresh token to database', async () => {
			// Arrange
			const refreshToken = 'refreshToken';

			// Action
			await addRefreshToken({ refreshToken });

			// Assert
			const { token }: any = await AuthenticationTableTestHelper.findToken(
				refreshToken,
			);
			expect(token).toBe(refreshToken);
		});
	});

	describe('verifyRefreshToken function', () => {
		it('should throw invariant error if token not available', async () => {
			// Arrange
			const refreshToken = 'refreshToken';

			// Action & Assert
			await expect(verifyRefreshToken({ refreshToken })).rejects.toThrow(
				InvariantError,
			);
		});

		it('should not throw invariant error if token available', async () => {
			// Arrange
			const refreshToken = 'refreshToken';
			await AuthenticationTableTestHelper.addToken(refreshToken);

			// Action & Assert
			await expect(verifyRefreshToken({ refreshToken })).resolves.not.toThrow(
				InvariantError,
			);
		});
	});

	describe('deleteRefreshToken function', () => {
		it('should delete refresh token from database', async () => {
			// Arrange
			const refreshToken = 'refreshToken';
			await AuthenticationTableTestHelper.addToken(refreshToken);

			// Action
			await deleteRefreshToken({ refreshToken });

			// Assert
			const token = await AuthenticationTableTestHelper.findToken(refreshToken);
			expect(token).toEqual(null);
		});
	});
});
