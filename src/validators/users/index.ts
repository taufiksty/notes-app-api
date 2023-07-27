import { InvariantError } from '../../errors/invariant-error';
import UserPayloadSchema from './schema';

interface Payload {
	username: string;
	password: string;
	fullname: string;
}

const UsersValidator = {
	validateUserPayload: (payload: Payload) => {
		const validationResult = UserPayloadSchema.validate(payload);

		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message);
		}
	},
};

export default UsersValidator;
