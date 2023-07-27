import { InvariantError } from '../../errors/invariant-error';
import CollaborationValidator from '../../validators/collaborations';

describe('Collaboration POST validator', () => {
	it('should throw error if payload not meet data type spesification', () => {
		// Arrange
		const payload = {
			noteId: 123 as any,
			userId: 'userId',
		};

		// Action & Assert
		expect(() =>
			CollaborationValidator.validateCollaborationPayload(payload),
		).toThrow(InvariantError);
	});

	it('should not throw error if payload correctly', () => {
		// Arrange
		const payload = {
			noteId: 'noteId',
			userId: 'userId',
		};

		// Action & Assert
		expect(() =>
			CollaborationValidator.validateCollaborationPayload(payload),
		).not.toThrowError();
	});
});
