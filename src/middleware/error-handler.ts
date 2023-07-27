import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { ClientError } from '../errors/client-error';

export default function errorHandler(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (error instanceof ClientError) {
		res.status(error.statusCode).json({
			status: 'fail',
			errorName: error.name,
			errorMessage: error.message,
			stack: config.app.env === 'production' ? undefined : error.stack,
		});
	} else {
		res.status(500).json({
			status: 'fail',
			errorName: 'ServerError',
			errorMessage: error.message,
			stack: config.app.env === 'production' ? undefined : error.stack,
		});
	}
}
