import { InvariantError } from '../../errors/invariant-error';
import NotesValidator from '../../validators/notes';

describe('Note POST and PUT validator', () => {
	it('should throw error if payload not contain needed property', () => {
		// Arrange
		const payload: any = {
			body: 'body',
			tags: ['first', 'second'],
		};

		// Action & Assert
		expect(() => NotesValidator.validateNotePayload(payload)).toThrow(
			InvariantError,
		);
	});

	it('should throw error if payload not meet data type spesification', () => {
		// Arrange
		const payload: any = {
			title: 'title',
			body: 'body',
			tags: {},
		};

		// Action & Assert
		expect(() => NotesValidator.validateNotePayload(payload)).toThrow(
			InvariantError,
		);
	});

	it('should not throw error if payload correctly', () => {
		// Arrange
		const payload: any = {
			title: 'title',
			body: 'body',
			tags: ['first', 'second'],
		};

		// Action & Assert
		expect(() =>
			NotesValidator.validateNotePayload(payload),
		).not.toThrowError();
	});
});
