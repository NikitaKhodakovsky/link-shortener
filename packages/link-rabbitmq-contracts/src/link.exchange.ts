import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq'

export const LINK_EXCHANGE_NAME = 'link.exchange'

export const LinkExchange: RabbitMQExchangeConfig = {
	name: LINK_EXCHANGE_NAME,
	type: 'direct',
	options: { durable: false }
}
