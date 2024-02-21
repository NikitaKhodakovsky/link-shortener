import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq'

export const USER_EXCHANGE_NAME = 'user.exchange'

export const UserExchange: RabbitMQExchangeConfig = {
	name: USER_EXCHANGE_NAME,
	type: 'direct',
	options: { durable: false }
}
