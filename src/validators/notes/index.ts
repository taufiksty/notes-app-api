import { InvariantError } from '../../errors/invariant-error';
import NotePayloadSchema from './schema';

interface Payload {
	title: string;
	body: string;
	tags: string[];
}

const NotesValidator = {
	validateNotePayload: (payload: Payload) => {
		const validationResult = NotePayloadSchema.validate(payload);

		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message);
		}
	},
};

export default NotesValidator;
