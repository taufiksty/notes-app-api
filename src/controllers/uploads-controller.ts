import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async';
import RequestWithAuth from '../types/request-with-auth';
import { InvariantError } from '../errors/invariant-error';
import path from 'path';

const getFileHandler = asyncWrapper(async (req: Request, res: Response) => {
	const pathFile = req.params[0];

	const imagePath = path.resolve(__dirname, '..', '..', 'public', pathFile);

	res.sendFile(imagePath, (error: Error) => {
		if (error) {
			res
				.status(404)
				.json({
					status: 'fail',
					message:
						'Gambar tidak ditemukan. Perhatikan kembali endpoint yang Anda berikan',
				});
		}
	});
});

const postUploadImageHandler = asyncWrapper(
	async (req: RequestWithAuth, res: Response) => {
		console.log(req.file);

		if (!req.file) {
			throw new InvariantError('Tolong upload gambar yang sesuai');
		}

		res
			.status(201)
			.json({ status: 'success', message: 'Gambar berhasil diupload' });
	},
);

export { getFileHandler, postUploadImageHandler };
