import Joi from 'joi';

const UserPayloadSchema = Joi.object({
	username: Joi.string().min(6).required(),
	password: Joi.string().min(8).required(),
	fullname: Joi.string().required(),
});

export default UserPayloadSchema;
