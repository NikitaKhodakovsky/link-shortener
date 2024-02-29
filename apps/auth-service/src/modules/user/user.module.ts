import { PingExchange } from '@app/nestjs-rabbitmq-healthcheck'
import { UserExchange } from '@app/user-rabbitmq-contracts'
import { RabbitMQModule } from '@app/nestjs-rabbitmq'
import { TypeOrmModule } from '@nestjs/typeorm'
import { createURL } from '@app/url-builder'
import { Module } from '@nestjs/common'

import { RMQ_HOST, RMQ_PASSWORD, RMQ_PORT, RMQ_USERNAME } from '../../config/env'
import { UserEventService } from './user-event.service'
import { UserService } from './user.service'
import { User } from './user.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		RabbitMQModule.register({
			uri: createURL({ protocol: 'amqp', host: RMQ_HOST, port: RMQ_PORT, username: RMQ_USERNAME, password: RMQ_PASSWORD }),
			exchanges: [UserExchange, PingExchange]
		})
	],
	providers: [UserService, UserEventService],
	exports: [UserService, UserEventService, RabbitMQModule]
})
export class UserModule {}
