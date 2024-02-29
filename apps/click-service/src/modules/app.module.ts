import { PingExchange } from '@app/nestjs-rabbitmq-healthcheck'
import { ClickExchange } from '@app/click-rabbitmq-contracts'
import { LinkExchange } from '@app/link-rabbitmq-contracts'
import { RabbitMQModule } from '@app/nestjs-rabbitmq'
import { createURL } from '@app/url-builder'
import { Module } from '@nestjs/common'

import { RMQ_HOST, RMQ_PASSWORD, RMQ_PORT, RMQ_USERNAME } from '../config/env'
import { HealthModule } from './health/health.module'
import { ClickModule } from './click/click.module'
import { CacheModule } from './cache/cache.module'

@Module({
	imports: [
		RabbitMQModule.register({
			uri: createURL({ protocol: 'amqp', host: RMQ_HOST, port: RMQ_PORT, username: RMQ_USERNAME, password: RMQ_PASSWORD }),
			exchanges: [ClickExchange, LinkExchange, PingExchange]
		}),
		HealthModule,
		ClickModule,
		CacheModule
	]
})
export class AppModule {}
