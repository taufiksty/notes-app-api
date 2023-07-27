import { Express, Request, Response } from 'express';
import swaggerDocs from '../../utils/swagger';
import swaggerUi from 'swagger-ui-express';
import config from '../../config';
import swaggerJsdoc from 'swagger-jsdoc';

// Mock
jest.mock('swagger-jsdoc');
jest.mock('swagger-ui-express');
jest.mock('../../../package.json', () => ({ version: '1.0.0' }));

describe('Swagger docs', () => {
	let mockApp: Express;
	let mockResponse: Partial<Response>;

	beforeEach(() => {
		// Create a mock express app
		mockApp = {} as Express;
		mockApp.use = jest.fn();
		mockApp.get = jest.fn();

		// Create a mock Response object
		mockResponse = {
			setHeader: jest.fn(),
			send: jest.fn(),
		};
	});

	it('should set up the /docs route with swagger ui', () => {
		// Action
		swaggerDocs(mockApp);

		// Assert
		expect(mockApp.use).toHaveBeenCalledWith(
			'/docs',
			swaggerUi.serve,
			swaggerUi.setup(expect.any(Object)),
		);
	});

	it('should set up the /docs.json route', () => {
		// Arrange
		const mockSwaggerSpec = swaggerJsdoc({ someData: 'data' });

		// Action
		swaggerDocs(mockApp);

		// Call the route handler for /docs.json
		const routeHandler = (mockApp.get as jest.Mock).mock.calls.find(
			([path]: any) => path === '/docs.json',
		)?.[1] as (req: Request, res: Response) => void;

		// Call the route handler with mock Request and Response objects
		routeHandler({} as Request, mockResponse as Response);

		// Assert
		expect(mockApp.get).toHaveBeenCalledWith(
			'/docs.json',
			expect.any(Function),
		);
		expect(mockResponse.setHeader).toHaveBeenCalledWith(
			'Content-Type',
			'application/json',
		);
		expect(mockResponse.send).toHaveBeenCalledWith(mockSwaggerSpec);
	});

	it('should log the console message with the correct URL', () => {
		// Arrange
		const baseUrl = config.app.baseUrl;
		const mockConfig = {
			app: { baseUrl },
		};
		jest.spyOn(console, 'log');

		// Mock the config module
		jest.mock('../../config', () => mockConfig);

		// Action
		swaggerDocs(mockApp);

		// Assert
		expect(console.log).toHaveBeenCalledWith(
			`Docs available at ${baseUrl}/docs`,
		);
	});
});
