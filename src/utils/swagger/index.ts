import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../package.json';
import config from '../../config';
import path from 'path';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Notes API Docs',
			description:
				'API Project migration to Express, Prisma, and Typescript from Dicoding submission',
			version,
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
                    bearerFormat: 'JWT',
                    in: 'header',
                    name: 'Authorization'
				},
			},
		},
	},
	apis: [
		path.resolve(__dirname, 'routes.swagger.yaml'),
		path.resolve(__dirname, 'schema.swagger.yaml'),
	],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express) => {
	// Swagger page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	// Docs in JSON format
	app.get('/docs.json', (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});

	console.log(`Docs available at ${config.app.baseUrl}/docs`);
};

export default swaggerDocs;
