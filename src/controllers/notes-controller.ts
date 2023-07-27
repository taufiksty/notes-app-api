import { Response } from 'express';
import asyncWrapper from '../middleware/async';
import RequestWithAuth from '../types/request-with-auth';
import CacheService from '../services/redis/cache-service';
import NotesValidator from '../validators/notes';
import {
	addNote,
	deleteNoteById,
	editNoteById,
	getNoteById,
	getNotes,
	verifyNoteAccess,
	verifyNoteOwner,
} from '../services/postgres/notes-service';

interface Payload {
	title: string;
	body: string;
	tags: string[];
}

const cacheNotes = new CacheService();

const deleteNoteByIdHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		const userId = req.auth?.id;
		const { id } = req.params;

		await verifyNoteOwner({ id, owner: userId as string });

		await deleteNoteById({ id });

		await cacheNotes.delete(`notes:${userId}`);

		res.json({ status: 'success', message: 'Catatan berhasil dihapus' });
	},
);

const getNoteByIdHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		const userId = req.auth?.id;
		const { id } = req.params;

		await verifyNoteAccess({ id, userId: userId as string });
		const note: any = await getNoteById({ id });

		res.json({ status: 'success', data: { note } });
	},
);

const getNotesHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		const userId = req.auth?.id;

		try {
			const notes: string = await cacheNotes.get(`notes:${userId}`);
			res.setHeader('X-Data-Source', 'cache');

			res.json({ status: 'success', data: { notes: JSON.parse(notes) } });
		} catch (error) {
			const notes: any = await getNotes({ owner: userId as string });
            res.setHeader('X-Data-Source', 'database');
            
			await cacheNotes.set(`notes:${userId}`, JSON.stringify(notes));
			
            res.json({ status: 'success', data: { notes } });
		}
	},
);

const postNoteHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		const userId = req.auth?.id;
		const { title = 'untitled', body, tags }: Payload = req.body;

		NotesValidator.validateNotePayload({ title, body, tags });

		const addedNote = await addNote({
			title,
			body,
			tags,
			owner: userId as string,
		});

		await cacheNotes.delete(`notes:${userId}`);

		res.status(201).json({
			status: 'success',
			message: 'Berhasil menambahkan catatan',
			data: { addedNote },
		});
	},
);

const putNoteByIdHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		const userId = req.auth?.id;
		const { id } = req.params;
		const { title, body, tags }: Payload = req.body;

		await verifyNoteAccess({ id, userId: userId as string });

		await editNoteById({ id, title, body, tags, owner: userId as string });

		await cacheNotes.delete(`notes:${userId}`);

		res.json({ status: 'success', message: 'Catatan berhasil diperbarui' });
	},
);

export {
	deleteNoteByIdHandler,
	getNoteByIdHandler,
	getNotesHandler,
	postNoteHandler,
	putNoteByIdHandler,
};
