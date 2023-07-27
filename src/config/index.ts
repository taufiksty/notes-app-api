import dotenv from 'dotenv';

dotenv.config();

const config = {
	app: {
		port: process.env.PORT,
		env: process.env.NODE_ENV,
		baseUrl: process.env.BASE_URL,
	},
	database: {
		url: process.env.DATABASE_URL,
	},
	jwt: {
		accessToken: process.env.ACCESS_TOKEN_KEY,
		refreshToken: process.env.REFRESH_TOKEN_KEY,
	},
	redis: {
		server: process.env.REDIS_SERVER,
	},
	messageBroker: {
		server: process.env.RABBITMQ_SERVER,
	},
};

export default config;
