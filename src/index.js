import util from 'util';
import chalk from 'chalk';
import amqplib from 'amqplib';
import RabbitMQPubSub from '@mark48evo/rabbitmq-pubsub';

const config = {
  host: process.env.RABBITMQ_HOST || 'amqp://localhost',
  exchangeName: process.env.EXCHANGE_NAME || 'system_events',
  queueNamePrefix: process.env.EXCHANGE_NAME || 'system_events',
};

async function main() {
  const connect = await amqplib.connect(config.host);
  const channel = await connect.createChannel();

  const pubsub = new RabbitMQPubSub(channel, config);
  await pubsub.setup();

  pubsub.on('*', async (message) => {
    let out = `[${new Date(message.metadata.createdAt * 1000).toISOString()}] `;

    out += `${chalk.green.bold(message.eventName)} `;
    out += `${util.inspect(message.data, { breakLength: Infinity })} `;
    out += `${util.inspect(message.metadata, { breakLength: Infinity })} `;

    console.log(out);
  });
}

main();
