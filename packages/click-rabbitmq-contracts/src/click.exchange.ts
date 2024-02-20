import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq'

export const CLICK_EXCHANGE_NAME = 'click.exchange'

export const ClickExchange: RabbitMQExchangeConfig = {
	name: CLICK_EXCHANGE_NAME,
	type: 'direct',
	options: { durable: false }
}
