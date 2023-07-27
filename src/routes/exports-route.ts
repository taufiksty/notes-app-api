import express from 'express';
import auth from '../middleware/auth';
import { postExportNotesHandler } from '../controllers/exports-controller';

const router = express.Router();

router.use(auth);

router.route('/notes').post(postExportNotesHandler);

export default router;
