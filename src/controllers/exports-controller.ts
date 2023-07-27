import { Response } from 'express';
import asyncWrapper from '../middleware/async';
import RequestWithAuth from '../types/request-with-auth';
import ExportsValidator from '../validators/exports';
import ProducerService from '../services/rabbitmq/producer-service';

const postExportNotesHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		const { targetEmail }: { targetEmail: string } = req.body;
		const userId = req.auth?.id;

		ExportsValidator.validateExportPayload({ targetEmail });

		const message = { userId, targetEmail };

		await ProducerService.sendMessage('export:notes', JSON.stringify(message));

		res
			.status(201)
			.json({ status: 'success', message: 'Permintaan Anda dalam antrean' });
	},
);

export { postExportNotesHandler };
