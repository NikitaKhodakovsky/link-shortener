import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq'

export const PING_EXCHANGE_NAME = 'ping.exchange'

export const PingExchange: RabbitMQExchangeConfig = {
	name: PING_EXCHANGE_NAME,
	type: 'direct',
	options: { durable: false }
}
