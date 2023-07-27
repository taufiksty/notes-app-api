import { InvariantError } from '../../errors/invariant-error';
import {
	DeleteAuthenticationPayloadSchema,
	PostAuthenticationPayloadSchema,
	PutAuthenticationPayloadSchema,
} from './schema';

const AuthenticationsValidator = {
	validatePostAuthenticationPayload: (payload: {
		username: string;
		password: string;
	}) => {
		const validationResult = PostAuthenticationPayloadSchema.validate(payload);

		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message);
		}
	},
	validatePutAuthenticationPayload: (payload: { refreshToken: string }) => {
		const validationResult = PutAuthenticationPayloadSchema.validate(payload);

		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message);
		}
	},
	validateDeleteAuthenticationPayload: (payload: { refreshToken: string }) => {
		const validationResult =
			DeleteAuthenticationPayloadSchema.validate(payload);

		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message);
		}
	},
};

export default AuthenticationsValidator;
