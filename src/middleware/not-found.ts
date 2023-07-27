import { NextFunction, Request, Response } from 'express';
import config from '../config';

export default function notFound(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const error = new Error(`Route ${config.app.baseUrl + req.url} not found`);
	res.status(404).json({
		status: 'fail',
		errorName: 'NotFoundError',
		errorMessage: error.message,
		stack: config.app.env === 'production' ? undefined : error.stack,
	});
}
