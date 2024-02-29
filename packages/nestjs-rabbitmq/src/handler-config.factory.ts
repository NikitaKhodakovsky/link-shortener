import { DeadLetterExchange } from '@app/dlx-rabbitmq-contract'
import { MessageHandlerOptions } from '@golevelup/nestjs-rabbitmq'

export interface RabbitMQContract {
	exchange: string
	routingKey: string
}

export interface RabbitHandlerSchemaConfig extends Omit<MessageHandlerOptions, 'exchange' | 'routingKey'> {
	contract: RabbitMQContract
	exchange?: string
	routingKey?: string
}

export type RabbitHandlerConfig = MessageHandlerOptions | RabbitHandlerSchemaConfig

export function createHandlerConfig({ queueOptions, exchange, routingKey, ...other }: RabbitHandlerConfig) {
	const config: MessageHandlerOptions = {
		queueOptions: { deadLetterExchange: DeadLetterExchange.name, ...queueOptions },
		exchange,
		routingKey,
		...other
	}

	if ('contract' in other) {
		config.exchange = exchange ? exchange : other.contract.exchange
		config.routingKey = routingKey ? routingKey : other.contract.routingKey
	}

	return config
}
