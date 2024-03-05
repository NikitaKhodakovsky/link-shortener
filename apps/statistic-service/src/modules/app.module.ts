import { PingExchange } from '@app/nestjs-rabbitmq-healthcheck'
import { ClickExchange } from '@app/click-rabbitmq-contracts'
import { LinkExchange } from '@app/link-rabbitmq-contracts'
import { RabbitMQModule } from '@app/nestjs-rabbitmq'
import { TypeOrmModule } from '@nestjs/typeorm'
import { createURL } from '@app/url-builder'
import { Module } from '@nestjs/common'

import { RMQ_HOST, RMQ_PASSWORD, RMQ_PORT, RMQ_USERNAME } from '../config/env'
import { dataSourceOptions } from '../config/data-source.config'
import { StatisticModule } from './statistic/statistic.module'
import { HealthModule } from './health/health.module'
import { ClickModule } from './click/click.module'
import { LinkModule } from './link/link.module'

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		RabbitMQModule.register({
			uri: createURL({ protocol: 'amqp', host: RMQ_HOST, port: RMQ_PORT, username: RMQ_USERNAME, password: RMQ_PASSWORD }),
			prefetchCount: 600,
			exchanges: [ClickExchange, LinkExchange, PingExchange],
			global: true
		}),
		StatisticModule,
		HealthModule,
		ClickModule,
		LinkModule
	]
})
export class AppModule {}
