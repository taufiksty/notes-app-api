import Joi from 'joi';

const PostAuthenticationPayloadSchema = Joi.object({
	username: Joi.string().min(6).required(),
	password: Joi.string().min(8).required(),
});

const PutAuthenticationPayloadSchema = Joi.object({
	refreshToken: Joi.string().required(),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
	refreshToken: Joi.string().required(),
});

export {
	PostAuthenticationPayloadSchema,
	PutAuthenticationPayloadSchema,
	DeleteAuthenticationPayloadSchema,
};
