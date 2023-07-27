import express from 'express';
import auth from '../middleware/auth';
import {
	deleteNoteByIdHandler,
	getNoteByIdHandler,
	getNotesHandler,
	postNoteHandler,
	putNoteByIdHandler,
} from '../controllers/notes-controller';

const router = express.Router();

router.use(auth);

router.route('/').get(getNotesHandler).post(postNoteHandler);
router
	.route('/:id')
	.get(getNoteByIdHandler)
	.put(putNoteByIdHandler)
	.delete(deleteNoteByIdHandler);

export default router;
