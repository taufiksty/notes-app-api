import { Response } from 'express';
import asyncWrapper from '../middleware/async';
import RequestWithAuth from '../types/request-with-auth';
import CollaborationValidator from '../validators/collaborations';
import { verifyNoteOwner } from '../services/postgres/notes-service';
import CacheService from '../services/redis/cache-service';

import {
	addCollaboration,
	deleteCollaboration,
} from '../services/postgres/collaborations-service';

interface Payload {
	noteId: string;
	userId: string;
}

const cacheNotes = new CacheService();

const postCollaborationHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		const credentialIdUser = req.auth?.id;
		const { noteId, userId }: Payload = req.body;

		CollaborationValidator.validateCollaborationPayload({ noteId, userId });

		await verifyNoteOwner({ id: noteId, owner: credentialIdUser as string });

        const collaboration = await addCollaboration({ noteId, userId });
        
        await cacheNotes.delete(`notes:${userId}`);

		res.status(201).json({
			status: 'success',
			message: 'Kolaborasi berhasil ditambahkan',
			data: { collaboration },
		});
	},
);

const deleteCollaborationHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		const credentialIdUser = req.auth?.id;
		const { noteId, userId }: Payload = req.body;

		CollaborationValidator.validateCollaborationPayload({ noteId, userId });

		await verifyNoteOwner({ id: noteId, owner: credentialIdUser as string });

        await deleteCollaboration({ noteId, userId });
        
        await cacheNotes.delete(`notes:${userId}`);

		res.json({ status: 'success', message: 'Kolaborasi berhasil dihapus' });
	},
);

export { postCollaborationHandler, deleteCollaborationHandler };
