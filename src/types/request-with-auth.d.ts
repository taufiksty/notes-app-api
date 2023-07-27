import { Request } from 'express';

interface RequestWithAuth extends Request {
	auth?: {
		id: string;
		iat: number;
		exp: number;
	};
}

export default RequestWithAuth;
