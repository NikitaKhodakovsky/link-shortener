import { MessageHandlerErrorBehavior, RabbitMQConfig, defaultNackErrorHandler } from '@golevelup/nestjs-rabbitmq'
import { DLXQueue, DeadLetterExchange } from '@app/shared-rabbitmq-contracts'

export function createConfig({ queues, exchanges, defaultRpcErrorHandler, defaultSubscribeErrorBehavior, ...other }: RabbitMQConfig) {
	return {
		defaultRpcErrorHandler: defaultRpcErrorHandler ?? defaultNackErrorHandler,
		defaultSubscribeErrorBehavior: defaultSubscribeErrorBehavior ?? MessageHandlerErrorBehavior.NACK,
		exchanges: [DeadLetterExchange, ...(exchanges ?? [])],
		queues: [DLXQueue, ...(queues ?? [])],
		...other
	}
}
