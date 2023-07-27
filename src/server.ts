import config from './config';
import app from './app';
import prisma from './database/prisma';
import swaggerDocs from './utils/swagger';
import notFound from './middleware/not-found';
import errorHandler from './middleware/error-handler';

const PORT = config.app.port;

const gracefulShutdown = async () => {
	console.log('Application is shutting down..');

	await prisma.$disconnect();

	console.log('Database connection closed. Application terminated');
	process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	swaggerDocs(app);

	app.use(notFound);
	app.use(errorHandler);
});
