import { InvariantError } from '../../errors/invariant-error';
import CollaborationPayloadSchema from './schema';

interface Payload {
	noteId: string;
	userId: string;
}

const CollaborationValidator = {
	validateCollaborationPayload: (payload: Payload) => {
		const validationResult = CollaborationPayloadSchema.validate(payload);

		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message);
		}
	},
};

export default CollaborationValidator;
