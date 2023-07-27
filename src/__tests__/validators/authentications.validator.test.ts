import { InvariantError } from '../../errors/invariant-error';
import AuthenticationsValidator from '../../validators/authentications';

describe('Authentication POST validator', () => {
	it('should throw error when payload not contain needed min length spesification', () => {
		// Arrange
		const payload = {
			username: 'user',
			password: 'password',
		};

		// Action & Assert
		expect(() =>
			AuthenticationsValidator.validatePostAuthenticationPayload(payload),
		).toThrow(InvariantError);
	});

	it('should not throw error when payload correctly', () => {
		// Arrange
		const payload = {
			username: 'username',
			password: 'password',
		};

		// Action & Assert
		expect(() =>
			AuthenticationsValidator.validatePostAuthenticationPayload(payload),
		).not.toThrowError();
	});
});

describe('Authentication PUT validator', () => {
	it('should throw error when payload not meet data type spesification', () => {
		// Arrange
		const payload = { refreshToken: 123 as any };

		// Action & Assert
		expect(() =>
			AuthenticationsValidator.validatePutAuthenticationPayload(payload),
		).toThrow(InvariantError);
	});

	it('should not throw error when payload correctly', () => {
		// Arrange
		const payload = {
			refreshToken: 'refreshToken',
		};

		// Action & Assert
		expect(() =>
			AuthenticationsValidator.validatePutAuthenticationPayload(payload),
		).not.toThrowError();
	});
});

describe('Authentication DELETE validator', () => {
	it('should throw error when payload not meet data type spesification', () => {
		// Arrange
		const payload = { refreshToken: 123 as any };

		// Action & Assert
		expect(() =>
			AuthenticationsValidator.validateDeleteAuthenticationPayload(payload),
		).toThrow(InvariantError);
	});

	it('should not throw error when payload correctly', () => {
		// Arrange
		const payload = {
			refreshToken: 'refreshToken',
		};

		// Action & Assert
		expect(() =>
			AuthenticationsValidator.validateDeleteAuthenticationPayload(payload),
		).not.toThrowError();
	});
});
