import * as redis from 'redis';
import config from '../../config';

class CacheService {
	private _client: redis.RedisClientType;

	constructor() {
		this._client = redis.createClient({
			socket: {
				host: config.redis.server,
			},
		});

		this._client.on('error', (error: Error) => {
			console.error(error);
		});

		this._client.connect();
	}

	async set(key: string, value: string, expirationInSecond: number = 1800) {
		await this._client.set(key, value, {
			EX: expirationInSecond,
		});
	}

	async get(key: string) {
		const result = await this._client.get(key);

		if (result === null) throw new Error('Cache tidak ditemukan');

		return result;
	}

	delete(key: string) {
		return this._client.del(key);
	}
}

export default CacheService;
