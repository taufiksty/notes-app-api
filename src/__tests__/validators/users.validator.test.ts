import { InvariantError } from '../../errors/invariant-error';
import UsersValidator from '../../validators/users';

describe('User POST validator', () => {
	it('should throw error if payload not contain needed property', () => {
		// Arrange
		const payload: any = {
			username: 'username',
			fullname: 'fullname',
		};

		// Action & Assert
		expect(() => UsersValidator.validateUserPayload(payload)).toThrowError();
	});

	it('should throw error if payload not meet data type spesification', () => {
		// Arrange
		const payload: any = {
			username: 'username',
			password: 123,
			fullname: 'fullname',
		};

		// Action & Assert
		expect(() => UsersValidator.validateUserPayload(payload)).toThrowError();
	});

	it('should throw error if payload username length < 6 or password length < 8', () => {
		// Arrange
		const payload: any = {
			username: 'user',
			password: 'password',
			fullname: 'fullname',
		};

		// Action & Assert
		expect(() => UsersValidator.validateUserPayload(payload)).toThrow(
			InvariantError,
		);
	});

	it('should not throw error if payload correctly', () => {
		// Arrange
		const payload: any = {
			username: 'username',
			password: 'password',
			fullname: 'fullname',
		};

		// Action & Assert
		expect(() =>
			UsersValidator.validateUserPayload(payload),
		).not.toThrowError();
	});
});
