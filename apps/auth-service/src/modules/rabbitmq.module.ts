import { DLXQueue, DeadLetterExchange } from '@app/shared-rabbitmq-contracts'
import * as NestJSRabbitMQ from '@golevelup/nestjs-rabbitmq'
import { UserExchange } from '@app/user-rabbitmq-contracts'
import { createURL } from '@app/url-builder'
import { Module } from '@nestjs/common'

import { RMQ_HOST, RMQ_PASSWORD, RMQ_PORT, RMQ_USERNAME } from '../config/env'

@Module({
	imports: [
		NestJSRabbitMQ.RabbitMQModule.forRoot(NestJSRabbitMQ.RabbitMQModule, {
			uri: createURL({ protocol: 'amqp', host: RMQ_HOST, port: RMQ_PORT, username: RMQ_USERNAME, password: RMQ_PASSWORD }),
			defaultSubscribeErrorBehavior: NestJSRabbitMQ.MessageHandlerErrorBehavior.NACK,
			exchanges: [DeadLetterExchange, UserExchange],
			queues: [DLXQueue],
			prefetchCount: 30
		})
	],
	exports: [NestJSRabbitMQ.RabbitMQModule]
})
export class RabbitMQModule {}
