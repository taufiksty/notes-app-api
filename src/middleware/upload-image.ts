import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { InvariantError } from '../errors/invariant-error';
import RequestWithAuth from '../types/request-with-auth';

// Setting storage
const storage = multer.diskStorage({
	destination: path.join(__dirname, '..', '..', 'public', 'images'),
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}--${file.originalname}`);
	},
});

// Validate file type
const validateFileType = (
	file: Express.Multer.File,
	callback: FileFilterCallback,
) => {
	// Extension allowed
	const fileTypes = /jpeg|jpg|png|gif|svg/;

	// Check extension
	const extensionName = fileTypes.test(path.extname(file.originalname));
	console.log(path.extname(file.originalname));

	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extensionName) {
		return callback(null, true);
	} else {
		callback(new InvariantError('Anda hanya dapat meng-upload gambar'));
	}
};

// Initializing upload
const uploadImage = multer({
	storage,
	limits: { fileSize: 10000000 },
	fileFilter: (
		req: RequestWithAuth,
		file: Express.Multer.File,
		callback: FileFilterCallback,
	) => validateFileType(file, callback),
});

export default uploadImage;
