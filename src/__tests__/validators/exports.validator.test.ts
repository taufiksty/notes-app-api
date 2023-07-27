import { InvariantError } from '../../errors/invariant-error';
import ExportsValidator from '../../validators/exports';

describe('Export POST validator', () => {
	it('should throw error if email is not valid', () => {
		// Arrange
		const payload = {
			targetEmail: 'target@mail',
		};

		// Action & Assert
		expect(() =>
			ExportsValidator.validateExportPayload(payload),
		).toThrow(InvariantError);
	});

	it('should not throw error if payload is correctly', () => {
		// Arrange
		const payload = {
			targetEmail: 'target@mail.com',
		};

		// Action & Assert
		expect(() =>
			ExportsValidator.validateExportPayload(payload),
		).not.toThrowError();
	});
});
