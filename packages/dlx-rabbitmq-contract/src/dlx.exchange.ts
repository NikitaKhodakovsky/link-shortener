import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq'

export const DLX_NAME = 'dlx'

export const DeadLetterExchange: RabbitMQExchangeConfig = {
	name: DLX_NAME,
	type: 'fanout',
	options: { durable: false }
}
