import { InvariantError } from '../../errors/invariant-error';
import ExportNotesPayloadSchema from './schema';

interface Payload {
	targetEmail: string;
}

const ExportsValidator = {
	validateExportPayload: (payload: Payload) => {
		const validationResult = ExportNotesPayloadSchema.validate(payload);

		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message);
		}
	},
};

export default ExportsValidator;
