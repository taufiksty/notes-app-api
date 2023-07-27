import amqp, { Channel, Connection } from 'amqplib';
import config from '../../config';

const ProducerService = {
	sendMessage: async (queue: string, message: string): Promise<void> => {
		let connection: Connection | null = null;
		let channel: Channel | null = null;

		try {
			connection = await amqp.connect(config.messageBroker.server as string);
			channel = await connection.createChannel();

			await channel.assertQueue(queue, { durable: true });

			channel.sendToQueue(queue, Buffer.from(message));

			setTimeout(() => {
				connection?.close();
			}, 1000);
		} catch (error) {
			console.log(`Error while sending message: ${error}`);
		} finally {
			channel?.close();
		}
	},
};

export default ProducerService;
