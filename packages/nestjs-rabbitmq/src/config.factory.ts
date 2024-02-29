import { MessageHandlerErrorBehavior, RabbitMQConfig, defaultNackErrorHandler } from '@golevelup/nestjs-rabbitmq'
import { DLXQueue, DeadLetterExchange } from '@app/dlx-rabbitmq-contract'

export function createConfig({ queues, exchanges, defaultRpcErrorHandler, defaultSubscribeErrorBehavior, ...other }: RabbitMQConfig) {
	return {
		defaultRpcErrorHandler: defaultRpcErrorHandler ?? defaultNackErrorHandler,
		defaultSubscribeErrorBehavior: defaultSubscribeErrorBehavior ?? MessageHandlerErrorBehavior.NACK,
		exchanges: [DeadLetterExchange, ...(exchanges ?? [])],
		queues: [DLXQueue, ...(queues ?? [])],
		...other
	}
}
