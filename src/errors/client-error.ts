export class ClientError extends Error {
	public statusCode: number;

	constructor(message: string, statusCode: number = 400) {
		super(message);
		this.statusCode = statusCode;
		this.name = 'ClientError';
	}
}
