import { MessageHandlerErrorBehavior, RabbitMQConfig, defaultNackErrorHandler } from '@golevelup/nestjs-rabbitmq'
import { DLXQueue, DeadLetterExchange } from '@app/dlx-rabbitmq-contract'

export function createModuleConfig({
	queues,
	exchanges,
	defaultRpcErrorHandler,
	defaultSubscribeErrorBehavior,
	prefetchCount,
	...other
}: RabbitMQConfig) {
	return {
		defaultRpcErrorHandler: defaultRpcErrorHandler ?? defaultNackErrorHandler,
		defaultSubscribeErrorBehavior: defaultSubscribeErrorBehavior ?? MessageHandlerErrorBehavior.NACK,
		exchanges: [DeadLetterExchange, ...(exchanges ?? [])],
		queues: [DLXQueue, ...(queues ?? [])],
		prefetchCount: prefetchCount ?? 100,
		...other
	}
}
