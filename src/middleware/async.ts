import { NextFunction, Request, Response } from 'express';

export default function asyncWrapper(
	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}
