import Joi from 'joi';

const ExportNotesPayloadSchema = Joi.object({
	targetEmail: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
});

export default ExportNotesPayloadSchema;
