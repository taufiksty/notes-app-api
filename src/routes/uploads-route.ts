import express from 'express';
import auth from '../middleware/auth';
import uploadImage from '../middleware/upload-image';
import {
	getFileHandler,
	postUploadImageHandler,
} from '../controllers/uploads-controller';

const router = express.Router();

router
	.route('/images')
	.post(auth, uploadImage.single('image'), postUploadImageHandler);
router.route('/*').get(getFileHandler);

export default router;
