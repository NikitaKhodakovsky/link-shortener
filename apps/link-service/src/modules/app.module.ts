import { PingExchange } from '@app/nestjs-rabbitmq-healthcheck'
import { LinkExchange } from '@app/link-rabbitmq-contracts'
import { UserExchange } from '@app/user-rabbitmq-contracts'
import { JWTValidationModule } from '@app/nestjs-jwt'
import { RabbitMQModule } from '@app/nestjs-rabbitmq'
import { TypeOrmModule } from '@nestjs/typeorm'
import { createURL } from '@app/url-builder'
import { Module } from '@nestjs/common'

import { JWT_PUBLIC_KEY, RMQ_HOST, RMQ_PASSWORD, RMQ_PORT, RMQ_USERNAME } from '../config/env'
import { dataSourceOptions } from '../config/data-source.config'
import { HealthModule } from './health/health.module'
import { LinkModule } from './link/link.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		JWTValidationModule.register({ publicKey: JWT_PUBLIC_KEY, global: true }),
		TypeOrmModule.forRoot(dataSourceOptions),
		RabbitMQModule.register({
			uri: createURL({ protocol: 'amqp', host: RMQ_HOST, port: RMQ_PORT, username: RMQ_USERNAME, password: RMQ_PASSWORD }),
			exchanges: [PingExchange, LinkExchange, UserExchange],
			global: true
		}),
		HealthModule,
		LinkModule,
		UserModule
	]
})
export class AppModule {}
