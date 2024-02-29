import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { TerminusModule } from '@nestjs/terminus'
import { Module } from '@nestjs/common'

import { HealthController } from './health.controller'

@Module({
	imports: [TerminusModule],
	controllers: [HealthController],
	providers: [RabbitMQHealthIndicator]
})
export class HealthModule {}
