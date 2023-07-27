import express from 'express';
import auth from '../middleware/auth';
import {
	deleteCollaborationHandler,
	postCollaborationHandler,
} from '../controllers/collaborations-controller';

const router = express.Router();

router.use(auth);

router
	.route('/')
	.post(postCollaborationHandler)
	.delete(deleteCollaborationHandler);

export default router;
